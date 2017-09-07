package com.hyhl.gotosea.console.cust.controller;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.cust.service.IAuditService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.cust.enm.AuditLogEnum;

@RestController
public class AuditController {

	@Autowired
	private IAuditService iAuditService;
	
	/**查询商家审核申请
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.审核列表})
	@RequestMapping(value = "/rest/audit/merchants", method = RequestMethod.GET)
	public WebResponse findMerchantAudits()throws Exception {
		return new WebResponse(iAuditService.findMerchantAudits());
	}
	
	/**审核-商家
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/audit/merchant/{id}/{status}", method = RequestMethod.PUT)
	public WebResponse updateMerchantAudit(@PathVariable("id")BigInteger id, @PathVariable("status")int status, String remark)throws Exception {
		AuditLogEnum auditStatus = null;
		switch (status) {
		case 0:auditStatus=AuditLogEnum.状态_审核失败;break;
		case 1:auditStatus=AuditLogEnum.状态_审核通过;break;
		default:throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);}
		return new WebResponse(iAuditService.updateMerchantAudit(id, auditStatus, remark));
	}
	
}
