package com.hyhl.gotosea.core.cust.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.CustTagDto;
import com.hyhl.gotosea.core.cust.dto.CustTagUpdateDto;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.mapper.MerchantTagMapper;
import com.hyhl.gotosea.core.cust.mapper.TravelerTagMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.MerchantTag;
import com.hyhl.gotosea.core.cust.po.TravelerTag;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustTagVO;
import com.hyhl.gotosea.core.ref.enm.FeatureTagEnum;
import com.hyhl.gotosea.core.ref.enm.TagTypeEnum;
import com.hyhl.gotosea.core.ref.service.ITagServiceCore;

import tk.mybatis.mapper.entity.Example;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class CustTagServiceCoreImpl extends BaseServiceImpl<TravelerTag> implements ICustTagServiceCore {
	
	@Autowired
	private MerchantTagMapper merchantTagMapper;
	
	@Autowired
	private TravelerTagMapper travelerTagMapper;
	
	@Autowired
	private CustMapper custMapper;
	
	@Autowired
	private ITagServiceCore iTagServiceCore;
	
	@Override
	@Transactional
	public int insertCustMerchantTag(String custId, CustTagDto param) throws Exception {
		int result = 0;
		Cust cust = getCust(custId);
		//验证标签是否存在
		iTagServiceCore.validateFeatureTag(param.getTagIds(), TagTypeEnum.商家资源标签id.getCode(), FeatureTagEnum.商家可选标签级别.getCode());
		//添加标签
		List<MerchantTag> list = null;
		Set<Integer> tagIds = param.getTagIds();
		if(tagIds!=null&&tagIds.size()>0){
			custId = cust.getId();
			list = new ArrayList<MerchantTag>();
			MerchantTag merchantTag = null;
			for(Integer tagId : tagIds){
				merchantTag = new MerchantTag();
				merchantTag.setCustId(custId);
				merchantTag.setTagId(tagId);
				list.add(merchantTag);
			}
			//保存
			result =merchantTagMapper.insertList(list);
			//更新客户的商家标识字段
			if(result>0)updateCustMerchant(cust);
		}
		return result;
	}

	private void updateCustMerchant(Cust cust) {
		Integer merchant = cust.getMerchant();
		if(merchant==null||!merchant.equals(CustEnum.商家标记已申请商家身份.getCode())){
			//修改商家标识
			cust.setMerchant(CustEnum.商家标记已申请商家身份.getCode());
			custMapper.updateByPrimaryKeySelective(cust);
		}
	}

	@Override
	@Transactional
	public int insertCustTravelerTag(String custId, CustTagDto param) throws Exception {
		int result = 0;
		Cust cust = getCust(custId);
		//验证标签是否存在
		iTagServiceCore.validateFeatureTag(param.getTagIds(),TagTypeEnum.玩家兴趣标签id.getCode(), FeatureTagEnum.玩家可选标签级别.getCode());
		List<TravelerTag> list = null;
		Set<Integer> tagIds = param.getTagIds();
		if(tagIds!=null&&tagIds.size()>0){
			custId = cust.getId();
			list = new ArrayList<TravelerTag>();
			TravelerTag TravelerTag = null;
			for(Integer tagId : tagIds){
				TravelerTag = new TravelerTag();
				TravelerTag.setCustId(custId);
				TravelerTag.setTagId(tagId);
				list.add(TravelerTag);
			}
			//保存
			result =travelerTagMapper.insertList(list);
		}
		return result;
	}
	
	private Cust getCust(String id) {
		Cust cust = custMapper.selectByPrimaryKey(id);
		if(cust==null)throw new BaseBusinessException(LoginError.NOT_EXIST);
		return cust;
	}

	@Override
	public List<CustTagVO> findCustMerchantTag(String custId) throws Exception {
		List<CustTagVO> result = null;
		Cust cust = getCust(custId);
		Example example = new Example(MerchantTag.class);
		example.createCriteria()
				.andCondition(" cust_id = ", cust.getId());
		List<MerchantTag> merchantTagList = merchantTagMapper.selectByExample(example);
		if(merchantTagList!=null&&merchantTagList.size()>0){
			//返回
			result = new ArrayList<CustTagVO>(merchantTagList.size());
			CustTagVO merchantTagVO;
			for(MerchantTag merchantTag : merchantTagList){
				merchantTagVO = new CustTagVO();
				BeanUtils.copyProperties(merchantTag, merchantTagVO);
				result.add(merchantTagVO);
			}
		}
		return result;
	}


	@Override
	public List<CustTagVO> findCustTravelerTag(String custId) throws Exception {
		List<CustTagVO> result = null;
		Cust cust = getCust(custId);
		Example example = new Example(TravelerTag.class);
		example.createCriteria()
				.andCondition(" cust_id = ", cust.getId());
		List<TravelerTag> TravelerTagList = travelerTagMapper.selectByExample(example);
		if(TravelerTagList!=null&&TravelerTagList.size()>0){
			result = new ArrayList<CustTagVO>(TravelerTagList.size());
			CustTagVO merchantTagVO;
			for(TravelerTag traveler : TravelerTagList){
				merchantTagVO = new CustTagVO();
				BeanUtils.copyProperties(traveler, merchantTagVO);
				result.add(merchantTagVO);
			}
		}
		return result;
	}

	@Override
	@Transactional
	public int updateCustMerchantTag(String custId, CustTagUpdateDto param) throws Exception {
		// 判断用户是否存在
		Cust cust = getCust(custId);
		custId = cust.getId();
		int result = 0;
		// 批量删除
		Set<Integer> ids = param.getIds();
		if(ids!=null&&ids.size()>0)result += batchDeleteMerchantTag(custId, ids);
		// 批量新增
		Set<Integer> tagIds = param.getTagIds();
		if (tagIds != null && tagIds.size() > 0) {
			// 验证标签是否存在
			iTagServiceCore.validateFeatureTag(tagIds, TagTypeEnum.商家资源标签id.getCode(), FeatureTagEnum.商家可选标签级别.getCode());
			// 验证用户是否有已经添加的标签
			List<MerchantTag> merchantTagList = findCustMerchantTagByCustIdAndTagId(custId, tagIds);
			// 排除已存在的标签
			removeAlreadyMerchantTag(tagIds, merchantTagList);
			// 插入
			int insert = batchInsertMerchantTag(custId, tagIds);
			result += insert;
			//更新客户的商家标识字段
			if(insert>0)updateCustMerchant(cust);
		}
		return result;
	}

	private List<MerchantTag> findCustMerchantTagByCustIdAndTagId(String custId, Set<Integer> tagIds) {
		Example example = new Example(MerchantTag.class);
		example.createCriteria()
				.andCondition("cust_id=", custId)
				.andIn("tagId", tagIds);
		List<MerchantTag> merchantTagList = merchantTagMapper.selectByExample(example);
		return merchantTagList;
	}

	private int batchDeleteMerchantTag(String custId, Set<Integer> ids) {
		int result = 0;
		Example example;
		if(custId!=null&&!custId.equals("")&&ids!=null&&ids.size()>0){
			example = new Example(MerchantTag.class);
			example.createCriteria()
					.andCondition("cust_id=", custId)
					.andIn("tagId", ids);
			result += merchantTagMapper.deleteByExample(example);
		}
		return result;
	}

	private void removeAlreadyMerchantTag(Set<Integer> tagIds, List<MerchantTag> merchantTagList) {
		if(merchantTagList!=null&&merchantTagList.size()>0){
			Iterator<Integer> iterator = tagIds.iterator();
			while(iterator.hasNext()){
				Integer next = iterator.next();
				for(MerchantTag merchantTag : merchantTagList){
					if(merchantTag.getTagId().equals(next))iterator.remove();
				}
			}
		}
	}

	private int batchInsertMerchantTag(String custId, Set<Integer> tagIds) {
		int result=0;
		//添加标签
		List<MerchantTag> list = null;
		if(tagIds!=null&&tagIds.size()>0){
			list = new ArrayList<MerchantTag>();
			MerchantTag merchantTag = null;
			for(Integer tagId : tagIds){
				merchantTag = new MerchantTag();
				merchantTag.setCustId(custId);
				merchantTag.setTagId(tagId);
				list.add(merchantTag);
			}
			//保存
			if(list.size()>0)result = merchantTagMapper.insertList(list);
		}
		return result;
	}

	@Override
	@Transactional
	public int updateCustTravelerTag(String custId, CustTagUpdateDto param) throws Exception {
		// 判断用户是否存在
		Cust cust = getCust(custId);
		custId = cust.getId();
		int result = 0;
		// 批量删除
		Set<Integer> ids = param.getIds();
		if(ids!=null&&ids.size()>0)result += batchDeleteTravelerTag(custId, ids);
		// 批量新增
		Set<Integer> tagIds = param.getTagIds();
		if (tagIds != null && tagIds.size() > 0) {
			// 验证标签是否存在
			iTagServiceCore.validateFeatureTag(tagIds, TagTypeEnum.玩家兴趣标签id.getCode(), FeatureTagEnum.玩家可选标签级别.getCode());
			// 验证用户是否有已经添加的标签
			List<TravelerTag> TravelerTagList = findCustTravelerTagByCustIdAndTagId(custId, tagIds);
			// 排除已存在的标签
			removeAlreadyTravelerTag(tagIds, TravelerTagList);
			// 插入
			result += batchInsertTravelerTag(custId, tagIds);
		}
		return result;
	}
	
	private List<TravelerTag> findCustTravelerTagByCustIdAndTagId(String custId, Set<Integer> tagIds) {
		Example example = new Example(TravelerTag.class);
		example.createCriteria()
				.andCondition("cust_id=", custId)
				.andIn("tagId", tagIds);
		List<TravelerTag> TravelerTagList = travelerTagMapper.selectByExample(example);
		return TravelerTagList;
	}

	private int batchDeleteTravelerTag(String custId, Set<Integer> ids) {
		int result = 0;
		Example example;
		if(custId!=null&&!custId.equals("")&&ids!=null&&ids.size()>0){
			example = new Example(TravelerTag.class);
			example.createCriteria()
					.andCondition("cust_id=", custId)
					.andIn("tagId", ids);
			result += travelerTagMapper.deleteByExample(example);
		}
		return result;
	}

	private void removeAlreadyTravelerTag(Set<Integer> tagIds, List<TravelerTag> TravelerTagList) {
		if(TravelerTagList!=null&&TravelerTagList.size()>0){
			Iterator<Integer> iterator = tagIds.iterator();
			while(iterator.hasNext()){
				Integer next = iterator.next();
				for(TravelerTag TravelerTag : TravelerTagList){
					if(TravelerTag.getTagId().equals(next)){
						iterator.remove();
						break;
					}
				}
			}
		}
	}

	private int batchInsertTravelerTag(String custId, Set<Integer> tagIds) {
		int result=0;
		//添加标签
		List<TravelerTag> list = null;
		if(tagIds!=null&&tagIds.size()>0){
			list = new ArrayList<TravelerTag>();
			TravelerTag TravelerTag = null;
			for(Integer tagId : tagIds){
				TravelerTag = new TravelerTag();
				TravelerTag.setCustId(custId);
				TravelerTag.setTagId(tagId);
				list.add(TravelerTag);
			}
			//保存
			if(list.size()>0)result = travelerTagMapper.insertList(list);
		}
		return result;
	}
}
