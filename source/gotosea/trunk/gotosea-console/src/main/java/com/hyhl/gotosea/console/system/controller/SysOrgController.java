package com.hyhl.gotosea.console.system.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hfocean.common.auth.base.annotation.MjNotNull;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.system.org.param.AddOrg;
import com.hfocean.common.auth.system.org.param.UpdateOrg;
import com.hfocean.common.auth.system.org.vo.SysOrgVO;
import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hfocean.common.auth.system.permission.eumn.PermissionEumn;
import com.hyhl.gotosea.console.system.service.ISysOrgService;
import com.hyhl.common.web.WebResponse;


@RestController
@RequestMapping("/sys/org")
public class SysOrgController extends AuthBaseController {
	
	@Resource
	private ISysOrgService sysOrgService;
	
	@MjPermission(values={PermissionEumn.新增组织})
	@RequestMapping("/add")
	public WebResponse addOrg(@Validated AddOrg param) throws Exception{
		String userName = AuthAppContextHelper.getSysUser().getUserName();
		SysOrgVO vo = new SysOrgVO();
		BeanUtils.copyProperties(param, vo);
		vo.setCreater(userName);
		SysOrgVO org = this.sysOrgService.addOrg(vo);
		return super.doJsonOut("新增成功", org);
	}
	
	@MjPermission(values={PermissionEumn.删除组织})
	@RequestMapping("/del")
	public WebResponse delOrg(@MjNotNull String orgId,@RequestParam(defaultValue="false") boolean delChild) throws Exception{
		this.sysOrgService.delOrg(orgId,delChild);
		return super.doJsonMsg("删除成功");
	}
	
	@MjPermission
	@RequestMapping("/listCurrentUserOrg")
	public WebResponse listCurrentUserOrg() throws Exception{
		List<SysOrgVO> list = this.sysOrgService.listCurrentUserOrg();
		return super.doJsonOut(list);
	}
	
	@MjPermission(values={PermissionEumn.修改组织})
	@RequestMapping("/update")
	public WebResponse updateOrg(@Validated UpdateOrg param) throws Exception{
		SysOrgVO org = new SysOrgVO();
		BeanUtils.copyProperties(param, org);
		return super.doJsonOut("修改成功",this.sysOrgService.updateOrg(org));
	}
	
	@MjPermission(values={PermissionEumn.查找组织})
	@RequestMapping("/find")
	public WebResponse findOrg(@MjNotNull String orgId) throws Exception{
		return super.doJsonOut(this.sysOrgService.findOrg(orgId));
	}
}
