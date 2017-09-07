package com.hyhl.gotosea.console.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.service.IWalletServiceCore;

@RestController
public class WalletController {
	
	@Autowired
	private IWalletServiceCore iWalletServiceCore;
	
	/**客户钱包-查询详情
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/wallet/{custId}", method = RequestMethod.GET)
	public WebResponse findCustWallet(@PathVariable("custId") String custId)throws Exception {
		return new WebResponse(iWalletServiceCore.findCustWallet(custId));
	}
	
	/**客户钱包-查询收入明细
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/wallet/log/{custId}", method = RequestMethod.GET)
	public WebResponse findWalletLog(@PathVariable("custId") String custId)throws Exception {
		return new WebResponse(iWalletServiceCore.findWalletLog(custId));
	}
	
}
