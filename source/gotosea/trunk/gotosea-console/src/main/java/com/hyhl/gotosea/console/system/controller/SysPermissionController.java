package com.hyhl.gotosea.console.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hfocean.common.auth.base.annotation.MjNotNull;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hfocean.common.auth.system.permission.service.ISysPermissionService;
import com.hfocean.common.auth.system.permission.service.PermissionHelper;
import com.hfocean.common.auth.system.permission.vo.SysPermissionVO;
import com.hfocean.common.auth.system.user.vo.SysUserVO;
import com.hyhl.common.web.WebResponse;


@RestController
@RequestMapping("/sys/permission")
public class SysPermissionController extends AuthBaseController {
	
	@Resource
	private ISysPermissionService sysPermissionService;
	
	@Resource
	private PermissionHelper permissionHelper;

	@MjPermission()
	@RequestMapping("/myPermission")
	public WebResponse listMyPermission() throws Exception{
		SysUserVO user = AuthAppContextHelper.getSysUser();
		Map<String,Object> map = new HashMap<String,Object>();
		List<SysPermissionVO> list = this.sysPermissionService.listMyPermission(user.getUserName());
		map.put("rights", list);
		map.put("userInfo", user);
		return super.doJsonOut(map);
	}
	
	@MjPermission()
	@RequestMapping("/listByRoleId")
	public WebResponse listPermissionByRoleId(@MjNotNull String roleId) throws Exception{
		
		List<SysPermissionVO> list = this.sysPermissionService.listPermissionByRoleId(roleId);
		
		return super.doJsonOut(list);
	}
	
	@MjPermission()
	@RequestMapping("/listAll")
	public WebResponse listAllPermission() throws Exception{
		return super.doJsonOut(permissionHelper.getAllPermission());
	}
	
}
