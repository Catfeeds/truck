package com.hyhl.gotosea.core.cust.service;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.core.cust.po.Wallet;
import com.hyhl.gotosea.core.cust.vo.WalletDetailVO;
import com.hyhl.gotosea.core.cust.vo.WalletLogVO;

public interface IWalletServiceCore extends BaseService<Wallet> {
	
	/**商家钱包-查询详情
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	WalletDetailVO findCustWallet(String custId)throws Exception;
	
	/**商家钱包-查询收入明细
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	Pager<WalletLogVO> findWalletLog(String custId)throws Exception;
	
	/**商家钱包-提现申请
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int insertWithdrawRequst(String custId, WithdrawRequestDto param)throws Exception;
	
	/**商家钱包-订单收入
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int insertOrderIncome(String custId, int money, String remark, Integer orderId)throws Exception;
	
	/**商家钱包-订单收入撤销
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int insertOrderCancel(String custId, int money, String remark, Integer orderId)throws Exception;
	
	/**商家钱包-提现成功
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateWalletWithdrawSuccess(String custId, int money, String remark)throws Exception;
	
	/**商家钱包-提现失败
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateWalletWithdrawFail(String custId, int money, String remark)throws Exception;
}
