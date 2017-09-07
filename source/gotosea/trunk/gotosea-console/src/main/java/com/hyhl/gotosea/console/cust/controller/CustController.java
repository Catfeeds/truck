package com.hyhl.gotosea.console.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.cust.dto.CustDto;
import com.hyhl.gotosea.console.cust.service.ICustService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.cust.enm.CustEnum;

@RestController
public class CustController {
	
	@Autowired
	private ICustService iCustService;
	
	/**获取用户列表
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.客户列表})
	@RequestMapping(value = "/rest/custs", method = RequestMethod.GET)
	public WebResponse findCusts(CustDto param)throws Exception {
		return new WebResponse(iCustService.findCusts(param));
	}
	
	
//	/**发送消息
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/rest/sendmsg", method = RequestMethod.GET)
//	public WebResponse sendMsg(@RequestParam("id") String custId, @RequestParam("msg") String msg)throws Exception {
//		
//		Cust cust = iCustService.findCustById(custId);
//		int res = RestClientApi.getInstance().pushMessageToUsers(cust.getPhone(), msg, MsgSendType.msg_system, null);
//		if(res == 201){
//			return new WebResponse("200","发送成功.");
//		}else{
//			return new WebResponse("500","发送失败.");
//		}
//	}
//	
//	
//	/**同步用户
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/rest/synim", method = RequestMethod.GET)
//	public WebResponse sendMsg(@RequestParam("id") String custId)throws Exception {
//		
//		Cust cust = iCustService.findCustById(custId);
//		
//		int res = RestClientApi.getInstance().createUser(cust.getPhone(),cust.getPwd());
//		if(res == 201){
//			return new WebResponse("200","同步成功.");
//		}else if(res == 409){
//			return new WebResponse("409","已经同步过.");
//		}else{
//			return new WebResponse("500","同步失败.");
//		}
//	}
	
	/**获取用户详情
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.客户详情})
	@RequestMapping(value = "/rest/cust/{id}", method = RequestMethod.GET)
	public WebResponse findCust(@PathVariable("id") String id)throws Exception {
		return new WebResponse(iCustService.findCust(id));
	}
	
	
	/**禁用/启动用户
	 * @param custId
	 * @param status
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.修改客户状态})
	@RequestMapping(value = "/rest/cust/{id}/status/{status}", method = RequestMethod.PUT)
	public WebResponse updateCustStatus(@PathVariable("id") String custId, @PathVariable("status") Integer status)throws Exception {
		switch (status) {
			case 0:status=CustEnum.客户状态失效.getCode();break;
			case 1:status=CustEnum.客户状态生效.getCode();break;
			default:throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);}
		return new WebResponse(iCustService.updateCustStatus(custId,status));
	}
	
	
//	/**审核客户-商家角色
//	 * @param custId
//	 * @param status
//	 * @param reason
//	 * @return
//	 * @throws Exception
//	 */
//	//@ExtPermission(values={ExtPermissionEumn.审核客户成商家})
//	@RequestMapping(value = "/rest/cust/{id}/audit/{status}", method = RequestMethod.PUT)
//	public WebResponse updateCustMerchantAudit(@PathVariable("id") String custId, @PathVariable("status") Integer status, String reason)throws Exception {
//		switch (status) {
//			case 0:status=CustEnum.商家认证状态认证失败.getCode();break;
//			case 1:status=CustEnum.商家认证状态认证成功.getCode();break;
//			default:throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);}
//		return new WebResponse(iCustService.updateCustMerchantAudit(custId,status,reason));
//	}
}
