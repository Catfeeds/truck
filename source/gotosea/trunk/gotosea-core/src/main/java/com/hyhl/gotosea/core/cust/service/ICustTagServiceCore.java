package com.hyhl.gotosea.core.cust.service;

import java.util.List;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.CustTagDto;
import com.hyhl.gotosea.core.cust.dto.CustTagUpdateDto;
import com.hyhl.gotosea.core.cust.po.TravelerTag;
import com.hyhl.gotosea.core.cust.vo.CustTagVO;

public interface ICustTagServiceCore extends BaseService<TravelerTag> {
	
	/**客户标签-添加商家标签
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertCustMerchantTag(String custId, CustTagDto param)throws Exception;
	
	/**客户标签-添加游客标签
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertCustTravelerTag(String custId, CustTagDto param)throws Exception;
	
	/**客户标签-查询客户商家标签
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	List<CustTagVO> findCustMerchantTag(String custId)throws Exception;
	
	/**客户标签-查询客户玩家标签
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	List<CustTagVO> findCustTravelerTag(String custId)throws Exception;
	
	/**客户标签-修改客户商家标签
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateCustMerchantTag(String custId, CustTagUpdateDto param)throws Exception;
	
	/**客户标签-修改客户玩家标签
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateCustTravelerTag(String custId, CustTagUpdateDto param)throws Exception;
}
