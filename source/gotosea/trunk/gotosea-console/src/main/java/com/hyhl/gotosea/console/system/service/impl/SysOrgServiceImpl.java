package com.hyhl.gotosea.console.system.service.impl;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hfocean.common.auth.base.utils.ConstantHelper;
import com.hfocean.common.auth.pojo.SysOrgPO;
import com.hfocean.common.auth.system.org.dao.ISysOrgDao;
import com.hfocean.common.auth.system.org.vo.SysOrgVO;
import com.hfocean.common.auth.system.user.vo.SysUserVO;
import com.hyhl.gotosea.console.system.exception.BusinessException;
import com.hyhl.gotosea.console.system.exception.ForbiddenException;
import com.hyhl.gotosea.console.system.service.ISysOrgService;

@Service("sysOrgService")
public class SysOrgServiceImpl implements ISysOrgService {

	@Resource
	private ISysOrgDao sysOrgDao;
	
	public SysOrgVO addOrg(SysOrgVO vo)  {
		String parentId = vo.getParentId();
		//TODO test
		if(!StringUtils.isEmpty(parentId)){
			if(this.findOrg(parentId)==null) throw new BusinessException("新增失败,该父组织不存在");
		}else{
			if(AuthAppContextHelper.getSysUser().getType()!=ConstantHelper.SUPERADMIN_USER) throw new ForbiddenException(ConstantHelper.FORBIDDEN_PERMISSION_MESSAGE);
		}
		SysOrgPO po = new SysOrgPO();
		String orgId = UUID.randomUUID().toString();
		BeanUtils.copyProperties(vo, po);
		po.setOrgId(orgId);
		if(vo.getStatus()==null) po.setStatus(1);
		this.sysOrgDao.addOrg(po);
		return this.findOrg(orgId);
	}

	public void delOrg(String orgId,boolean delChild)  {
		SysOrgVO vo = this.findOrg(orgId);
		if(vo==null) throw new BusinessException("删除失败,该组织不存在");
		if(vo.getParentId()==null) throw new BusinessException("删除失败,顶级组织不允许删除");
		this.sysOrgDao.delOrg(orgId,AuthAppContextHelper.getSysUser().getUserName(),delChild);
	}

	public List<SysOrgVO> listCurrentUserOrg()  {
		SysUserVO user = AuthAppContextHelper.getSysUser();
		if(AuthAppContextHelper.isSupperAdmin(user)){
			return this.sysOrgDao.listAllOrg();
		}
		return this.sysOrgDao.listCurrentUserOrg(user.getOrgId());
	}

	public SysOrgVO updateOrg(SysOrgVO org)  {
		if(this.findOrg(org.getOrgId())==null) throw new BusinessException("修改失败,该组织不存在");
		SysOrgPO po = new SysOrgPO();
		BeanUtils.copyProperties(org, po);
		this.sysOrgDao.updateOrg(po);
		return findOrg(po.getOrgId());
	}

	public SysOrgVO findOrg(String orgId)  {
		return this.sysOrgDao.findOrg(orgId);
	}
}
