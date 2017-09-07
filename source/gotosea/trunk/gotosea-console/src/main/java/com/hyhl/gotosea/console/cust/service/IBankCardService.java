package com.hyhl.gotosea.console.cust.service;

import java.util.List;

import com.hyhl.gotosea.console.cust.dto.BankCardDto;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.BankCard;

public interface IBankCardService extends BaseService<BankCard> {
	
	/**银行卡-查询列表
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	Pager<BankCard> findBankCards(BankCardDto param)throws Exception;
	
	/**银行卡-查询用户银行卡列表
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	List<BankCard> findCustBankCards(String custId)throws Exception;
	
	/**银行卡-查询详情
	 * @param custId
	 * @param id
	 * @return
	 * @throws Exception
	 */
	BankCard findCustBankCard(int id)throws Exception;
	
	
}
