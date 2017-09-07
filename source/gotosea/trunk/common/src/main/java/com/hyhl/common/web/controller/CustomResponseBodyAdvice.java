package com.hyhl.common.web.controller;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.common.web.WebResponse;

/**
 * 自定义的返回结果处理器
 * @author Gene
 *
 */
@ControllerAdvice
public class CustomResponseBodyAdvice implements ResponseBodyAdvice<Object>{

	/**
	 * 在返回结果前先处理，处理规则如下：
	 * 1）如果发现返回对象为WebResponse,byte,byte[]不作处理;
	 * 2）其他对象使用WebResponse封装后返回
	 */
	@Override
	public Object beforeBodyWrite(Object object, MethodParameter returnType, MediaType arg2,
			Class<? extends HttpMessageConverter<?>> arg3, ServerHttpRequest arg4, ServerHttpResponse arg5) {
		if(null==object) return new WebResponse();
		Class<?> classType = object.getClass();
		if(classType.equals(WebResponse.class) || classType.equals(Byte[].class) || classType.equals(Byte.class)){
			return object;
		}
		WebResponse webResponse = new WebResponse(object);
		if(classType.equals(String.class)){
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				return objectMapper.writeValueAsString(webResponse);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return object;
			}
		}
		return webResponse;
	}

	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		Class<?> classType = returnType.getParameterType();
		return !classType.equals(WebResponse.class) && !classType.equals(Byte[].class) && !classType.equals(Byte.class);
	}

}
