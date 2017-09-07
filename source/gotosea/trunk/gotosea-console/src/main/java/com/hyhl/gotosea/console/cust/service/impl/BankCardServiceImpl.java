package com.hyhl.gotosea.console.cust.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.hyhl.gotosea.console.cust.dto.BankCardDto;
import com.hyhl.gotosea.console.cust.service.IBankCardService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.BankCardEnum;
import com.hyhl.gotosea.core.cust.po.BankCard;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class BankCardServiceImpl extends BaseServiceImpl<BankCard> implements IBankCardService {

	@Override
	public Pager<BankCard> findBankCards(BankCardDto param) throws Exception {
		Example example = new Example(BankCard.class);
		Criteria createCriteria = example.createCriteria();
		createCriteria.andEqualTo("status", BankCardEnum.状态_有效.getCode());
		if(param!=null)setBankCardCondition(param, createCriteria);
		example.setOrderByClause("id DESC");
		return selectByPage( () -> mapper.selectByExample(example));
	}

	private void setBankCardCondition(BankCardDto param, Criteria createCriteria) {
		if(!StringUtils.isEmpty(param.getAccountName())){
			createCriteria.andLike("accountName", param.getAccountName());
		}
		if(param.getBank()!=null){
			createCriteria.andEqualTo("bank", param.getBank());
		}
		if(!StringUtils.isEmpty(param.getCardNo())){
			createCriteria.andLike("cardNo", param.getCardNo()+"%");
		}
		if(param.getCardType()!=null){
			createCriteria.andEqualTo("cardType", param.getCardType());
		}
	}

	@Override
	public List<BankCard> findCustBankCards(String custId) throws Exception {
		Example example = new Example(BankCard.class);
		example.createCriteria()
				.andEqualTo("custId", custId)
				.andEqualTo("status", BankCardEnum.状态_有效.getCode());
		example.setOrderByClause("id DESC");
		return mapper.selectByExample(example);
	}

	@Override
	public BankCard findCustBankCard(int id) throws Exception {
		return mapper.selectByPrimaryKey(id);
	}
	
}
