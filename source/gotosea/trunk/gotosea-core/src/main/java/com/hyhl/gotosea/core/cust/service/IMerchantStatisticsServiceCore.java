package com.hyhl.gotosea.core.cust.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.MerchantStatistics;

public interface IMerchantStatisticsServiceCore extends BaseService<MerchantStatistics> {

	/**商家统计表-更新商家好评率
	 * @param custId
	 * @param grade
	 * @return
	 * @throws Exception
	 */
	int updateMerchantGradeCount(String custId, Integer grade)throws Exception;
	
	/**商家统计表-更新商家总订单数量
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateMerchantOrderCount(String custId)throws Exception;
	
	/**商家统计表-更新商家服务数量
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateMerchantServiceCount(String custId)throws Exception;
}
