package com.hyhl.gotosea.core.sms.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.sms.enm.SmsTemplate;

@Component
public class SmsHelper {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	public String getRandomNumber() {

		// 生成六位验证码
		String charValue = "";
		for (int i = 0; i < 6; i++) {
			char c = (char) (randomInt(0, 9) + '0');
			charValue += String.valueOf(c);
		}
		return charValue;
	}
	
	/**
	* 生成随机数
	*
	* */
	private int randomInt(int from, int to) {
		Random r = new Random();
		return from + r.nextInt(to - from);
	}
	
	
	public Map<String,String> convertToMap(SmsTemplate template, String... params)throws Exception {
		Map<String,String> paramMap = new HashMap<String,String>();
		String[] paramArr = template.getParam();
		if(params.length!=paramArr.length)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		for(int i=0;i<paramArr.length;i++){
			paramMap.put(paramArr[i], params[i]);
		}
		return paramMap;
	}
	
	public String convertToJson(SmsTemplate template, String... params)throws Exception {
		Map<String, String> map = convertToMap(template, params);
		return objectMapper.writeValueAsString(map);
	}
	
}
