package com.hyhl.gotosea.console.system.controller;

import java.util.Objects;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hfocean.common.auth.base.Pager;
import com.hfocean.common.auth.base.annotation.MjNotNull;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.base.utils.ConstantHelper;
import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hfocean.common.auth.system.permission.eumn.PermissionEumn;
import com.hfocean.common.auth.system.user.eumn.UserEumn;
import com.hfocean.common.auth.system.user.param.UserAdd;
import com.hfocean.common.auth.system.user.param.UserList;
import com.hfocean.common.auth.system.user.param.UserUpdate;
import com.hfocean.common.auth.system.user.vo.SysUserVO;
import com.hfocean.common.auth.util.StringUtil;
import com.hyhl.gotosea.console.system.exception.BusinessException;
import com.hyhl.gotosea.console.system.service.ISysUserService;
import com.hyhl.gotosea.session.util.AppContextHelper;


@RestController
public class SysUserController extends AuthBaseController{
	
	@Resource
	private ISysUserService sysUserService;

	/**
	 * 分页查询用户列表
	 * @param param
	 * @param errors
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@MjPermission(values={PermissionEumn.查找用户列表})
	@RequestMapping("/sys/user/list")
	public WebResponse userList(@Validated UserList param,HttpServletRequest request) throws Exception{
		Pager<SysUserVO> pager = this.sysUserService.listUsers(param,new Pager<SysUserVO>(request));
		return super.doJsonOut(pager);
	}
	
	/**
	 * 添加
	 * @param user
	 * @param errors
	 * @return
	 * @throws Exception
	 */
	@MjPermission(values={PermissionEumn.新增用户})
	@RequestMapping("/sys/user/add")
	public WebResponse userAdd(@Validated UserAdd user) throws Exception{
		this.sysUserService.addUser(user);
		return super.doJsonOut("新增成功",this.sysUserService.findUser(new UserList(user.getUserName())));
	}
	
	/**
	 * 修改
	 * @param user
	 * @param errors
	 * @return
	 * @throws Exception
	 */
	@MjPermission(values={PermissionEumn.修改用户})
	@RequestMapping("/sys/user/update")
	public WebResponse userUpdate(@Validated UserUpdate user) throws Exception{
        String userName = user.getUserName();
        if(StringUtil.isNull(userName))throw new BusinessException("用户账号不能为空");
		SysUserVO vo = this.sysUserService.updateUser(user);
		//判断用户状态是否正常
		if(Objects.equals(vo.getStatus(), UserEumn.不可用.code())){
			//踢出用户下线
			//TODO ADD
//			AppContextHelper.kickOutUser(vo.getUserName());
		}
		return super.doJsonOut("修改成功",this.sysUserService.findUser(new UserList(userName)));
	}

	/**
	 * 用户修改个人信息
	 * @param user
	 * @param errors
	 * @return
	 * @throws Exception
     */
	@MjPermission
	@RequestMapping("/sys/user/updateMyInfo")
	public WebResponse updateMyInfo(@Validated UserUpdate user) throws Exception{
		String userName = AuthAppContextHelper.getSysUser().getUserName();
		if(Objects.equals(userName,ConstantHelper.SUPER_ADMIN_NAME))return super.doJsonMsg("不能修改超级管理员信息");
		user.setUserName(userName);
		user.setOrgId(null);//用户不能自己改组织
		SysUserVO po = this.sysUserService.updateUser(user);
		//重置session
		SysUserVO sysUserVO = new SysUserVO();
		BeanUtils.copyProperties(po, sysUserVO);
		AuthAppContextHelper.setSysUser(sysUserVO);
		return super.doJsonOut("修改成功",this.sysUserService.findUser(new UserList(user.getUserName())));
	}
	
	/**
	 * 删除
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	@MjPermission(values={PermissionEumn.删除用户})
	@RequestMapping("/sys/user/del")
	public WebResponse userDel(@MjNotNull String userName) throws Exception{
		this.sysUserService.delUser(userName);
		return super.doJsonMsg("删除成功");
	}
	
	/**
	 * 查询用户信息
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	@MjPermission(values={PermissionEumn.查找用户})
	@RequestMapping("/sys/user/find")
	public WebResponse userFind(@MjNotNull String userName) throws Exception{
		UserList user = new UserList();
		user.setUserName(userName);
		return super.doJsonOut(this.sysUserService.findUser(user));
	}
	
	/**
	 * 登录
	 * @param userName
	 * @param password
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/auth/login")
	public WebResponse userLogin(@MjNotNull String userName,@MjNotNull String password,@MjNotNull String verifycode) throws Exception{
		
		Object obj = AppContextHelper.getSession().getAttribute("LOGIN.CHECK_CODE");
		if(obj==null) throw new BusinessException("验证码已失效,请重新获取验证码");
		String code = String.valueOf(obj);
		if(!verifycode.equals(code))  throw new BusinessException("验证码错误");

		UserList user = new UserList();
		user.setUserName(userName);
		String upperCase = DigestUtils.md5DigestAsHex(password.getBytes()).toUpperCase();
		user.setPassword(upperCase);
		SysUserVO vo = this.sysUserService.findUser(user);
		if(vo==null) throw new BusinessException("用户名或密码错误");
		if(ConstantHelper.UNAVAILABLE == vo.getStatus()) throw new BusinessException("该账户已被停用");
		//存session
		AuthAppContextHelper.setSysUser(vo);
		return super.doJsonOut(vo);
	}
	
	/**
	 * 退出登录
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/auth/logout")
	public WebResponse userLogout() throws Exception{
		AuthAppContextHelper.removeSysUser();
		return super.doJsonMsg("已退出系统");
	}
	
	/**
	 * 当前用户信息
	 * @return
	 * @throws Exception
	 */
	@MjPermission
	@RequestMapping("/sys/user/info")
	public WebResponse getCurrentUserInfo() throws Exception{
		return super.doJsonOut(AuthAppContextHelper.getSysUser());
	}

}
