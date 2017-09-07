package com.hyhl.gotosea.app.cust.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.cust.dto.LoginCodeDto;
import com.hyhl.gotosea.app.cust.dto.LoginPwdDto;
import com.hyhl.gotosea.app.cust.service.ICustService;
import com.hyhl.gotosea.core.cust.dto.CustResetPwdDto;
import com.hyhl.gotosea.core.cust.dto.CustUpdateDto;
import com.hyhl.gotosea.core.cust.dto.CustUpdatePwdDto;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustVO;
import com.hyhl.gotosea.core.sms.service.ISmsService;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class CustController {
	
	@Autowired
	private ICustServiceCore iCustServiceCore;
	
	@Autowired
	private ICustService iCustService;
	
	@Autowired
	private ISmsService iSmsService;
	
	/**密码登录
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/loginpwd", method = RequestMethod.POST)
	public WebResponse loginByPwd(@RequestBody @Valid LoginPwdDto param)throws Exception {
		return new WebResponse(iCustService.findLoginByPwd(param));
	}
	
	/**验证码登录
	 * 首次登录会注册
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/logincode", method = RequestMethod.POST)
	public WebResponse loginByCode(@RequestBody @Valid LoginCodeDto param)throws Exception {
		//判断验证码是否正确
		String phone = iSmsService.verifyCode(param.getCode());
		CustVO result = iCustService.findLoginByCode(phone);
		if(result==null)//默认注册
			result=iCustService.insertDefaultRegisterCust(phone, param.getInvite());
		iSmsService.removeCode();
		return new WebResponse(result);
	}
	
	/**登出
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/logout", method = RequestMethod.GET)
	public WebResponse logout()throws Exception {
		AppContextHelper.removeCurrentUser();
		return new WebResponse();
	}
	
	/**忘记密码/重置密码
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/resetpwd", method = RequestMethod.PUT)
	public WebResponse resetPassword(@RequestBody @Valid CustResetPwdDto param)throws Exception {
		//判断验证码是否正确
		String phone = iSmsService.verifyCode(param.getCode());
		//重置密码
		iCustServiceCore.updateResetPassword(phone, param.getPassword());
		iSmsService.removeCode();
		return new WebResponse();
	}
	
	/**修改密码
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/pwd", method = RequestMethod.PUT)
	@Login
	public WebResponse updatePassword(@RequestBody @Valid CustUpdatePwdDto param)throws Exception {
		//修改密码
		iCustServiceCore.updatePassword(AppContextHelper.getCurrentUser().getId(), param);
		AppContextHelper.removeCurrentUser();
		return new WebResponse();
	}
	
	/**更新客户信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust", method = RequestMethod.PUT)
	@Login
	public WebResponse updateCust(@RequestBody @Valid CustUpdateDto param)throws Exception {
		iCustServiceCore.updateCust(AppContextHelper.getCurrentUser().getId(), param);
		return new WebResponse();
	}
	
	/**获取客户信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust", method = RequestMethod.GET)
	@Login
	public WebResponse getCust()throws Exception {
		return new WebResponse(iCustServiceCore.findCust(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**每日签到
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/cust/checkin", method = RequestMethod.GET)
	public WebResponse updateCheckIn()throws Exception {
		BaseSessionUser currentUser = AppContextHelper.getCurrentUser();
		if(currentUser!=null&&!StringUtils.isEmpty(currentUser.getId()))
			iCustService.updateCheckIn(currentUser.getId(), currentUser.getPhone());
		return new WebResponse();
	}
	
}
