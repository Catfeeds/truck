package com.hyhl.gotosea.core.ref.service.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.ref.enm.TagTypeEnum;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.ref.po.TagType;
import com.hyhl.gotosea.core.ref.service.ITagServiceCore;
import com.hyhl.gotosea.core.ref.vo.FeatureTagVO;

import tk.mybatis.mapper.entity.Example;

/**
 * @author guan.sj
 */
@Service
@Transactional(readOnly=true,transactionManager="refTransationManager")
public class TagServiceCoreImpl extends BaseServiceImpl<TagType> implements ITagServiceCore {
	
	@Autowired
	private FeatureTagMapper featureTagMapper;

	@Override
	public List<FeatureTagVO> findMerchantTags() throws Exception {
		return featureTagMapper.findFeatureTags(TagTypeEnum.商家资源标签id.getCode());
	}

	@Override
	public List<FeatureTagVO> findTravelerTags() throws Exception {
		return featureTagMapper.findFeatureTags(TagTypeEnum.玩家兴趣标签id.getCode());
	}

    @Override
    public List<FeatureTagVO> findServeTags() throws Exception {
        return featureTagMapper.findFeatureTags(TagTypeEnum.服务标签.getCode());
    }

    @Override
    @Transactional
	public void validateFeatureTag(Collection<Integer> ids, Integer tagTypeId, Integer level) throws Exception {
		Example example = new Example(FeatureTag.class);
		example.createCriteria()
				.andIn("id", ids)
				.andCondition("tag_type_id=", tagTypeId)
				.andCondition("level=", level);
		List<FeatureTag> featureTagList = featureTagMapper.selectByExample(example);
		if(featureTagList.size()!=ids.size())throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"标签不存在");
	}
}
