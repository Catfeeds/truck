package com.hyhl.gotosea.app.cust.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.core.cust.service.IWalletServiceCore;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class WalletController {
	
	@Autowired
	private IWalletServiceCore iWalletServiceCore;
	
	/**客户钱包-查询详情
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/wallet", method = RequestMethod.GET)
	@Login(merchantAuth=true)
	public WebResponse findCustWallet()throws Exception {
		return new WebResponse(iWalletServiceCore.findCustWallet(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**客户钱包-查询收入明细
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/wallet/log", method = RequestMethod.GET)
	@Login(merchantAuth=true)
	public WebResponse findWalletLog()throws Exception {
		return new WebResponse(iWalletServiceCore.findWalletLog(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**客户钱包-申请提现
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/wallet/withdraw", method = RequestMethod.POST)
	@Login(merchantAuth=true)
	public WebResponse insertWithdrawRequst(@RequestBody @Valid WithdrawRequestDto param)throws Exception {
		return new WebResponse(iWalletServiceCore.insertWithdrawRequst(AppContextHelper.getCurrentUser().getId(), param));
	}
}
