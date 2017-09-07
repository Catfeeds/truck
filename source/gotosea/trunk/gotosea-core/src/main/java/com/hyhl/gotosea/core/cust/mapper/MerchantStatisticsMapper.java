package com.hyhl.gotosea.core.cust.mapper;

import org.apache.ibatis.annotations.Param;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.po.MerchantStatistics;

public interface MerchantStatisticsMapper extends MyMapper<MerchantStatistics> {
	/**更新商家订单总数量+1
	 * @param custId
	 * @return
	 */
	int updateMerchantOrder(@Param("custId") String custId);
	
	/**更新商家评分总和
	 * @param custId
	 * @param grade
	 * @return
	 */
	int updateMerchantGradeCount(@Param("custId") String custId, @Param("grade") Integer grade);
	
	/**更新商家好评率
	 * @param custId
	 * @return
	 */
	int updateMerchantGrade(@Param("custId")String custId);
}