package com.hyhl.gotosea.console.cust.service;

import java.math.BigInteger;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.enm.AuditLogEnum;
import com.hyhl.gotosea.core.cust.po.AuditLog;
import com.hyhl.gotosea.core.cust.vo.AuditLogVO;

public interface IAuditService extends BaseService<AuditLog> {
	/**查询商家审核申请
	 * @return
	 * @throws Exception
	 */
	Pager<AuditLogVO> findMerchantAudits()throws Exception;
	
	/**审核商家
	 * @param id 审核表id
	 * @param status 审核结果
	 * @return
	 * @throws Exception
	 */
	int updateMerchantAudit(BigInteger id, AuditLogEnum status, String remark)throws Exception;
}
