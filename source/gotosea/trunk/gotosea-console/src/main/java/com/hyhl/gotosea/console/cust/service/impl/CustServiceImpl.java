package com.hyhl.gotosea.console.cust.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.console.cust.dto.CustDto;
import com.hyhl.gotosea.console.cust.service.ICustService;
import com.hyhl.gotosea.core.common.constant.Constant;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantSuccess;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.sms.enm.SmsTemplate;
import com.hyhl.gotosea.core.sms.util.SmsHelper;
import com.hyhl.gotosea.core.util.DateUtil;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class CustServiceImpl extends BaseServiceImpl<Cust> implements ICustService {
	
	@Autowired
	private SmsHelper smsHelper;
	
	@Autowired
	private MqProducer mqProducer;
	
	@Override
	public Pager<Cust> findCusts(CustDto param) throws Exception {
		final Example example = new Example(Cust.class);
		Criteria createCriteria = example.createCriteria();
		if(param!=null)setCustCondition(param, createCriteria);
		example.setOrderByClause("create_time DESC");
		return selectByPage(new PageExcute<Cust>(){
			@Override
			public List<Cust> excute() {
				return mapper.selectByExample(example);
			}
		});
	}

	private void setCustCondition(CustDto param, Criteria createCriteria) throws Exception {
		if(!StringUtils.isEmpty(param.getAccount())){
			createCriteria.andLike("account", param.getAccount()+"%");
		}
		if(!StringUtils.isEmpty(param.getName())){
			createCriteria.andLike("name", param.getName()+"%");
		}
		if(!StringUtils.isEmpty(param.getPhone())){
			createCriteria.andLike("phone", param.getPhone()+"%");
		}
		if(!StringUtils.isEmpty(param.getEmail())){
			createCriteria.andLike("email", param.getEmail()+"%");
		}
		if(param.getSex()!=null){
			createCriteria.andEqualTo("sex", param.getSex());
		}
		if(param.getLevel()!=null){
			createCriteria.andEqualTo("level", param.getLevel());
		}
		if(!StringUtils.isEmpty(param.getCreateTime())){
			createCriteria.andCondition("create_time>=", DateUtil.parse(param.getCreateTime(),"yyyy-MM-dd"));
		}
		if(param.getStatus()!=null){
			createCriteria.andEqualTo("status", param.getStatus());
		}
		if(param.getMerchant()!=null){
			createCriteria.andEqualTo("merchant", param.getMerchant());
		}
		if(param.getMerchantStatus()!=null){
			createCriteria.andEqualTo("merchantStatus", param.getMerchantStatus());
		}
		if(param.getCredits()!=null){
			createCriteria.andCondition("credits>=", param.getCredits());
		}
		if(param.getExperenceValue()!=null){
			createCriteria.andCondition("experence_value>=", param.getExperenceValue());
		}
	}
	
	@Override
	public Cust findCust(String custId) throws Exception {
		return mapper.selectByPrimaryKey(custId);
	}


	@Override
	@Transactional
	public int updateCustStatus(String custId, Integer status) throws Exception {
		int result = 0;
		Cust cust = findCustById(custId);
		cust.setStatus(status);
		result = mapper.updateByPrimaryKeySelective(cust);
		return result;
	}
	
	@Override
	public Cust findCustById(String custId) throws Exception {
		Cust cust = mapper.selectByPrimaryKey(custId);
		if(cust==null)throw new BaseBusinessException(LoginError.NOT_EXIST);
		return cust;
	}

	@Override
	@Transactional
	public int updateCustMerchantAudit(String custId, Integer status, String reason) throws Exception {
		Cust cust = findCustById(custId);
		//判断客户是否是申请状态
		Integer merchantStatus = cust.getMerchantStatus();
		if(merchantStatus!=null&&ArrayUtils.contains(CustEnum.客户不能审核商家的认证状态.getCodeArr(), merchantStatus))
			throw new BaseBusinessException(BaseBusinessError.FORBIDDEN.getCode(), "客户非申请审核状态，无法审核");
		cust.setMerchantStatus(status);
		int result = mapper.updateByPrimaryKeySelective(cust);
		if(result==1){
			if(status==CustEnum.商家认证状态认证失败.getCode()){
				//推送短信审核失败
				//获取短信参数
				Map<String, String> smsParams = smsHelper.convertToMap(SmsTemplate._03_商家认证失败, Constant.HYHL_HOTLINE);
				MqMerchantFail fail = new MqMerchantFail(cust.getId(), cust.getPhone(), SmsTemplate._03_商家认证失败.getTemplate(), smsParams);
				mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.be_merchant_fail, fail));
			}else if(status==CustEnum.商家认证状态认证成功.getCode()){
				//推送短信审核成功
				//获取短信参数
				MqMerchantSuccess success = new MqMerchantSuccess(cust.getId(), cust.getPhone(), SmsTemplate._02_商家认证成功.getTemplate());
				mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.be_merchant_success, success));
			}
		}
		return result;
	}

}
