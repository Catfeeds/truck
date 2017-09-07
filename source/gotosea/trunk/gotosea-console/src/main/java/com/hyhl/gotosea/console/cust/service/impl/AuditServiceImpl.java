package com.hyhl.gotosea.console.cust.service.impl;

import java.math.BigInteger;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.cust.service.IAuditService;
import com.hyhl.gotosea.console.cust.service.ICustService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.AuditLogEnum;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.mapper.AuditLogMapper;
import com.hyhl.gotosea.core.cust.po.AuditLog;
import com.hyhl.gotosea.core.cust.service.IMerchantServiceCore;
import com.hyhl.gotosea.core.cust.vo.AuditLogVO;

@Service
@Transactional(transactionManager="custTransationManager",readOnly=true)
public class AuditServiceImpl extends BaseServiceImpl<AuditLog> implements IAuditService {
	
	@Autowired
	private AuditLogMapper auditLogMapper;
	
	@Autowired
	private ICustService iCustService;
	
	@Autowired
	private IMerchantServiceCore iMerchantServiceCore;

	@Override
	public Pager<AuditLogVO> findMerchantAudits() throws Exception {
		return selectByPage( () -> auditLogMapper.findMerchantAudits(AuditLogEnum.类型_商家认证审核.getCode()));
	}

	@Override
	@Transactional
	public int updateMerchantAudit(BigInteger id, AuditLogEnum status, String remark) throws Exception {
		int result = 0;
		AuditLog auditLog = mapper.selectByPrimaryKey(id);
		if(auditLog!=null){
			Integer auditType = auditLog.getAuditType();
			if(auditType!=null&&auditType!=AuditLogEnum.类型_商家认证审核.getCode())
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR.getCode(),"审核类型非商家认证审核");
			//更新审核表
			auditLog.setStatus(status.getCode());
			auditLog.setAuditRemark(remark);
			auditLog.setAuditTime(new Date(System.currentTimeMillis()));
			result = mapper.updateByPrimaryKeySelective(auditLog);
			if(result==0)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			//更新客户审核状态
			String custId = auditLog.getAuditObjectId();
			CustEnum merchantStatus = null;
			switch (status) {
			case 状态_审核通过:
				merchantStatus = CustEnum.商家认证状态认证成功;
				//初始化商家各类表
				result = iMerchantServiceCore.insertInitializeMerchantTable(custId);
				if(result==0)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
				break;
			case 状态_审核失败:
				merchantStatus = CustEnum.商家认证状态认证失败;
				break;
			default:
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			}
			//
			result = iCustService.updateCustMerchantAudit(custId, merchantStatus.getCode(), remark);
			if(result==0)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		}
		return result;
	}

}
