package com.hyhl.gotosea.app.web.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.validator.constant.ConstantRegex;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.sms.enm.SmsTemplate;
import com.hyhl.gotosea.core.sms.service.ISmsService;


@RestController
public class SmsController{

	@Autowired
	private ISmsService iSmsService;
	
	/**发送验证码(检查手机号码未注册)
	 * @param phone
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/sms/code", method = RequestMethod.GET)
	public WebResponse code(String phone)throws Exception {
		if(phone==null||phone.equals(""))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		Pattern p = Pattern.compile(ConstantRegex.PHONE);
		Matcher m = p.matcher(phone);
		boolean matches = m.matches();
		if(!matches)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),ConstantRegex.PHONE_MSG);
		iSmsService.sendVerifyCode(phone, SmsTemplate._01_验证码);
		return new WebResponse();
	}
	
	/**验证验证码
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/sms/vertify", method = RequestMethod.POST)
	public WebResponse verify(String code)throws Exception {
		if(code==null||code.equals(""))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		return new WebResponse(iSmsService.verifyCode(code));
	}
	
	
}
