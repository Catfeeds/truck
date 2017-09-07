package com.hyhl.gotosea.core.cust.service;

import java.util.List;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.BankCardDto;
import com.hyhl.gotosea.core.cust.po.BankCard;
import com.hyhl.gotosea.core.cust.vo.BankCardVO;

public interface IBankCardServiceCore extends BaseService<BankCard> {
	
	/**银行卡-查询列表
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	List<BankCardVO> findCustBankCards(String custId)throws Exception;
	
	/**银行卡-查询详情
	 * @param custId
	 * @param id
	 * @return
	 * @throws Exception
	 */
	BankCardVO findCustBankCard(String custId, int id)throws Exception;
	
	/**银行卡-新增
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertCustBankCard(String custId, BankCardDto param)throws Exception;
	
	/**银行卡-修改
	 * @param custId
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateCustBankCard(String custId, int id, BankCardDto param)throws Exception;

	/**银行卡-删除
	 * @param custId
	 * @param cardId
	 * @return
	 * @throws Exception
	 */
	int deleteCustBankCard(String custId, int id)throws Exception;
}
