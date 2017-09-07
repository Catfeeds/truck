package com.hyhl.gotosea.console.system.service;

import java.util.List;

import com.hfocean.common.auth.system.org.vo.SysOrgVO;

public interface ISysOrgService {

	SysOrgVO addOrg(SysOrgVO vo) ;

	void delOrg(String orgId,boolean delChild) ;

	List<SysOrgVO> listCurrentUserOrg() ;

	SysOrgVO updateOrg(SysOrgVO org) ;

	SysOrgVO findOrg(String orgId) ;
	
}
