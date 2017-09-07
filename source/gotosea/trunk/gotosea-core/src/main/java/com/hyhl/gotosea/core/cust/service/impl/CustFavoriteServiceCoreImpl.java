package com.hyhl.gotosea.core.cust.service.impl;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang.ArrayUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CustFavoriteEnum;
import com.hyhl.gotosea.core.cust.po.CustFavorite;
import com.hyhl.gotosea.core.cust.service.ICustFavoriteServiceCore;

import tk.mybatis.mapper.entity.Example;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class CustFavoriteServiceCoreImpl extends BaseServiceImpl<CustFavorite> implements ICustFavoriteServiceCore {
	
	@Override
	public List<String> findFavoritesByType(String custId, Integer type) throws Exception {
		Example example = new Example(CustFavorite.class);
		example.createCriteria()
				.andEqualTo("custId", custId)
				.andEqualTo("targetType", type);
		example.setOrderByClause("id DESC");
		List<CustFavorite> CustFavorites = mapper.selectByExample(example);
		return Optional.ofNullable(CustFavorites)
				.map( favorites -> favorites.stream().map(CustFavorite::getTargetId).collect(Collectors.toList()))
				.orElse(null);
	}

	@Override
	@Transactional
	public int insertFavorite(String custId, String targetId, Integer targetType) throws Exception {
		int result = 0;
		if(!StringUtils.isEmpty(custId)&&!StringUtils.isEmpty(targetId)&&targetType!=null){
			//判断目标类型是否支持
			if(!ArrayUtils.contains(CustFavoriteEnum.getAllType().toArray(), targetType))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR,"类型不支持");
			CustFavorite custFavorite = new CustFavorite();
			custFavorite.setCustId(custId);
			custFavorite.setTargetId(targetId);
			custFavorite.setTargetType(targetType);
			result += mapper.insertSelective(custFavorite);
		}
		return result;
	}

	@Override
	@Transactional
	public int deleteFavorite(String custId, BigInteger id) throws Exception {
		int result = 0;
		if(!StringUtils.isEmpty(custId)&&id!=null){
			CustFavorite custFavorite = new CustFavorite();
			custFavorite.setCustId(custId);
			custFavorite.setId(id);
			result += mapper.delete(custFavorite);
		}
		return result;
	}
	
	@Override
	@Transactional
	public int deleteFavoriteByTarget(String custId, String targetId, Integer targetType) throws Exception {
		int result = 0;
		if(!StringUtils.isEmpty(custId)&&targetId!=null&&targetType!=null){
			CustFavorite custFavorite = new CustFavorite();
			custFavorite.setCustId(custId);
			custFavorite.setTargetId(targetId);
			custFavorite.setTargetType(targetType);
			result = mapper.delete(custFavorite);
		}
		return result;
	}

	@Override
	@Transactional
	public int batchDeleteFavorite(String custId, Set<BigInteger> ids) throws Exception {
		int result = 0;
		if(!StringUtils.isEmpty(custId)&&ids!=null&&ids.size()>0){
			Example example = new Example(CustFavorite.class);
			example.createCriteria()
					.andCondition("cust_id=", custId)
					.andIn("id", ids);
			result += mapper.deleteByExample(example);
		}
		return result;
	}

}
