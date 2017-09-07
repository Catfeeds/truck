package com.hyhl.gotosea.console.cust.service;

import com.hyhl.gotosea.console.cust.dto.CustDto;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.Cust;

public interface ICustService extends BaseService<Cust> {
	
	/**查询所有用户
	 * @return
	 * @throws Exception
	 */
	Pager<Cust> findCusts(CustDto param)throws Exception;
	
	/**查询用户详情
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	Cust findCust(String custId)throws Exception;
	
	public Cust findCustById(String custId) throws Exception;
	/**禁用/启动客户
	 * @param custId
	 * @param status
	 * @return
	 * @throws Exception
	 */
	int updateCustStatus(String custId,Integer status)throws Exception;
	
	/**审核用户商家信息
	 * @param custId
	 * @param status
	 * @return
	 * @throws Exception
	 */
	int updateCustMerchantAudit(String custId,Integer status,String reason)throws Exception;
}
