package com.hyhl.gotosea.core.ref.mapper;

import java.util.List;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.ref.vo.FeatureTagVO;
import org.apache.ibatis.annotations.Param;

/**
 * @author Leslie.Lam
 * @create 2017-08-01 9:43
 **/
public interface FeatureTagMapper extends MyMapper<FeatureTag> {
	
	/**查询特征标签-父子标签
	 * @return
	 */
	List<FeatureTagVO> findFeatureTags(@Param("tagTypeId")Integer tagTypeId);

	/**
	 * 根据ids和level来获取制定的特征标签
	 */
	List<FeatureTag> selectByIdsAndLevel(@Param("ids") List<Integer> ids, @Param("level") Integer level);
}
