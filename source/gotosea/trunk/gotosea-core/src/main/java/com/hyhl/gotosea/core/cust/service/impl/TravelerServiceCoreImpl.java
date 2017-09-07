package com.hyhl.gotosea.core.cust.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.TravelerDto;
import com.hyhl.gotosea.core.cust.po.Traveler;
import com.hyhl.gotosea.core.cust.service.ITravelerServiceCore;
import com.hyhl.gotosea.core.cust.vo.TravelerVO;

import tk.mybatis.mapper.entity.Example;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class TravelerServiceCoreImpl extends BaseServiceImpl<Traveler> implements ITravelerServiceCore {
	
	@Override
	public List<TravelerVO> findTravelers(String custId) {
		Example example = new Example(Traveler.class);
		example.createCriteria()
				.andCondition("cust_id=", custId);
		example.setOrderByClause("id DESC");
		List<Traveler> pos = mapper.selectByExample(example);
		List<TravelerVO> vos = new ArrayList<TravelerVO>();
		TravelerVO vo = null;
		for(Traveler po : pos){
			vo = new TravelerVO();
			BeanUtils.copyProperties(po, vo);
			vos.add(vo);
		}
		return vos;
	}

	@Override
	public TravelerVO findTraveler(String custId,Integer id) {
		Traveler traveler = new Traveler();
		traveler.setCustId(custId);
		traveler.setId(id);
		Traveler po = mapper.selectOne(traveler);
		TravelerVO vo = null;
		if(po!=null){
			vo = new TravelerVO();
			BeanUtils.copyProperties(po, vo);
		}
		return vo;
	}

	@Override
	@Transactional
	public int insertTraveler(String custId, TravelerDto param) {
		Traveler traveler = new Traveler();
		BeanUtils.copyProperties(param, traveler);
		traveler.setCustId(custId);
		return mapper.insert(traveler);
	}

	@Override
	@Transactional
	public int updateTraveler(String custId, Integer id, TravelerDto param) {
		Traveler traveler = new Traveler();
		BeanUtils.copyProperties(param, traveler);
		traveler.setCustId(custId);
		traveler.setId(id);
		Example example = new Example(Traveler.class);
		example.createCriteria()
				.andCondition("id=", id)
				.andCondition("cust_id=", custId);
		return mapper.updateByExample(traveler, example);
	}

	@Override
	@Transactional
	public int deleteTraveler(String custId, Integer id) {
		Traveler traveler = new Traveler();
		traveler.setCustId(custId);
		traveler.setId(id);
		return mapper.delete(traveler);
	}

	@Override
	@Transactional
	public int deleteTravelers(String custId, Set<BigInteger> ids) {
		Example example = new Example(Traveler.class);
		example.createCriteria()
				.andCondition("cust_id=", custId)
				.andIn("id", ids);
		return mapper.deleteByExample(example);
	}
	
}
