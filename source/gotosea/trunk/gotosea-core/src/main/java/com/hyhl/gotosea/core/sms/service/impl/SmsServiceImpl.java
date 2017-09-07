package com.hyhl.gotosea.core.sms.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hfocean.common.sms.core.AlidayuSmsHelper;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.SmsError;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqSmsPush;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.sms.cache.CacheObj;
import com.hyhl.gotosea.core.sms.enm.SmsTemplate;
import com.hyhl.gotosea.core.sms.service.ISmsService;
import com.hyhl.gotosea.core.sms.util.SmsHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

@Service
public class SmsServiceImpl implements ISmsService {
	
	@Autowired
	private AlidayuSmsHelper alidayuSmsHelper;
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private MqProducer mqProducer;
	
	@Autowired
	private SmsHelper smsHelper;

	private static final long TIME_OUT_PHONE=60L;//60秒限制
	private static final long CODE_TIME=900L;//15分钟验证码缓存
	private static final int VERIFY_NUMBER = 5;//验证错误5次限制
	private static final String VERIFICATION_CODE = "_verifyCode:";
	
	@Override
	public int sendSms(SmsTemplate template, String phone, String... params){
		int result = 0;//0 失败，参数不全 1成功
		String[] paramArr = template.getParam();
		Map<String, String> json = null;
		if(paramArr!=null){
			if(paramArr.length==params.length&&paramArr.length>0){
				json = new HashMap<String, String>();
				for(int i=0; i<paramArr.length; i++){
					json.put(paramArr[i], params[i]);
				}
				result = alidayuSmsHelper.sentSMS(template.getTemplate(), phone, json);
			}
		}
		return result;
	}
	
	@Override
	public int sendSmsToRabbitMq(SmsTemplate template, String phone, String... params)throws Exception {
		Map<String,String> paramMap = new HashMap<String,String>();
		String[] paramArr = template.getParam();
		if(params.length!=paramArr.length)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		for(int i=0;i<paramArr.length;i++){
			paramMap.put(paramArr[i], params[i]);
		}
		MqSmsPush smsPush = new MqSmsPush(phone, template.getTemplate(), paramMap);
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.sms_push, smsPush));
		return 1;
	}

	@Override
	public int sendVerifyCode(String phone, SmsTemplate stemp) throws Exception {
		Object ob = redisService.getObject(VERIFICATION_CODE+AppContextHelper.getSession().getId());
		CacheObj co = null;
		if(ob != null) {
			co = (CacheObj) ob;
			long currentTimeMillis = System.currentTimeMillis();
			long codeTime = co.getCodeTime();
			long time = (currentTimeMillis-codeTime)/1000;
			//1分钟内重复获取
			if(time<TIME_OUT_PHONE)
				throw new BaseBusinessException(SmsError.CODE_FREQUENT.getCode(), String.format(SmsError.CODE_FREQUENT.getMessage(), TIME_OUT_PHONE/60));
		}
		String randomNumber = smsHelper.getRandomNumber();
		Map<String,String> param = new HashMap<String,String>();
		param.put("code", randomNumber);
		param.put("time", String.valueOf(CODE_TIME/60));
		int result = sendVerifySMS(stemp.getTemplate(), phone, param);
		if(result==0)throw new BaseBusinessException(SmsError.CODE_SEND_MANY_ERROR);
		return result;
	}
	
	private int sendVerifySMS(String stemp, String phone, Map<String,String> param) {
		int success = 0;
		// 给目标手机号发送短信
		success = alidayuSmsHelper.sentSMS(stemp, phone, param);
		if(success == 1) {
			//将生成的六位验证码和传进来的手机号码存入缓存
			CacheObj co = new CacheObj(phone,param.get("code"));
			redisService.putObject(VERIFICATION_CODE+AppContextHelper.getSession().getId(), co, CODE_TIME);
			return success;
		}
		return success;
	}
	
	@Override
	public String verifyCode(String verifyCode)throws Exception {
		CacheObj cacheObj = getCacheObj();
		if(cacheObj==null){
			throw new BaseBusinessException(SmsError.CODE_TIMEOUT);
		}else{
			int frqNo = cacheObj.getFrqNo();
			if(frqNo>VERIFY_NUMBER)throw new BaseBusinessException(SmsError.CODE_VERIFY_MANY_ERROR);
		}
		boolean result = verify(verifyCode);
		if(!result)throw new BaseBusinessException(SmsError.CODE_ERROR);
		String phone = cacheObj.getPhone();
		if(phone==null||phone.equals(""))throw new BaseBusinessException(SmsError.CODE_TIMEOUT);
		return phone;
	}
	
	private boolean verify(String verifyCode){
		CacheObj co = getCacheObj();
		// 缓存中验证码
		String cacheVerifyCode =null;
		cacheVerifyCode = String.valueOf(co.getVerifyNo());
		//如果短信中的验证码和缓存中的验证码一致，则验证成功
		if(StringUtils.hasText(verifyCode) && verifyCode.equals(cacheVerifyCode)) {
			co.setStatus(true);
			redisService.putObject(VERIFICATION_CODE+AppContextHelper.getSession().getId(), co, CODE_TIME);
			return true;
		} else {
			co.setStatus(false);
			co.setFrqNo(co.getFrqNo()+1);
			redisService.putObject(VERIFICATION_CODE+AppContextHelper.getSession().getId(), co, CODE_TIME);
			return false;
		}
	}

	private CacheObj getCacheObj() {
		Object ob = redisService.getObject(VERIFICATION_CODE+AppContextHelper.getSession().getId());
		CacheObj co = null;
		if(ob == null) {
			return null;
		} else {
			co = (CacheObj) ob;
		}
		return co;
	}
	
	@Override
	public String verifyStatus()throws Exception {
		CacheObj cacheObj = getCacheObj();
		if(cacheObj==null)
			throw new BaseBusinessException(SmsError.CODE_TIMEOUT);
		boolean status = cacheObj.getStatus();
		if(!status)throw new BaseBusinessException(SmsError.CODE_ERROR);
		String phone = cacheObj.getPhone();
		if(StringUtils.isEmpty(phone))throw new BaseBusinessException(SmsError.CODE_TIMEOUT);
		return phone;
	}

	
	@Override
	public void removeCode() throws Exception {
		redisService.delObject(VERIFICATION_CODE+AppContextHelper.getSession().getId());
	}

}
