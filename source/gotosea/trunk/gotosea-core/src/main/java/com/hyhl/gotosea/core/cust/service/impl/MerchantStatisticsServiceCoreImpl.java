package com.hyhl.gotosea.core.cust.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.mapper.MerchantStatisticsMapper;
import com.hyhl.gotosea.core.cust.po.MerchantStatistics;
import com.hyhl.gotosea.core.cust.service.IMerchantStatisticsServiceCore;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class MerchantStatisticsServiceCoreImpl extends BaseServiceImpl<MerchantStatistics> implements IMerchantStatisticsServiceCore {
	
	@Autowired
	private MerchantStatisticsMapper merchantStatisticsMapper;
	
	@Autowired
	private ProdServeMapper prodServeMapper;

	@Override
	@Transactional
	public int updateMerchantGradeCount(String custId, Integer grade) throws Exception {
		if(StringUtils.isEmpty(custId) || grade==null || grade<0 )throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		int result = 0;
		result = merchantStatisticsMapper.updateMerchantGradeCount(custId, grade);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		result = merchantStatisticsMapper.updateMerchantGrade(custId);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}

	@Override
	@Transactional
	public int updateMerchantOrderCount(String custId) throws Exception {
		if(!StringUtils.isEmpty(custId))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		int result = 0;
		result = merchantStatisticsMapper.updateMerchantOrder(custId);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}

	@Override
	@Transactional
	public int updateMerchantServiceCount(String custId) throws Exception {
		int result = 0;
		int serviceCount = prodServeMapper.findMerchantServiceCount(custId);
		//更新商家统计表
		MerchantStatistics statistics = merchantStatisticsMapper.selectByPrimaryKey(custId);
		statistics.setServiceCount(serviceCount);
		result = merchantStatisticsMapper.updateByPrimaryKeySelective(statistics);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}
}
