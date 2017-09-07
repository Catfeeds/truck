package com.hyhl.gotosea.core.ref.service;

import java.util.Collection;
import java.util.List;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.ref.po.TagType;
import com.hyhl.gotosea.core.ref.vo.FeatureTagVO;

/**
 * @author guan.sj
 */
public interface ITagServiceCore extends BaseService<TagType> {
	/**获取商家服务标签
	 * @return
	 * @throws Exception
	 */
	List<FeatureTagVO> findMerchantTags()throws Exception;
	
	/**获取游客服务标签
	 * @return
	 * @throws Exception
	 */
	List<FeatureTagVO> findTravelerTags()throws Exception;

	List<FeatureTagVO> findServeTags()throws Exception;

	/**验证标签是否存在
	 * @param ids
	 * @param tagTypeId
	 * @param level
	 * @thorws 不存在抛出异常
	 */
	void validateFeatureTag(Collection<Integer> ids, Integer tagTypeId, Integer level)throws Exception;
	
	
}
