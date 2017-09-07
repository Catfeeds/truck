package com.hyhl.gotosea.console.cust.service;

import com.hyhl.gotosea.console.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.enm.WithdrawRequestEnum;
import com.hyhl.gotosea.core.cust.po.WithdrawRequest;
import com.hyhl.gotosea.core.cust.vo.WithdrawRequestPagerVO;

public interface IWithdrawRequestService extends BaseService<WithdrawRequest> {
	
	/**提现申请-获取列表
	 * @return
	 * @throws Exception
	 */
	Pager<WithdrawRequestPagerVO> findWithdrawRequests(WithdrawRequestDto param)throws Exception;
	
	
	/**提现申请-获取详情
	 * @param id
	 * @return
	 * @throws Exception
	 */
	WithdrawRequest findWithdrawRequest(int id)throws Exception;


	/**提现申请-审核
	 * @param id
	 * @param enm
	 * @return
	 */
	int updateWithdrawRequestStatus(int id, WithdrawRequestEnum enm, String remark)throws Exception;

}
