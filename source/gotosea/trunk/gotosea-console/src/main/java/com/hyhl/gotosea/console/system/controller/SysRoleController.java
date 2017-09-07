package com.hyhl.gotosea.console.system.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.base.annotation.MjDefaultValue;
import com.hfocean.common.auth.base.annotation.MjNotNull;
import com.hfocean.common.auth.base.eumn.MjValueType;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hfocean.common.auth.system.permission.eumn.PermissionEumn;
import com.hfocean.common.auth.system.role.vo.SysRoleVO;
import com.hyhl.gotosea.console.system.service.ISysRoleService;
import com.hyhl.common.web.WebResponse;



@RestController
@RequestMapping("/sys/role")
public class SysRoleController extends AuthBaseController {

	@Resource
	private ISysRoleService sysRoleService;
	
	@MjPermission(values={PermissionEumn.查找角色列表})
	@RequestMapping("/list")
	public WebResponse roleList(String roleName,Integer status) throws Exception{
		return super.doJsonOut(this.sysRoleService.listRoles(roleName,status));
	}
	
	@MjPermission(values={PermissionEumn.查找角色列表})
	@RequestMapping("/pageList")
	public WebResponse rolePageList(String roleName,HttpServletRequest request) throws Exception{
		Pager<SysRoleVO> pager = this.sysRoleService.listRoles(roleName,new Pager<SysRoleVO>(request));
		return super.doJsonOut(pager);
	}
	
	@MjPermission(values={PermissionEumn.新增角色})
	@RequestMapping("/add")
	public WebResponse roleAdd(@MjNotNull String roleName) throws Exception{
		this.sysRoleService.addRole(roleName,AuthAppContextHelper.getSysUser().getUserName());
		return super.doJsonOut("新增成功");
	}
	
	@MjPermission(values={PermissionEumn.修改角色})
	@RequestMapping("/update")
	public WebResponse roleUpdate(@MjNotNull String roleId,String roleName,String status) throws Exception{
		this.sysRoleService.updateRole(roleId,roleName,status);
		return super.doJsonMsg("修改成功");
	}
	
	@MjPermission(values={PermissionEumn.删除角色})
	@RequestMapping("/del")
	public WebResponse roleDel(@MjNotNull String roleId) throws Exception{
		this.sysRoleService.delRole(roleId);
		return super.doJsonMsg("删除成功");
	}
	
	@MjPermission(values={PermissionEumn.查找角色})
	@RequestMapping("/find")
	public WebResponse roleFind(@MjNotNull String roleId) throws Exception{
		return super.doJsonOut(this.sysRoleService.findRole(roleId));
	}
	
	@MjPermission(values={PermissionEumn.新增角色_权限})
	@RequestMapping("/addRoleResource")
	public WebResponse roleAddResource(@MjNotNull String roleId,@MjNotNull String[] resIds,String delOrAdd) throws Exception{
		this.sysRoleService.addRoleResourceRef(roleId,resIds,delOrAdd);
		return super.doJsonMsg("新增成功");
	}
	
	@MjPermission(values={PermissionEumn.删除角色_权限})
	@RequestMapping("/delRoleResource")
	public WebResponse roleDelResource(@MjNotNull String roleId,@MjNotNull String[] resIds) throws Exception{
		this.sysRoleService.delRoleResourceRef(roleId,resIds);
		return super.doJsonMsg("删除成功");
	}
	
	@MjPermission(values = {PermissionEumn.新增用户_角色})
	@RequestMapping("/addRoleUser")
	public WebResponse roleAddUserRef(@MjNotNull String[] roleIds, @MjNotNull String userName) throws Exception{
		this.sysRoleService.addRoleUserRef(roleIds,userName);
		return super.doJsonMsg("添加成功");
	}
	
	@MjPermission(values={PermissionEumn.删除用户_角色})
	@RequestMapping("/delRoleUser")
	public WebResponse roleDelUserRef(@MjNotNull String[] roleIds,@MjNotNull String userName) throws Exception{
		this.sysRoleService.delRoleUserRef(roleIds,userName);
		return super.doJsonMsg("删除成功");
	}
	
	@MjPermission(values={PermissionEumn.查找用户角色})
	@RequestMapping("/listUserRole")
	public WebResponse listUserRole(@MjDefaultValue(MjValueType.USERNAME) String userName,HttpServletRequest request) throws Exception{
		return super.doJsonOut(this.sysRoleService.listUserRole(userName,new Pager<SysRoleVO>(request)));
	}
	
	
	
	@MjPermission(values={PermissionEumn.新增组织_角色})
	@RequestMapping("/addRoleOrg")
	public WebResponse roleAddOrgRef(@MjNotNull String[] roleIds, @MjNotNull String orgId) throws Exception{
		this.sysRoleService.addRoleOrgRef(roleIds,orgId);
		return super.doJsonMsg("添加成功");
	}
	@MjPermission(values={PermissionEumn.删除组织_角色})
	@RequestMapping("/delRoleOrg")
	public WebResponse roleDelOrgRef(@MjNotNull String[] roleIds,@MjNotNull String orgId) throws Exception{
		this.sysRoleService.delRoleOrgRef(roleIds,orgId);
		return super.doJsonMsg("删除成功");
	}
	@MjPermission(values={PermissionEumn.查找组织角色})
	@RequestMapping("/listOrgRole")
	public WebResponse listOrgRole(@MjDefaultValue(MjValueType.ORGID) String orgId,HttpServletRequest request) throws Exception{
		return super.doJsonOut(this.sysRoleService.listOrgRole(orgId,new Pager<SysRoleVO>(request)));
	}
	
	
	
	
	
	
	
	
	
	
}
