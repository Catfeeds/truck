package com.hyhl.gotosea.console.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.console.cust.service.IWithdrawRequestService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.cust.enm.WithdrawRequestEnum;

@RestController
public class WithdrawRequestController {
	
	@Autowired
	private IWithdrawRequestService iWithdrawRequestService;
	
	/**提现申请-查询列表
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/withdraws", method = RequestMethod.GET)
	@ExtPermission(values={ExtPermissionEumn.查询提现列表})
	public WebResponse findWithdrawRequests(WithdrawRequestDto param)throws Exception {
		return new WebResponse(iWithdrawRequestService.findWithdrawRequests(param));
	}
	
	/**提现申请-查询详情
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/withdraw/{id}", method = RequestMethod.GET)
	@ExtPermission(values={ExtPermissionEumn.修改提现状态})
	public WebResponse findWithdrawRequest(@PathVariable("id") int id)throws Exception {
		return new WebResponse(iWithdrawRequestService.findWithdrawRequest(id));
	}
	
	/**提现申请-确认提现
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/withdraw/{id}/{status}", method = RequestMethod.PUT)
	public WebResponse updateWithdrawRequestStatus(@PathVariable("id") int id,@PathVariable("status") int status, String remark)throws Exception {
		WithdrawRequestEnum enm = null;
		switch (status) {
		case 1://确认提现申请
			enm = WithdrawRequestEnum.状态_已审核待处理;
			break;
		case 2://提现成功
			enm = WithdrawRequestEnum.状态_成功已关闭;
			break;
		case 3://提现失败
			enm = WithdrawRequestEnum.状态_失败已关闭;
			break;
		default:
			throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		}
		return new WebResponse(iWithdrawRequestService.updateWithdrawRequestStatus(id, enm, remark));
	}
	
}
