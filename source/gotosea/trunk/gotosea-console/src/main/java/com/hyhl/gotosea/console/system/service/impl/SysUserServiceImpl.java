package com.hyhl.gotosea.console.system.service.impl;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.base.utils.ConstantHelper;
import com.hfocean.common.auth.mapper.UserOrgRefMapper;
import com.hfocean.common.auth.pojo.SysUserPO;
import com.hfocean.common.auth.pojo.UserOrgRef;
import com.hfocean.common.auth.system.org.dao.ISysOrgDao;
import com.hfocean.common.auth.system.user.dao.ISysUserDao;
import com.hfocean.common.auth.system.user.dao.UserOrgRefDao;
import com.hfocean.common.auth.system.user.param.UserAdd;
import com.hfocean.common.auth.system.user.param.UserList;
import com.hfocean.common.auth.system.user.param.UserUpdate;
import com.hfocean.common.auth.system.user.vo.SysUserVO;
import com.hfocean.common.auth.util.StringUtil;
import com.hyhl.gotosea.console.system.exception.BusinessException;
import com.hyhl.gotosea.console.system.service.ISysUserService;

@Service("sysUserService")
public class SysUserServiceImpl implements ISysUserService {
	
	@Resource
	private ISysUserDao sysUserDao;
	
	@Resource
	private ISysOrgDao sysOrgDao;

    @Resource
    private UserOrgRefDao userOrgRefDao;
    
    @Resource
    private UserOrgRefMapper userOrgRefMapper;
    
	public Pager<SysUserVO> listUsers(UserList param, Pager<SysUserVO> pager)  {
//		 if(!Objects.equals(AuthAppContextHelper.getSysUser().getUserName(),ConstantHelper.SUPER_ADMIN_NAME)){
//			if(StringUtil.isNull(param.getOrgId()))param.setOrgId(AuthAppContextHelper.getSysUser().getOrgId());
//		 }
		 List<SysUserVO> list = this.sysUserDao.listUsers(param,pager);
		 pager.setPageData(list);
		 return pager;
	}

	public void addUser(UserAdd user)  {
        String userName = user.getUserName();
        UserList userList = new UserList();
        userList.setUserName(userName);
        if(userName.equalsIgnoreCase(ConstantHelper.SUPER_ADMIN_NAME)||null!=sysUserDao.findUser(userList))
            throw new BusinessException("新增失败,用户名已存在");
		SysUserPO po = new SysUserPO();
		BeanUtils.copyProperties(user, po);
		po.setPassword(DigestUtils.md5DigestAsHex(po.getPassword().getBytes()).toUpperCase());
		po.setCreater(AuthAppContextHelper.getSysUser().getUserName());
		this.sysUserDao.addUser(po);
		if(this.sysOrgDao.findOrg(user.getOrgId())==null) throw new BusinessException("新增失败,不存在该组织");
		this.sysOrgDao.addUserOrgRef(user.getUserName(),user.getOrgId(),po.getCreater());
	}

	public SysUserVO updateUser(UserUpdate user)  {
        String userName = user.getUserName();
        UserList userList = new UserList();
        userList.setUserName(userName);
        if(null==sysUserDao.findUser(userList))throw new BusinessException("更新失败,不存在该用户");
        if(!StringUtil.isNull(user.getPassword())){
            user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()).toUpperCase());
        }
        SysUserPO po = new SysUserPO();
        BeanUtils.copyProperties(user, po);

        sysUserDao.updateUser(po);
        SysUserVO vo = new SysUserVO();
        BeanUtils.copyProperties(po, vo);
        vo.setOrgId(AuthAppContextHelper.getSysUser().getOrgId());
        //修改组织
        String orgId = user.getOrgId();
        if(orgId!=null){
			if(this.sysOrgDao.findOrg(orgId)==null) throw new BusinessException("更新失败,不存在该组织");
            if(isValidCollection(userOrgRefMapper.findUserOrgRefList(userName))){
                this.sysOrgDao.updateUserOrgRef(userName,orgId);
            }else {
                UserOrgRef userOrgRef = new UserOrgRef();
                userOrgRef.setCreater(AuthAppContextHelper.getSysUserName());
                userOrgRef.setCreateTime(new Date());
                userOrgRef.setUserName(userName);
                userOrgRef.setOrgId(orgId);
                userOrgRefMapper.addUserOrgRef(userOrgRef);
            }
            vo.setOrgId(orgId);
		}
        return vo;
	}
	
	private boolean isValidCollection(@SuppressWarnings("rawtypes") Collection collection){
        return null!=collection &&collection.size()>0;
    }

	public void delUser(String userName)  {
		UserList user = new UserList();
		user.setUserName(userName);
		if(this.findUser(user)==null) throw new BusinessException("删除失败,不存在该用户");
		this.sysUserDao.delUser(userName);
	}

	public SysUserVO findUser(UserList user)  {
		//超级管理员
		String superAdminName = ConstantHelper.SUPER_ADMIN_NAME;
		String superAdminPassword = ConstantHelper.SUPER_ADMIN_PASSWORD;
		if(user.getUserName().equals(superAdminName) && user.getPassword().equalsIgnoreCase(superAdminPassword)){
			SysUserVO u = new SysUserVO();
			u.setNickName(ConstantHelper.ADMIN_NICK_NAME);
			u.setUserName(superAdminName);
			u.setPassword(superAdminPassword);
			u.setStatus(1);
			u.setType(2);
			u.setHasChildOrg(1);
			return u;
		}
		return this.sysUserDao.findUser(user);
	}

	public void updatePassword(String userName,String newPassowrd, String oldPassword)  {
		UserList user = new UserList();
		user.setUserName(userName);
		user.setPassword(DigestUtils.md5DigestAsHex(oldPassword.getBytes()).toUpperCase());
		if(this.findUser(user)==null) throw new BusinessException("修改失败,原密码不正确");
		this.sysUserDao.updatePassword(userName,DigestUtils.md5DigestAsHex(newPassowrd.getBytes()).toUpperCase());
	}

	public void updateResetPassword(String userName,String password)  {
		this.sysUserDao.updatePassword(userName,DigestUtils.md5DigestAsHex(password.getBytes()).toUpperCase());
	}

}
