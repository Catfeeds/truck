package com.hyhl.gotosea.core.cust.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.TravelerDto;
import com.hyhl.gotosea.core.cust.po.Traveler;
import com.hyhl.gotosea.core.cust.vo.TravelerVO;

public interface ITravelerServiceCore extends BaseService<Traveler> {
	
	/**出行人-查询出行人列表
	 * @param custId
	 * @return
	 */
	List<TravelerVO> findTravelers(String custId);

	/**出行人-查询出行人详情
	 * @param custId
	 * @param id
	 * @return
	 */
	TravelerVO findTraveler(String custId, Integer id);

	/***出行人-添加
	 * @param custId
	 * @param param
	 * @return
	 */
	int insertTraveler(String custId, TravelerDto param);

	/***出行人-更新
	 * @param custId
	 * @param id
	 * @param param
	 * @return
	 */
	int updateTraveler(String custId, Integer id, TravelerDto param);

	/***出行人-删除
	 * @param custId
	 * @param id
	 * @return
	 */
	int deleteTraveler(String custId, Integer id);

	/***出行人-批量删除
	 * @param custId
	 * @param ids
	 * @return
	 */
	int deleteTravelers(String custId, Set<BigInteger> ids);
}
