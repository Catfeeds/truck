package com.hyhl.gotosea.app.cust.controller;

import java.math.BigInteger;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.cust.service.ICustFavoriteServiceCore;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class CustFavoriteController {
	
	@Autowired
	private ICustFavoriteServiceCore iCustFavoriteServiceCore;
	
	/**客户收藏夹-查询收藏id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/favorites/{type}", method = RequestMethod.GET)
	@Login
	public WebResponse findFavoritesByType(@PathVariable("type") Integer type)throws Exception {
		return new WebResponse(iCustFavoriteServiceCore.findFavoritesByType(AppContextHelper.getCurrentUser().getId(), type));
	}
	
	
	/**客户收藏夹-新增收藏
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/favorite/{targetId}/{type}", method = RequestMethod.POST)
	@Login
	public WebResponse insertFavorite(@PathVariable("targetId") String targetId, @PathVariable("type") Integer targetType)throws Exception {
		return new WebResponse(iCustFavoriteServiceCore.insertFavorite(AppContextHelper.getCurrentUser().getId(), targetId , targetType));
	}
	
	/**客户收藏夹-删除收藏
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/favorite/{id}", method = RequestMethod.DELETE)
	@Login
	public WebResponse deleteFavorite(@PathVariable("id") BigInteger id)throws Exception {
		return new WebResponse(iCustFavoriteServiceCore.deleteFavorite(AppContextHelper.getCurrentUser().getId(), id));
	}
	
	/**客户收藏夹-删除指定收藏
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/favorite/{targetId}/{type}", method = RequestMethod.DELETE)
	@Login
	public WebResponse deleteFavoriteByTarget(@PathVariable("targetId") String targetId, @PathVariable("type") Integer targetType)throws Exception {
		return new WebResponse(iCustFavoriteServiceCore.deleteFavoriteByTarget(AppContextHelper.getCurrentUser().getId(), targetId, targetType));
	}
	
	/**客户收藏夹-批量删除
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/favorite/batch/{ids}", method = RequestMethod.DELETE)
	@Login
	public WebResponse batchDeleteFavorite(@PathVariable("ids") Set<BigInteger> ids)throws Exception {
		return new WebResponse(iCustFavoriteServiceCore.batchDeleteFavorite(AppContextHelper.getCurrentUser().getId(), ids));
	}
	
}
