package com.hyhl.gotosea.console.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.cust.dto.BankCardDto;
import com.hyhl.gotosea.console.cust.service.IBankCardService;

@RestController
public class BankCardController {
	
	@Autowired
	private IBankCardService iBankCardService;
	
	/**银行卡-查询列表
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/banks", method = RequestMethod.GET)
	public WebResponse findBankCards(BankCardDto param)throws Exception {
		return new WebResponse(iBankCardService.findBankCards(param));
	}
	
	/**银行卡-查询详情
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/{id}", method = RequestMethod.GET)
	public WebResponse findCustBankCard(@PathVariable("id") Integer id)throws Exception {
		return new WebResponse(iBankCardService.findCustBankCard(id));
	}
	
	/**银行卡-查询客户银行卡列表
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/cust/{custId}", method = RequestMethod.GET)
	public WebResponse findCustBankCards(@PathVariable("custId") String custId)throws Exception {
		return new WebResponse(iBankCardService.findCustBankCards(custId));
	}
}
