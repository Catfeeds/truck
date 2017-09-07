package com.hyhl.gotosea.console.system.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.pojo.SysRolePO;
import com.hfocean.common.auth.system.role.dao.ISysRoleDao;
import com.hfocean.common.auth.system.role.vo.SysRoleResourceRefVO;
import com.hfocean.common.auth.system.role.vo.SysRoleVO;
import com.hfocean.common.auth.system.user.dao.ISysUserDao;
import com.hfocean.common.auth.system.user.param.UserList;
import com.hyhl.gotosea.console.system.exception.BusinessException;
import com.hyhl.gotosea.console.system.service.ISysRoleService;

@Service("sysRoleService")
public class SysRoleServiceImpl implements ISysRoleService {
	
	@Resource
	private ISysRoleDao sysRoleDao;
	
	@Resource
	private ISysUserDao sysUserDao;
	

	public Pager<SysRoleVO> listRoles(String roleName, Pager<SysRoleVO> pager)  {
		List<SysRoleVO> list = this.sysRoleDao.listRoles(roleName,pager);
		pager.setPageData(list);
		return pager;
	}

	public void addRole(String roleName,String creater)  {
		SysRolePO po = new SysRolePO();
		po.setCreater(creater);
		po.setRoleName(roleName);
		po.setStatus(1);
		this.sysRoleDao.addRole(po);
	}

	public void updateRole(String id,String roleName,String status)  {
		SysRoleVO vo =  this.findRole(id);
		if(vo==null) throw new BusinessException("修改失败,该角色不存在");
		vo.setRoleName(roleName);
		SysRolePO po = new SysRolePO();
		BeanUtils.copyProperties(vo, po);
		po.setStatus(Integer.parseInt(status));
		this.sysRoleDao.updateRole(po);
	}

	public void delRole(String id)  {
		if(this.findRole(id)==null) throw new BusinessException("删除失败,该角色不存在");
//		long num = this.sysRoleDao.isRoleRef(id);
//		if(num>0) throw new BusinessException("删除失败,该角色已被引用");
		StringBuilder sb = new StringBuilder();
		String orgMsg = this.sysRoleDao.listRoleRefOrg(id);
		String userMsg = this.sysRoleDao.listRoleRefUser(id);
		
		if(orgMsg!=null && !orgMsg.isEmpty()){
			sb.append("组织["+orgMsg+"]拥有该角色,");
		}
		if(userMsg!=null && !userMsg.isEmpty()){
			sb.append("用户["+userMsg+"]拥有该角色");
		}
		if(sb.length()>0) {
			sb.insert(0, "删除失败,");
			throw new BusinessException(sb.toString());
		}
		this.sysRoleDao.delRole(id);
	}

	public SysRoleVO findRole(String id)  {
		return this.sysRoleDao.findRole(id);
	}

	public void addRoleResourceRef(String roleId, String[] resIds,String delOrAdd)  {
		
		if(this.findRole(roleId)==null) throw new BusinessException("新增失败,该角色不存在");
		
//		for(String res : resIds){
//			if(PermissionHelper.findName(res)==null) throw new BusinessException("新增失败,存在无效的资源ID");
//		}
		
		if(delOrAdd==null || (!delOrAdd.trim().equals("0") && !delOrAdd.trim().equals("1"))){
			delOrAdd = "0";
		}
		List<String> existRes = new ArrayList<String>();
		List<SysRoleResourceRefVO> list = this.sysRoleDao.listRoleResourceRef(roleId);
		if(list!=null){
			for(SysRoleResourceRefVO v : list){
				existRes.add(v.getResId());
			}
		}
		List<String> newRes = new ArrayList<String>();
		List<String> updateRes = new ArrayList<String>();
		for(String s : resIds){
			if(existRes.contains(s)){
				updateRes.add(s);
				continue;
			}
			newRes.add(s);
		}
		
		
		if(updateRes.size()>0)
		//已存在-更新状态
		this.sysRoleDao.updateRoleResourceRef(roleId,StringUtils.collectionToDelimitedString(updateRes, ","),delOrAdd);
		if(newRes.size()>0)
		//新的-直接添加
		this.sysRoleDao.addRoleResourceRef(roleId,newRes,delOrAdd,AuthAppContextHelper.getSysUser().getUserName());
		
	}

	public void delRoleResourceRef(String id, String[] resIds)  {
		if(this.findRole(id)==null) throw new BusinessException("删除失败,该角色不存在");
		this.sysRoleDao.delRoleResourceRef(id,StringUtils.arrayToDelimitedString(resIds, ","));
	}

	
	public void addRoleUserRef(String[] roleIds, String userName)  {
		if(this.sysUserDao.findUser(new UserList(userName))==null) throw new BusinessException("新增失败,该用户不存在");
//		long count = this.sysRoleDao.countRole(StringUtils.arrayToDelimitedString(roleIds, ","));
//		if(count!=roleIds.length) throw new BusinessException("新增失败,存在无效的角色ID");
		
		List<SysRoleVO> list = this.sysRoleDao.listUserRole(userName, new Pager<SysRoleVO>(10000));
		
		List<String> newRoleIds = new ArrayList<String>();
		List<String> sList = Arrays.asList(roleIds);
		for(String v : sList){
			boolean flag = false;
			for(SysRoleVO vo : list){
				if(vo.getRoleId().equals(v)){
					flag = true;
					break;
				}
			}
			if(!flag)
			newRoleIds.add(v);
		}
		if(newRoleIds.size()>0) this.sysRoleDao.addRoleUserRef(newRoleIds.toArray(new String[]{}),userName,AuthAppContextHelper.getSysUser().getUserName());
		else throw new BusinessException("用户已包含所选角色");
	}

	public void delRoleUserRef(String[] roleIds, String userName)  {
		if(this.sysUserDao.findUser(new UserList(userName))==null) throw new BusinessException("删除失败,该用户不存在");
//		long count = this.sysRoleDao.countRole(StringUtils.arrayToDelimitedString(roleIds, ","));
//		if(count!=roleIds.length) throw new BusinessException("删除失败,存在无效的角色ID");
		this.sysRoleDao.delRoleUserRef(StringUtils.arrayToDelimitedString(roleIds, ","),userName);
	}

	public List<SysRoleVO> listRoles(String roleName,Integer status)  {
		return this.sysRoleDao.list4Roles(roleName,status);
	}

	public Pager<SysRoleVO> listUserRole(String userName,Pager<SysRoleVO> pager)  {
		List<SysRoleVO> list = this.sysRoleDao.listUserRole(userName, pager);
		pager.setPageData(list);
		return pager;
	}

	public void addRoleOrgRef(String[] roleIds, String orgId) {
//		long count = this.sysRoleDao.countRole(StringUtils.arrayToDelimitedString(roleIds, ","));
//		if(count!=roleIds.length) throw new BusinessException("新增失败,存在无效的角色ID");
//		
		List<SysRoleVO> list = this.sysRoleDao.listOrgRole(orgId, new Pager<SysRoleVO>(10000));
		
		List<String> newRoleIds = new ArrayList<String>();
		List<String> sList = Arrays.asList(roleIds);
		for(String v : sList){
			boolean flag = false;
			for(SysRoleVO vo : list){
				if(vo.getRoleId().equals(v)){
					flag = true;
					break;
				}
			}
			if(!flag)
			newRoleIds.add(v);
		}
		if(newRoleIds.size()>0) this.sysRoleDao.addRoleOrgRef(newRoleIds.toArray(new String[]{}),orgId,AuthAppContextHelper.getSysUser().getUserName());
		else throw new BusinessException("用户已包含所选角色");
	}

	public void delRoleOrgRef(String[] roleIds, String orgId) {
//		long count = this.sysRoleDao.countRole(StringUtils.arrayToDelimitedString(roleIds, ","));
//		if(count!=roleIds.length) throw new BusinessException("删除失败,存在无效的角色ID");
		this.sysRoleDao.delRoleOrgRef(StringUtils.arrayToDelimitedString(roleIds, ","),orgId);
	}

	public Pager<SysRoleVO> listOrgRole(String orgId, Pager<SysRoleVO> pager) {
		List<SysRoleVO> list = this.sysRoleDao.listOrgRole(orgId, pager);
		pager.setPageData(list);
		return pager;
	}

}
