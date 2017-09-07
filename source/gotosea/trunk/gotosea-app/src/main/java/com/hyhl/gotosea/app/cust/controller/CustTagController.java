package com.hyhl.gotosea.app.cust.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.dto.CustTagDto;
import com.hyhl.gotosea.core.cust.dto.CustTagUpdateDto;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class CustTagController {
	
	@Autowired
	private ICustTagServiceCore iCustTagServiceCore;
	
	/**用户标签-首次注册添加商家服务标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/custtag/merchant", method = RequestMethod.POST)
	@Login
	public WebResponse addCustMerchantTag(@RequestBody @Valid CustTagDto param)throws Exception {
		BaseSessionUser currentUser = AppContextHelper.getCurrentUser();
		boolean isFirstLogin = currentUser.getIsFirstLoginTag();
		if(!isFirstLogin)throw new BaseBusinessException(LoginError.NOT_FIRST_LOGIN);
		int result = iCustTagServiceCore.insertCustMerchantTag(currentUser.getId(), param);
		currentUser.setIsFirstLoginTag(false);
		AppContextHelper.setCurrentUser(currentUser);
		return new WebResponse(result);
	}
	
	/**用户标签-首次注册添加玩家兴趣标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/custtag/traveler", method = RequestMethod.POST)
	@Login
	public WebResponse addCustTravelerTag(@RequestBody @Valid CustTagDto param)throws Exception {
		BaseSessionUser currentUser = AppContextHelper.getCurrentUser();
		boolean isFirstLogin = currentUser.getIsFirstLoginTag();
		if(!isFirstLogin)throw new BaseBusinessException(LoginError.NOT_FIRST_LOGIN);
		int result = iCustTagServiceCore.insertCustTravelerTag(AppContextHelper.getCurrentUser().getId(), param);
		currentUser.setIsFirstLoginTag(false);
		AppContextHelper.setCurrentUser(currentUser);
		return new WebResponse(result);
	}
	
	/**用户标签-获取商家服务标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/custtag/merchant", method = RequestMethod.GET)
	@Login
	public WebResponse getCustMerchantTag()throws Exception {
		return new WebResponse(iCustTagServiceCore.findCustMerchantTag(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**用户标签-获取玩家兴趣标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/custtag/traveler", method = RequestMethod.GET)
	@Login
	public WebResponse getCustTravelerTag()throws Exception {
		return new WebResponse(iCustTagServiceCore.findCustTravelerTag(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**用户标签-修改商家服务标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/tag/cust/merchant", method = RequestMethod.PUT)
	@Login(merchantAuth=true)
	public WebResponse updateCustMerchantTag(@RequestBody CustTagUpdateDto param)throws Exception {
		return new WebResponse(iCustTagServiceCore.updateCustMerchantTag(AppContextHelper.getCurrentUser().getId(), param));
	}
	
	/**用户标签-修改玩家兴趣标签
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/tag/cust/traveler", method = RequestMethod.PUT)
	@Login
	public WebResponse updateTravelerTag(@RequestBody CustTagUpdateDto param)throws Exception {
		return new WebResponse(iCustTagServiceCore.updateCustTravelerTag(AppContextHelper.getCurrentUser().getId(),param));
	}
	
}
