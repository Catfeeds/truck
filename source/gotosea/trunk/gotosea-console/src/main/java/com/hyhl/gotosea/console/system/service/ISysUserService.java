package com.hyhl.gotosea.console.system.service;

import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.system.user.param.UserAdd;
import com.hfocean.common.auth.system.user.param.UserList;
import com.hfocean.common.auth.system.user.param.UserUpdate;
import com.hfocean.common.auth.system.user.vo.SysUserVO;

public interface ISysUserService {

	Pager<SysUserVO> listUsers(UserList param, Pager<SysUserVO> pager) ;

	void addUser(UserAdd user) ;

	SysUserVO updateUser(UserUpdate user) ;

	void delUser(String userName) ;

	SysUserVO findUser(UserList user) ;

	void updatePassword(String userName,String newPassowrd, String oldPassword) ;

	void updateResetPassword(String userName,String password) ;



}
