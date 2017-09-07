package com.hyhl.gotosea.console.cust.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.cust.dto.AddMerchantDto;
import com.hyhl.gotosea.console.cust.dto.MerchantDto;
import com.hyhl.gotosea.console.cust.service.IMerchantService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.cust.enm.MerchantEnum;
import com.hyhl.gotosea.core.cust.util.IdValidateHelper;

@RestController
public class MerchantController {

	@Autowired
	private IMerchantService iMerchantService;
	
	@Autowired
	private IdValidateHelper idValidateHelper;
	
	/**商家-列表
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.商家列表})
	@RequestMapping(value = "/rest/merchants", method = RequestMethod.GET)
	public WebResponse findMerchants(MerchantDto param)throws Exception {
		return new WebResponse(iMerchantService.findMerchants(param));
	}
	
	/**商家-详情
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@ExtPermission(values={ExtPermissionEumn.商家详情})
	@RequestMapping(value = "/rest/merchant/{custId}", method = RequestMethod.GET)
	public WebResponse findMerchant(@PathVariable("custId") String custId)throws Exception {
		return new WebResponse(iMerchantService.findMerchant(custId));
	}
	
	
	/**商家-新增
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/merchant", method = RequestMethod.POST)
	public WebResponse insertMerchant(@RequestBody @Valid AddMerchantDto param)throws Exception {
		idValidateHelper.validMerchantIdByType(param.getIdNum(), MerchantEnum.findEnm(param.getIdType()));
		iMerchantService.insertMerchant(param);
		return new WebResponse().returnMsg("新增成功");
	}
	
	
	/**商家-修改
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/merchant/{custId}", method = RequestMethod.PUT)
	public WebResponse updateMerchant(@PathVariable("custId") String custId, AddMerchantDto param)throws Exception {
		idValidateHelper.validMerchantIdByType(param.getIdNum(), MerchantEnum.findEnm(param.getIdType()));
		iMerchantService.updateMerchant(custId, param);
		return new WebResponse().returnMsg("修改成功");
	}
}
