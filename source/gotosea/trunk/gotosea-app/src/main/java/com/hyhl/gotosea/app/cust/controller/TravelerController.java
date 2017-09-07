package com.hyhl.gotosea.app.cust.controller;

import java.math.BigInteger;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.dto.TravelerDto;
import com.hyhl.gotosea.core.cust.enm.TravelerEnum;
import com.hyhl.gotosea.core.cust.service.ITravelerServiceCore;
import com.hyhl.gotosea.core.cust.util.IdValidateHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class TravelerController {
	
	@Autowired
	private ITravelerServiceCore iTravelerServiceCore;
	
	@Autowired
	private IdValidateHelper idValidateHelper;
	
	
	/**客户出行人-查询列表
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/travelers", method = RequestMethod.GET)
	@Login
	public WebResponse findTravelers()throws Exception {
		return new WebResponse(iTravelerServiceCore.findTravelers(AppContextHelper.getCurrentUser().getId()));
	}
	
	/**客户出行人-查询详情
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/traveler/{id}", method = RequestMethod.GET)
	@Login
	public WebResponse findTraveler(@PathVariable("id")Integer id)throws Exception {
		return new WebResponse(iTravelerServiceCore.findTraveler(AppContextHelper.getCurrentUser().getId(), id));
	}
	
	/**客户出行人-新增
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/traveler", method = RequestMethod.POST)
	@Login
	public WebResponse insertTraveler(@RequestBody @Valid TravelerDto param)throws Exception {
		//验证证件格式
		param.setMyself(TravelerEnum.同伴.code());
		idValidateHelper.validateTravelerIdCardByType(param.getCredNum(), TravelerEnum.findEnm(param.getCredType()));
		return new WebResponse(iTravelerServiceCore.insertTraveler(AppContextHelper.getCurrentUser().getId(), param));
	}

	
	/**客户出行人-修改
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/traveler/{id}", method = RequestMethod.PUT)
	@Login
	public WebResponse updateTraveler(@PathVariable("id")Integer id, @RequestBody @Valid TravelerDto param)throws Exception {
		//验证证件格式
		param.setMyself(TravelerEnum.同伴.code());
		idValidateHelper.validateTravelerIdCardByType(param.getCredNum(), TravelerEnum.findEnm(param.getCredType()));
		return new WebResponse(iTravelerServiceCore.updateTraveler(AppContextHelper.getCurrentUser().getId(), id, param));
	}
	
	/**客户出行人-删除
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/traveler/{id}", method = RequestMethod.DELETE)
	@Login
	public WebResponse deleteTraveler(@PathVariable("id")Integer id)throws Exception {
		return new WebResponse(iTravelerServiceCore.deleteTraveler(AppContextHelper.getCurrentUser().getId(), id));
	}
	
	/**客户出行人-批量删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/travelers/{ids}", method = RequestMethod.DELETE)
	@Login
	public WebResponse deleteTravelers(@PathVariable("ids") Set<BigInteger> ids)throws Exception {
		return new WebResponse(iTravelerServiceCore.deleteTravelers(AppContextHelper.getCurrentUser().getId(), ids));
	}
}
