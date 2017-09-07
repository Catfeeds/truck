package com.hyhl.gotosea.core.sms.service;

import com.hyhl.gotosea.core.sms.enm.SmsTemplate;

public interface ISmsService {
	
	/**发送阿里大于通知类短信-不带配置开关,默认发送
	 * @param phone 手机号码
	 * @param stemp 短信模版编号枚举
	 * @param params 短信模版参数 顺序填充  @see SmsTemplate
	 * @return 0 失败 1 成功
	 */
	int sendSms(SmsTemplate template, String phone, String... params);
	
	/**发送阿里大于短信-RabbitMq推送
	 * @param template
	 * @param phone
	 * @param params
	 * @return
	 * @throws Exception
	 */
	int sendSmsToRabbitMq(SmsTemplate template, String phone, String... params)throws Exception;
	
	/**发送验证码
	 * @param phone
	 * @param stemp  @see SmsTemplate
	 * @return 0 失败 1 成功
	 * @throws Exception
	 */
	int sendVerifyCode(String phone,SmsTemplate stemp)throws Exception;
	
	/**验证验证码
	 * @param phone
	 * @param verifyCode
	 * @return 手机号码   验证成功返回手机号码 ,验证失败抛出具体异常
	 * @throws Exception
	 */
	String verifyCode(String verifyCode)throws Exception;
	
	/**获取验证结果
	 * @return 手机号码    验证通过,返回手机号码,不通过则抛出相应异常
	 */
	String verifyStatus()throws Exception;
	
	/**验证处理成功后，手动处理验证码已使用
	 */
	void removeCode()throws Exception;
}
