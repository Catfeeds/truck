package com.hyhl.gotosea.app.cust.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.dto.BankCardDto;
import com.hyhl.gotosea.core.cust.enm.BankCardEnum;
import com.hyhl.gotosea.core.cust.service.IBankCardServiceCore;
import com.hyhl.gotosea.core.ref.service.DictionaryService;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class BankCardController {
	
	@Autowired
	private IBankCardServiceCore iBankCardServiceCore;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	/**银行卡-查询银行卡类型列表
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/type", method = RequestMethod.GET)
	public WebResponse findBankCardType()throws Exception {
		return new WebResponse(dictionaryService.selectChildrenByName("bank_card_type").getChilds());
	}
	
	/**银行卡-查询列表
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/banks", method = RequestMethod.GET)
	@Login(merchantAuth=true)
	public WebResponse findCustBankCards()throws Exception {
		return new WebResponse(iBankCardServiceCore.findCustBankCards(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**银行卡-查询详情
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/{id}", method = RequestMethod.GET)
	@Login(merchantAuth=true)
	public WebResponse findCustBankCard(@PathVariable("id")Integer id)throws Exception {
		return new WebResponse(iBankCardServiceCore.findCustBankCard(AppContextHelper.getCurrentUser().getId(), id));
	}
	
	/**银行卡-新增
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank", method = RequestMethod.POST)
	@Login(merchantAuth=true)
	public WebResponse insertCustBankCard(@RequestBody @Valid BankCardDto param)throws Exception {
		param.setCardType(BankCardEnum.卡类_借记卡.getCode());
		return new WebResponse(iBankCardServiceCore.insertCustBankCard(AppContextHelper.getCurrentUser().getId(), param));
	}
	
	/**银行卡-修改
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/{id}", method = RequestMethod.PUT)
	@Login(merchantAuth=true)
	public WebResponse updateCustBankCard(@PathVariable("id")Integer id,@RequestBody @Valid  BankCardDto param)throws Exception {
		param.setCardType(BankCardEnum.卡类_借记卡.getCode());
		return new WebResponse(iBankCardServiceCore.updateCustBankCard(AppContextHelper.getCurrentUser().getId(), id, param));
	}
	
	/**银行卡-删除
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/bank/{id}", method = RequestMethod.DELETE)
	@Login(merchantAuth=true)
	public WebResponse deleteCustBankCard(@PathVariable("id")Integer id)throws Exception {
		return new WebResponse(iBankCardServiceCore.deleteCustBankCard(AppContextHelper.getCurrentUser().getId(), id));
	}
}
