package com.hyhl.gotosea.console.system.resolver;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.hfocean.common.auth.base.annotation.MjDefaultValue;
import com.hfocean.common.auth.base.annotation.MjNotNull;
import com.hfocean.common.auth.base.annotation.MjPattern;
import com.hyhl.gotosea.console.system.exception.ValidateException;

@Component
public class AnnotationParameterResolver implements HandlerMethodArgumentResolver {
	
	private static List<Class<?>> clazzList = new ArrayList<Class<?>>();
	static {
		clazzList.add(MjNotNull.class);
		clazzList.add(MjPattern.class);
		clazzList.add(MjDefaultValue.class);
	}

	public boolean supportsParameter(MethodParameter parameter) {
		
		Annotation[] ans = parameter.getParameterAnnotations();
		
		if(ans!=null){
			for(Annotation annotation : ans){
				if(clazzList.contains(annotation.annotationType())) return true;
			}
		}
		return false;
		
	}

	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		
		String paramName = parameter.getParameterName();
		
		Annotation[] ans = parameter.getParameterAnnotations();
		
		Object value = webRequest.getParameter(paramName);
		
		if(ans!=null){
			for(Annotation annotation : ans){
				
				/////////////////////////////////////////MjNotNull///////////////////////////////////////////////

				if(annotation.annotationType() == MjNotNull.class){
					
					String msg = paramName+"必填";
					MjNotNull mjNotNull = (MjNotNull) annotation;
					String temp = mjNotNull.value();
					if(!StringUtils.isEmpty(temp)){
						msg = temp;
					}
					
					if(parameter.getParameterType()==String.class){
						String vv = webRequest.getParameter(paramName);
						if(StringUtils.isEmpty(vv)) throw new ValidateException(msg);
						return vv;
					}else if(parameter.getParameterType()==String[].class){
						String vv[] = webRequest.getParameterValues(paramName);
						if(vv==null) throw new ValidateException(msg);
						for(String s : vv){
							if(s.trim().equals("")) throw new ValidateException(msg);
						}
						return vv;
					}else{
						throw new ValidateException("MjNotNull只适用于String或String[]参数");
					}
				}
				
				/////////////////////////////////////////MjPattern///////////////////////////////////////////////
				
				if(annotation.annotationType() == MjPattern.class){
					if(parameter.getParameterType()!=String.class) throw new ValidateException("MjPattern只适用于String参数");
					String msg = paramName+"格式不对";
					String vv = webRequest.getParameter(paramName);
					if(vv==null) throw new ValidateException(paramName+"必填");
					MjPattern mjPattern = (MjPattern) annotation;
					String mm = mjPattern.message();
					msg = (StringUtils.isEmpty(mm))? msg : mm;
					String regex = mjPattern.regexp();
					boolean flag = Pattern.matches(regex, vv);
					if(!flag) throw new ValidateException(msg);
					return vv;
				}
				
			}
		}
		
		return value;
	}

}
