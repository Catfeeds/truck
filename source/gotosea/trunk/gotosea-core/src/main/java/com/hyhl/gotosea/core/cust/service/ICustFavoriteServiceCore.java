package com.hyhl.gotosea.core.cust.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.CustFavorite;

public interface ICustFavoriteServiceCore extends BaseService<CustFavorite> {
	
	/**客户收藏夹-查询类型收藏列表
	 * @param custId
	 * @param type
	 * @return
	 * @throws Exception
	 */
	List<String> findFavoritesByType(String custId, Integer type)throws Exception;
	
	/**客户收藏夹-新增收藏
	 * @param custId
	 * @param targetId
	 * @param targetType
	 * @return
	 * @throws Exception
	 */
	int insertFavorite(String custId, String targetId, Integer targetType)throws Exception;
	
	/**客户收藏夹-删除收藏
	 * @param custId
	 * @param id
	 * @return
	 * @throws Exception
	 */
	int deleteFavorite(String custId, BigInteger id)throws Exception;
	
	/**客户收藏夹-删除指定收藏
	 * @param custId
	 * @param targetId
	 * @param targetType
	 * @return
	 * @throws Exception
	 */
	int deleteFavoriteByTarget(String custId, String targetId, Integer targetType)throws Exception;
	
	/**客户收藏夹-批量删除
	 * @param custId
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	int batchDeleteFavorite(String custId, Set<BigInteger> ids)throws Exception;
}
