package com.hyhl.gotosea.core.cust.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.core.common.constant.Constant;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.CustTagUpdateDto;
import com.hyhl.gotosea.core.cust.dto.CustUpdateDto;
import com.hyhl.gotosea.core.cust.dto.CustUpdatePwdDto;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.mapper.TravelerTagMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.TravelerTag;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustDetailVO;
import com.hyhl.gotosea.core.util.NumberGenerator;
import com.hyhl.gotosea.core.util.PrimaryKeyGenerator;
import com.hyhl.gotosea.core.util.UUIDMaker;

import tk.mybatis.mapper.entity.Example;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class CustServiceCoreImpl extends BaseServiceImpl<Cust> implements ICustServiceCore {
	
	@Autowired
	private CustMapper custMapper;
	
	@Autowired
	private TravelerTagMapper travelerTagMapper;

	@Autowired
	private ICustTagServiceCore iCustTagServiceCore;

	@Override
	@Transactional
	public Cust insertRegisterCust(String phone, boolean type) throws Exception {
		//验证手机号是否已经被注册
		verifyPhoneIsNotRegistered(phone);
		//注册
		Cust cust = new Cust();
		cust.setId(PrimaryKeyGenerator.generate());
		cust.setAccount(UUIDMaker.generate());
		cust.setName(Constant.DEFAULT_CUST_NAME_PRE+NumberGenerator.getCustName());
		cust.setPhone(phone);
		//随机生成密码
		cust.setPwd(DigestUtils.md5DigestAsHex(NumberGenerator.getCustName().getBytes()));
		cust.setSex(Constant.DEFAULT_CUST_SEX);
		cust.setPicture(Constant.DEFAULT_CUST_PICTURE);
		//用户等级
		cust.setLevel(Constant.DEFAULT_CUST_LEVEL);
		cust.setCreateTime(new Date(System.currentTimeMillis()));
		cust.setStatus(CustEnum.客户状态生效.getCode());
		if(type){
			cust.setMerchant(CustEnum.商家标记已申请商家身份.getCode());
			cust.setMerchantStatus(CustEnum.商家认证状态认证成功.getCode());
		}else{
			cust.setMerchant(CustEnum.商家标记未申请商家身份.getCode());
			cust.setMerchantStatus(CustEnum.商家认证状态未认证.getCode());
		}
		//玩家积分
		cust.setCredits(Constant.DEFAULT_CUST_CREDITS);
	    //经验值
	    cust.setExperenceValue(Constant.DEFAULT_CUST_EXPERENCE_VALUE);
		int insert = mapper.insertSelective(cust);
		if(insert!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return cust;
	}
	
	private void verifyPhoneIsNotRegistered(String phone) {
		Example example = new Example(Cust.class);
		example.createCriteria()
		        .andCondition("phone = ",phone);
		List<Cust> countries = mapper.selectByExample(example);
		if(countries.size()>0)throw new BaseBusinessException(LoginError.PHONE_ALREADY_EXIST);;
	}

	@Override
	@Transactional
	public int updateResetPassword(String phone, String password) throws Exception {
		Cust cust = new Cust();
		cust.setPhone(phone);
		List<Cust> custs = custMapper.select(cust);
		if(custs==null||custs.size()!=1)throw new BaseBusinessException(LoginError.UNREGISTERED);
		cust = custs.get(0);
		cust.setPwd(DigestUtils.md5DigestAsHex(password.getBytes()));
		int result = updateCust(cust);
		return result;
	}

	private int updateCust(Cust cust) {
		int result = custMapper.updateByPrimaryKeySelective(cust);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}

	@Override
	@Transactional
	public int updatePassword(String id, CustUpdatePwdDto param) throws Exception {
		Cust cust = getCust(id);
		cust.setPwd(DigestUtils.md5DigestAsHex(param.getPassword().getBytes()));
		int result = updateCust(cust);
		return result;
	}

	@Override
	@Transactional
	public int updateCust(String id, CustUpdateDto param) throws Exception {
		Cust cust = getCust(id);
		//设置更新参数
		String name = param.getName();
		if(!StringUtils.isEmpty(name))cust.setName(name);
		String email = param.getEmail();
		if(!StringUtils.isEmpty(email))cust.setEmail(email);
		Integer sex = param.getSex();
		if(sex!=null){
			if(sex!=1&&sex!=2)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
			cust.setSex(sex);
		}
		String picture = param.getPicture();
		if(!StringUtils.isEmpty(picture))cust.setPicture(picture);
		Integer areaId = param.getAreaId();
		if(areaId!=null)cust.setAreaId(areaId);
		//更新用户
		int result = updateCust(cust);
		//更新玩家兴趣标签
		if(param.getIds()!=null||param.getTagIds()!=null){
			CustTagUpdateDto tags = new CustTagUpdateDto();
			tags.setIds(param.getIds());
			tags.setTagIds(param.getTagIds());
			result += iCustTagServiceCore.updateCustTravelerTag(id, tags);
		}
		return result;
	}

	@Override
	public CustDetailVO findCust(String id) throws Exception {
		Cust cust = getCust(id);
		CustDetailVO result = new CustDetailVO();
		BeanUtils.copyProperties(cust, result);
		//获取客户标签
		TravelerTag tag = new TravelerTag();
		tag.setCustId(cust.getId());
		List<TravelerTag> tags = travelerTagMapper.select(tag);
		if(tags!=null&&tags.size()>0)
			result.setTagIds(tags.stream().map(t -> t.getTagId()).collect(Collectors.toList()));
		return result;
	}

	private Cust getCust(String id) {
		Cust cust = custMapper.selectByPrimaryKey(id);
		if(cust==null)throw new BaseBusinessException(LoginError.NOT_EXIST);
		return cust;
	}

	@Override
	public Map<String, Object> selectCustInfo(String custId) {
		return custMapper.selectCustInfo(custId);
	}
}
