package com.hyhl.gotosea.core.cust.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.BankCardDto;
import com.hyhl.gotosea.core.cust.enm.BankCardEnum;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.cust.po.BankCard;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.service.IBankCardServiceCore;
import com.hyhl.gotosea.core.cust.vo.BankCardVO;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class BankCardServiceCoreImpl extends BaseServiceImpl<BankCard> implements IBankCardServiceCore {
	
	@Autowired
	private MerchantMapper merchantMapper;
	
	@Override
	public List<BankCardVO> findCustBankCards(String custId) throws Exception {
		return Optional.of(custId)
				.map( custIdm -> {
					BankCard bankCard = new BankCard();
					bankCard.setCustId(custIdm);
					bankCard.setStatus(BankCardEnum.状态_有效.getCode());
					return mapper.select(bankCard);
				})
				.map( bankCards -> {
					List<BankCardVO> vos = new ArrayList<BankCardVO>();
					bankCards.stream().forEach( bankCard ->{
						BankCardVO vo = new BankCardVO();
						BeanUtils.copyProperties(bankCard, vo);
						vos.add(vo);
					});
					return vos;
				}).orElse(null);
	}

	@Override
	public BankCardVO findCustBankCard(String custId, int id) throws Exception {
		return Optional.ofNullable(mapper.selectByPrimaryKey(id))
				.filter( bankCard -> bankCard.getCustId().equals(custId)&&bankCard.getStatus().equals(BankCardEnum.状态_有效.getCode()))
				.map( bankCard -> {
					BankCardVO vo = new BankCardVO();
					BeanUtils.copyProperties(bankCard, vo);
					return vo;
				})
				.orElse(null);
	}

	@Override
	@Transactional
	public int insertCustBankCard(String custId, BankCardDto param) throws Exception {
		int result = 0;
		//新增
		//获取商家认证后名称
		Merchant merchant = merchantMapper.selectByPrimaryKey(custId);
		if(merchant!=null){
			BankCard po = new BankCard();
			BeanUtils.copyProperties(param, po);
			po.setCustId(custId);
			po.setAccountName(merchant.getRealName());
			po.setStatus(BankCardEnum.状态_有效.getCode());
			result = mapper.insert(po);
		}
		return result;
	}

	@Override
	@Transactional
	public int updateCustBankCard(String custId, int id, BankCardDto param) throws Exception {
		int result = 0;
		BankCard po = new BankCard();
		po.setId(id);
		po.setCustId(custId);
		po.setStatus(BankCardEnum.状态_有效.getCode());
		po = mapper.selectOne(po);
		if(po!=null){
			BeanUtils.copyProperties(param, po);
			result = mapper.updateByPrimaryKeySelective(po);
		}
		return result;
	}

	@Override
	@Transactional
	public int deleteCustBankCard(String custId, int id) throws Exception {
		int result = 0;
		BankCard po = new BankCard();
		po.setId(id);
		po.setCustId(custId);
		po.setStatus(BankCardEnum.状态_有效.getCode());
		po = mapper.selectOne(po);
		if(po!=null){
			po.setStatus(BankCardEnum.状态_失效.getCode());
			result = mapper.updateByPrimaryKeySelective(po);
		}
		return result;
	}
}
