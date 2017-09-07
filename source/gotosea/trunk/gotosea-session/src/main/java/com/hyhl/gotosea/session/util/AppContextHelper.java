package com.hyhl.gotosea.session.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hyhl.gotosea.session.BaseSessionUser;

/**Session工具类，上下文工具类
 * SpringContextHelper
 * @author guan.sj
 */
@Component
public class AppContextHelper implements ApplicationContextAware {

    public static ApplicationContext applicationContext;
    
    @SuppressWarnings("static-access")
	@Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
    
    
    public static final String currentUserKey = "_currentUser";

	/**
	 * 获取当前session用户
	 * @return
	 */
	public static BaseSessionUser getCurrentUser(){
		HttpSession session = getSession();
		Object obj = session.getAttribute(currentUserKey);
		return null==obj?null:(BaseSessionUser)obj;
	}
	
	/**
	 * 设置当前session用户
	 * @param user
	 */
	public static void setCurrentUser(BaseSessionUser obj){
		HttpSession session = getSession();
		session.setAttribute(currentUserKey, obj);
	}
	
	/**
	 * 退出登录
	 */
	public static void removeCurrentUser(){
		HttpSession session = getSession();
		session.removeAttribute(currentUserKey);
	}
	
	
	public static String getRequestIp(){
		HttpServletRequest request = getRequest();
		String ip = request.getHeader("X-Forwarded-For");  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("WL-Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_CLIENT_IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getRemoteAddr();  
	    }
		return ip;
	}
    
    public static HttpSession getSession(){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		return sra.getRequest().getSession();
	}
    
    public static HttpServletResponse getResponse(){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		return sra.getResponse();
	}
	
	public static HttpServletRequest getRequest(){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		return sra.getRequest();
	}

    public static <T> T getBean(String beanName,Class<T> clazz){
        return applicationContext.getBean(beanName, clazz);
    }

    public static <T> T getBean(Class<T> clazz){
        return applicationContext.getBean(clazz);
    }
}
