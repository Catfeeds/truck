package com.hyhl.gotosea.console.ref.service;

import java.util.List;

import com.hyhl.gotosea.console.ref.dto.FeatureTagDTO;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.ref.po.EvaluateTag;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.ref.po.TagType;
import com.hyhl.gotosea.core.ref.vo.FeatureTagVO;

/**
 * @author guan.sj
 */
public interface ITagService extends BaseService<TagType> {
	
	/**获取特征标签-列表
	 * @return
	 * @throws Exception
	 */
	List<FeatureTag> findFeatureTags()throws Exception;
	
	/**获取特征标签-树形
	 * @return
	 * @throws Exception
	 */
	List<FeatureTagVO> findFeatureTagsTree(Integer type)throws Exception;
	
	/**获取所有标签类型
	 * @return
	 * @throws Exception
	 */
	List<TagType> findTagTypes()throws Exception;
	
	/**获取所有评价标签
	 * @return
	 * @throws Exception
	 */
	List<EvaluateTag> findEvaluateTags()throws Exception;
	
	
	/**新增标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertFeatureTag(FeatureTagDTO param)throws Exception;
	
	/**修改标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateFeatureTag(Integer id, String name)throws Exception;
}
