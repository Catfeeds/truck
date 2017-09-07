package com.hyhl.gotosea.app.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.service.ICreditServiceCore;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class CreditController {
	
	@Autowired
	private ICreditServiceCore iCreditServiceCore;
	
	
	/**查询客户当前的积分
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/credit", method = RequestMethod.GET)
	@Login
	public WebResponse findCredits()throws Exception {
		return new WebResponse(iCreditServiceCore.findCredits(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**查询客户积分领取和兑换明细
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/credit/change", method = RequestMethod.GET)
	@Login
	public WebResponse findCreditChangeLog()throws Exception {
		return new WebResponse(iCreditServiceCore.findCreditChangeLog(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**使用积分兑换代金券、满减券
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/credit/coupon/{id}", method = RequestMethod.POST)
	@Login
	public WebResponse insertCreditConvertCoupon(@PathVariable("id") Integer id, Integer number)throws Exception {
		if(number==null||number<=0)number=1;
		return new WebResponse(iCreditServiceCore.insertCreditCoupon(AppContextHelper.getCurrentUser().getId(),id,number));
	}
	
}
