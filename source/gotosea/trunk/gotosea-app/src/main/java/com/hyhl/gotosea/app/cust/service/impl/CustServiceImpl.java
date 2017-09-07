package com.hyhl.gotosea.app.cust.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CustError;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.app.cust.dto.LoginPwdDto;
import com.hyhl.gotosea.app.cust.service.ICustService;
import com.hyhl.gotosea.core.common.redis.DistributedLockHandler;
import com.hyhl.gotosea.core.common.redis.Lock;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustVO;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustLogin;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustRegister;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;

@Service
@Transactional(transactionManager="custTransationManager", readOnly=true)
public class CustServiceImpl extends BaseServiceImpl<Cust> implements ICustService {
	
	@Autowired
	private MqProducer mqProducer;
	
	@Autowired
	private ICustServiceCore iCustServiceCore;
	
	@Autowired
	private DistributedLockHandler distributedLockHandler;
	
	private static final String lock_key = "_lock:cust:login:%s"; 
	private final static long LOCK_TRY_INTERVAL = 30L;// 默认30ms尝试一次
	private final static long LOCK_TRY_TIMEOUT = 30L;// 默认尝试1次

	@Override
	public CustVO findLoginByPwd(LoginPwdDto param) throws Exception {
		CustVO result = null;
		//获取用户信息
		Cust cust = findCustOneByPhone(param.getPhone());
		if(cust==null)throw new BaseBusinessException(LoginError.UNREGISTERED);
		//验证密码
		String loginPwd = DigestUtils.md5DigestAsHex(param.getPassword().getBytes());
		String pwd = cust.getPwd();
		if(!pwd.equals(loginPwd))throw new BaseBusinessException(LoginError.INVALID_PASSWORD);
		result = loginSuccess(cust,false);
		return result;
	}

	private CustVO loginSuccess(Cust cust,boolean isFirst) throws Exception {
		//添加返回VO
		CustVO result = new CustVO();
		BeanUtils.copyProperties(cust, result);
		if(isFirst)result.setIsFirst(true);
		//设置session
		BaseSessionUser session = new BaseSessionUser();
		session.setAccount(cust.getAccount());
		session.setId(cust.getId());
		session.setName(cust.getName());
		session.setPhone(cust.getPhone());
		session.setStatus(cust.getStatus());
		session.setMerchantStatus(cust.getMerchantStatus());
		if(isFirst)session.setIsFirstLoginTag(true);
		AppContextHelper.setCurrentUser(session);
		//发送Rabbitmq登录消息
		//用户登录
		MqCustLogin custLogin = new MqCustLogin(cust.getId(), AppContextHelper.getRequestIp());
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.cust_login, custLogin));
		return result;
	}
	
	
	@Override
	public CustVO findLoginByCode(String phone) throws Exception {
		//获取用户信息
		Cust cust = findCustOneByPhone(phone);
		//返回数据
		CustVO result = null;
		if(cust!=null)
			result = loginSuccess(cust,false);
		return result;
	}

	@Override
	@Transactional
	public CustVO insertDefaultRegisterCust(String phone, String invite) throws Exception {
		//注册客户
		Cust cust = iCustServiceCore.insertRegisterCust(phone, false);
		//发送Rabbitmq注册消息，添加邀请人
		MqCustRegister register = new MqCustRegister(cust.getId(), invite);
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.cust_register, register));
		//返回VO
		CustVO result = loginSuccess(cust,true);
		return result;
	}
	
	private Cust findCustOneByPhone(String phone) {
		Cust cust = new Cust();
		cust.setPhone(phone);
		List<Cust> select = mapper.select(cust);
		if(select==null||select.size()==0){
			cust=null;
		}else{
			if(select.size()>1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR.getCode(),String.format("存在%d个相同手机号%s的用户", select.size(),phone));
			cust=select.get(0);
		}
		return cust;
	}

	@Override
	@Transactional
	public int updateCheckIn(String custId, String phone) throws Exception {
		Date loginTime = new Date();
		//1-首日登录，增加积分
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//计算超时时间
		long currentTimeMillis = System.currentTimeMillis();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date(currentTimeMillis));
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.add(Calendar.DATE, 1);
		long tomorrow = calendar.getTime().getTime();
		long lockExpire = tomorrow-currentTimeMillis;
		//判断是否首日登录
		Lock lock = new Lock(String.format(lock_key, custId),sdf.format(loginTime));
		if (distributedLockHandler.tryLock(lock,LOCK_TRY_TIMEOUT,LOCK_TRY_INTERVAL,lockExpire)) {
			try {
				//新增积分
				MqCreditsNew creditsNew = new MqCreditsNew(custId, phone, CreditsRuleEnum.每日签到);
				mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_new, creditsNew));
			}catch (Exception e) {
				distributedLockHandler.releaseLock(lock);
				throw e;
			}
		}else{
			throw new BaseBusinessException(CustError.AlREADY_CHECKIN);
		}
		return 1;
	}

}
