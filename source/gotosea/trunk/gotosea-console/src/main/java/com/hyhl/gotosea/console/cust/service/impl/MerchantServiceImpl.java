package com.hyhl.gotosea.console.cust.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.cust.dto.AddMerchantDto;
import com.hyhl.gotosea.console.cust.dto.MerchantDto;
import com.hyhl.gotosea.console.cust.service.IMerchantService;
import com.hyhl.gotosea.console.cust.vo.MerchantDetailVO;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.service.IMerchantServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustRegister;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class MerchantServiceImpl extends BaseServiceImpl<Merchant> implements IMerchantService {
	
	@Autowired
	private ICustServiceCore iCustServiceCore;
	
	@Autowired
	private IMerchantServiceCore iMerchantServiceCore;
	
	@Autowired
	private MqProducer mqProducer;
	
	@Override
	public Pager<Merchant> findMerchants(MerchantDto param) throws Exception {
		final Example example = new Example(Merchant.class);
		Criteria createCriteria = example.createCriteria();
		if(param!=null)setMerchantCondition(param, createCriteria);
		return selectByPage(new PageExcute<Merchant>(){
			@Override
			public List<Merchant> excute() {
				return mapper.selectByExample(example);
			}
		});
	}
	
	
	private void setMerchantCondition(MerchantDto param, Criteria createCriteria) throws Exception {
		if(!StringUtils.isEmpty(param.getCustId())){
			createCriteria.andEqualTo("custId", param.getCustId());
		}
		if(!StringUtils.isEmpty(param.getRealName())){
			createCriteria.andEqualTo("realName", param.getRealName());
		}
		if(param.getIdType()!=null){
			createCriteria.andEqualTo("idType", param.getIdType());
		}
		if(!StringUtils.isEmpty(param.getIdNum())){
			createCriteria.andEqualTo("idNum", param.getIdNum());
		}
		if(!StringUtils.isEmpty(param.getMerchant())){
			createCriteria.andLike("merchant", param.getMerchant()+"%");
		}
		if(!StringUtils.isEmpty(param.getPhone())){
			createCriteria.andLike("phone", param.getPhone()+"%");
		}
		if(param.getAreaId()!=null){
			createCriteria.andEqualTo("areaId", param.getAreaId());
		}
		if(param.getLocatorId()!=null){
			createCriteria.andEqualTo("locatorId", param.getLocatorId());
		}
		if(!StringUtils.isEmpty(param.getAddress())){
			createCriteria.andLike("address", param.getAddress()+"%");
		}
	}
	
	@Override
	public MerchantDetailVO findMerchant(String custId) throws Exception {
		MerchantDetailVO result = null;
		Merchant merchant = new Merchant();
		merchant.setCustId(custId);
		List<Merchant> select = mapper.select(merchant);
		if(select==null||select.size()!=1){
			if(select.size()>1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR.getCode(), String.format("该用户拥有%d个商家信息", select.size()));
		}else{
			result = new MerchantDetailVO();
			merchant = select.get(0);
			BeanUtils.copyProperties(merchant, result);
		}
		return result;
	}


	@Override
	@Transactional
	public int insertMerchant(AddMerchantDto param) throws Exception {
		int result = 0;
		//注册客户
		Cust cust = iCustServiceCore.insertRegisterCust(param.getPhone(), true);
		String custId = cust.getId();
		//新增商家
		Merchant merchant = new Merchant();
		BeanUtils.copyProperties(param, merchant);
		merchant.setCustId(custId);
		result = insertSelective(merchant);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//初始化商家表格
		result = iMerchantServiceCore.insertInitializeMerchantTable(custId);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//发送Rabbitmq注册消息-初始化Im
		MqCustRegister register = new MqCustRegister(custId);
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.cust_register, register));
		return result;
	}


	@Override
	public int updateMerchant(String custId, AddMerchantDto param) throws Exception {
		Merchant merchant = mapper.selectByPrimaryKey(custId);
		if(merchant==null)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR.getCode(), "没有该商家");
		BeanUtils.copyProperties(param, merchant);
		return mapper.updateByPrimaryKeySelective(merchant);
	}
}
