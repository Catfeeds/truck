package com.hyhl.gotosea.core.cust.mapper;

import java.util.List;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.po.AuditLog;
import com.hyhl.gotosea.core.cust.vo.AuditLogVO;

public interface AuditLogMapper extends MyMapper<AuditLog>{
	/**后台管理-查询商家认证申请表
	 * @return
	 */
	List<AuditLogVO> findMerchantAudits(Integer auditType);
}