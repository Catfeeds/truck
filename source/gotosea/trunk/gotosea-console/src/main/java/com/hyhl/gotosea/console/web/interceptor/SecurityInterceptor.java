package com.hyhl.gotosea.console.web.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.base.utils.ConstantHelper;
import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hfocean.common.auth.system.permission.eumn.PermissionEumn;
import com.hfocean.common.auth.system.permission.service.ISysPermissionService;
import com.hfocean.common.auth.system.permission.vo.SysPermissionVO;
import com.hfocean.common.auth.system.user.eumn.UserType;
import com.hfocean.common.auth.util.CookieTools;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.system.exception.ForbiddenException;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;

/**
 * 用户安全验证拦截器
 * @author Administrator
 *
 */
@Component
public class SecurityInterceptor implements HandlerInterceptor {
	
	
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
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object handler) throws Exception {
		if(handler instanceof HandlerMethod){
            HandlerMethod method = (HandlerMethod)handler;
            
            //A端权限、登录默认拦截
    		MjPermission permission = method.getMethodAnnotation(MjPermission.class);
    		if(permission!=null) permissionHandler(permission);
    		 //A端权限、登录扩展拦截
    		ExtPermission extPermission = method.getMethodAnnotation(ExtPermission.class);
    		if(extPermission!=null) permissionHandler(extPermission);
		}
		return true;
	}
	
	private void permissionHandler(MjPermission permission) {
		ISysPermissionService sysPermissionService = AuthAppContextHelper.getBean("sysPermissionService",ISysPermissionService.class);
		if(AuthAppContextHelper.getSysUser()==null){
			if(CookieTools.getCookie(AuthAppContextHelper.HAILE_A_KEY) == null){
				throw new BaseBusinessException("399", ConstantHelper.LOGIN_MESSAGE);
			}else{
				throw new BaseBusinessException("399", ConstantHelper.LOGIN_MESSAGE_RE);
			}
		}
		if(!AuthAppContextHelper.isSupperAdmin(AuthAppContextHelper.getSysUser())){
			List<SysPermissionVO> ps = sysPermissionService.listMyPermission(AuthAppContextHelper.getSysUser().getUserName());
			PermissionEumn[] pes = permission.values();
			UserType[] types = permission.userTypes();
			boolean flag = false;
			int userType = AuthAppContextHelper.getSysUser().getType();
			List<String> ls = new ArrayList<String>();
			// 用户类型
			if(types!=null && types.length>0){
				for(UserType t : types){
					if(t.type() <= userType){
						flag = true;break;
					}else{
						ls.add(t.name());
					}
					
				}
				if(!flag) throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_USER_MESSAGE,ls.toString()));
				else ls = new ArrayList<String>();
			}
			
			//权限
			flag = pes.length==0;
			if(!flag){
				if(ps==null || ps.size()==0){
					for(PermissionEumn pe : pes){
						ls.add(pe.name());
					}
					throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_PERMISSION_MESSAGE,ls.toString()));
				}
			}
			for(PermissionEumn pe : pes){
				for(SysPermissionVO spv : ps){
					if(spv.getResId().equals(pe.value)){
						flag = true; break;
					}
				}
				if(!flag){
					ls.add(pe.name());
//    								break;
				}
			}
			if(!flag) throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_PERMISSION_MESSAGE,ls.toString()));
		}
	}
	
	private void permissionHandler(ExtPermission permission) {
		ISysPermissionService sysPermissionService = AuthAppContextHelper.getBean("sysPermissionService",ISysPermissionService.class);
		if(AuthAppContextHelper.getSysUser()==null){
			if(CookieTools.getCookie(AuthAppContextHelper.HAILE_A_KEY) == null){
				throw new BaseBusinessException("399", ConstantHelper.LOGIN_MESSAGE);
			}else{
				throw new BaseBusinessException("399", ConstantHelper.LOGIN_MESSAGE_RE);
			}
		}
		if(!AuthAppContextHelper.isSupperAdmin(AuthAppContextHelper.getSysUser())){
			List<SysPermissionVO> ps = sysPermissionService.listMyPermission(AuthAppContextHelper.getSysUser().getUserName());
			ExtPermissionEumn[] pes = permission.values();
			UserType[] types = permission.userTypes();
			boolean flag = false;
			int userType = AuthAppContextHelper.getSysUser().getType();
			List<String> ls = new ArrayList<String>();
			// 用户类型
			if(types!=null && types.length>0){
				for(UserType t : types){
					if(t.type() <= userType){
						flag = true;break;
					}else{
						ls.add(t.name());
					}
					
				}
				if(!flag) throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_USER_MESSAGE,ls.toString()));
				else ls = new ArrayList<String>();
			}
			
			//权限
			flag = pes.length==0;
			if(!flag){
				if(ps==null || ps.size()==0){
					for(ExtPermissionEumn pe : pes){
						ls.add(pe.name());
					}
					throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_PERMISSION_MESSAGE,ls.toString()));
				}
			}
			for(ExtPermissionEumn pe : pes){
				for(SysPermissionVO spv : ps){
					if(spv.getResId().equals(pe.value)){
						flag = true; break;
					}
				}
				if(!flag){
					ls.add(pe.name());
//    								break;
				}
			}
			if(!flag) throw new ForbiddenException(String.format(ConstantHelper.FORBIDDEN_PERMISSION_MESSAGE,ls.toString()));
		}
	}
}

