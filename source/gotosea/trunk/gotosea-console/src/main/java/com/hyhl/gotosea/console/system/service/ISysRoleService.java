package com.hyhl.gotosea.console.system.service;

import java.util.List;

import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.system.role.vo.SysRoleVO;

public interface ISysRoleService {

	Pager<SysRoleVO> listRoles(String roleName,Pager<SysRoleVO> pager) ;

	void addRole(String roleName,String creater) ;

	void updateRole(String id,String roleName,String status) ;

	void delRole(String id) ;

	SysRoleVO findRole(String id) ;

	void addRoleResourceRef(String id, String[] resIds,String delOrAdd) ;

	void delRoleResourceRef(String id, String[] resIds) ;

	void addRoleUserRef(String[] roleIds, String userName) ;

	void delRoleUserRef(String[] roleIds, String userName) ;

	List<SysRoleVO> listRoles(String roleName,Integer status) ;

	Pager<SysRoleVO> listUserRole(String userName,Pager<SysRoleVO> pager) ;

	void addRoleOrgRef(String[] roleIds, String orgId);

	void delRoleOrgRef(String[] roleIds, String orgId);

	Pager<SysRoleVO> listOrgRole(String orgId, Pager<SysRoleVO> pager);

}
