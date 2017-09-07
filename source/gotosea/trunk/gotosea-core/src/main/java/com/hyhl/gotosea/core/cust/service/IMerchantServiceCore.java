package com.hyhl.gotosea.core.cust.service;

import java.util.Map;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.MerchantApplyDto;
import com.hyhl.gotosea.core.cust.dto.MerchantUpdateDto;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.vo.MerchantDetailVO;

public interface IMerchantServiceCore extends BaseService<Merchant> {

	Map<String,Object> selectMerchantInfo(String custId);

	/**商家-商家信息申请
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertMerchantApply(String custId, MerchantApplyDto param)throws Exception;
	
	/**商家-商家店铺信息更新
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateMerchant(String custId, MerchantUpdateDto param)throws Exception;
	
	/**商家-查询商家信息
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	MerchantDetailVO findMerchant(String custId)throws Exception;

	/**商家-初始化商家各表-(认证成功后调用)
	 * 1-钱包表
	 * 2-商家统计表
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int insertInitializeMerchantTable(String custId)throws Exception;
	
}
