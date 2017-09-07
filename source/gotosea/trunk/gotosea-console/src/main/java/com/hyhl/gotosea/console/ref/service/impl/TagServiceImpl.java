package com.hyhl.gotosea.console.ref.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.ref.dto.FeatureTagDTO;
import com.hyhl.gotosea.console.ref.service.ITagService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.ref.enm.TagTypeEnum;
import com.hyhl.gotosea.core.ref.mapper.EvaluateTagMapper;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
import com.hyhl.gotosea.core.ref.po.EvaluateTag;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.ref.po.TagType;
import com.hyhl.gotosea.core.ref.vo.FeatureTagVO;

import tk.mybatis.mapper.entity.Example;

/**
 * @author guan.sj
 */
@Service
@Transactional(transactionManager="refTransationManager",readOnly=true)
public class TagServiceImpl extends BaseServiceImpl<TagType> implements ITagService {
	
	@Autowired
	private FeatureTagMapper featureTagMapper;
	
	@Autowired
	private EvaluateTagMapper evaluateTagMapper;

	@Override
	public List<FeatureTag> findFeatureTags() throws Exception {
		return featureTagMapper.selectAll();
	}
	
	@Override
	public List<FeatureTagVO> findFeatureTagsTree(Integer type) throws Exception {
		return featureTagMapper.findFeatureTags(type);
	}

	@Override
	public List<TagType> findTagTypes() throws Exception {
		return mapper.selectAll();
	}

	@Override
	public List<EvaluateTag> findEvaluateTags() throws Exception {
		return evaluateTagMapper.selectAll();
	}

	@Override
	@Transactional
	public int insertFeatureTag(FeatureTagDTO param) throws Exception {
		int result = 0;
		FeatureTag featureTag = null;
		Integer pid = param.getPid();
		TagTypeEnum enm = TagTypeEnum.findEnum(param.getTagTypeId());
		if(enm==null)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		Integer level = param.getLevel();
		Integer id = getFeatureLastId(enm, level, pid);
		featureTag = new FeatureTag();
		featureTag.setPid(pid);
		featureTag.setName(param.getName());
		featureTag.setId(id+1);
		featureTag.setLevel(level);
		featureTag.setTagTypeId(enm.getCode());
		if(featureTag!=null)result = featureTagMapper.insert(featureTag);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}

	private Integer getFeatureLastId(TagTypeEnum enm, Integer level, Integer pid) {
		Integer id = null;
		Example example = new Example(FeatureTag.class);
		example.createCriteria()
				.andEqualTo("pid", pid)
				.andEqualTo("level", level)
				.andEqualTo("tagTypeId", enm.getCode());
		example.setOrderByClause("id DESC");
		List<FeatureTag> featureTags = featureTagMapper.selectByExample(example);
		if(featureTags!=null&&featureTags.size()>0){
			id = featureTags.get(0).getId();
		}
		if(id==null)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR.getCode(), "没有找到上一个标签id");
		return id;
	}

	@Override
	@Transactional
	public int updateFeatureTag(Integer id, String name) throws Exception {
		int result = 0;
		FeatureTag featureTag = new FeatureTag();
		featureTag.setId(id);
		featureTag.setName(name);
		result = featureTagMapper.updateByPrimaryKeySelective(featureTag);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}
}
