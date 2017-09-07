package com.hyhl.gotosea.app.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CustError;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;


/**
 * 用户安全验证拦截器
 * @author Administrator
 *
 */
@Component
public class SecurityInterceptor implements HandlerInterceptor {
	
	@Autowired
	private CustMapper custMapper;
	
	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			HandlerMethod method = (HandlerMethod) handler;
			// 用户权限拦截
			Login login = method.getMethodAnnotation(Login.class);
			if (login != null){
				BaseSessionUser currentUser = AppContextHelper.getCurrentUser();
				//登录拦截
				loginValidate(currentUser);
				//商家认证权限拦截
				if(login.merchantAuth())merchantAuthValidate(currentUser);
			}
		}
		return true;
	}

	private void merchantAuthValidate(BaseSessionUser currentUser) {
		//验证登录
		Integer merchantStatus = currentUser.getMerchantStatus();
		if(merchantStatus==null || merchantStatus!=CustEnum.商家认证状态认证成功.getCode()){
			Cust cust = custMapper.selectByPrimaryKey(currentUser.getId());
			if(cust==null||cust.getMerchantStatus()!=CustEnum.商家认证状态认证成功.getCode()){
				throw new BaseBusinessException(CustError.MERCHANT_FORBIDDEN);
			}
		}
	}

	private void loginValidate(BaseSessionUser currentUser) {
		//验证登录
		if (currentUser == null) {
			throw new BaseBusinessException(LoginError.UNAUTHORIZED);
		}
		if(currentUser.getStatus()!=CustEnum.客户状态生效.getCode()){
			throw new BaseBusinessException(LoginError.CUST_FORBIDDEN);
		}
	}
	
}

