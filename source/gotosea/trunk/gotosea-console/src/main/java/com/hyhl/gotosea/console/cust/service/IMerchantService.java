package com.hyhl.gotosea.console.cust.service;

import com.hyhl.gotosea.console.cust.dto.AddMerchantDto;
import com.hyhl.gotosea.console.cust.dto.MerchantDto;
import com.hyhl.gotosea.console.cust.vo.MerchantDetailVO;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.Merchant;

public interface IMerchantService extends BaseService<Merchant> {
	
	/**商家-列表
	 * @return
	 * @throws Exception
	 */
	Pager<Merchant> findMerchants(MerchantDto param)throws Exception;
	
	/**商家-详情
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	MerchantDetailVO findMerchant(String custId)throws Exception;
	
	/**商家-新增
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int insertMerchant(AddMerchantDto param)throws Exception;
	
	/**商家-修改
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateMerchant(String custId, AddMerchantDto param)throws Exception;
	
}
