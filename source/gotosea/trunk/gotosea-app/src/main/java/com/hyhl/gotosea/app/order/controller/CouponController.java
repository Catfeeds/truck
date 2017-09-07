package com.hyhl.gotosea.app.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.order.service.CouponCoreService;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
@RequestMapping("/rest/coup")
public class CouponController {
	
	
	@Autowired
	private CouponCoreService  couponCoreService;
	
	
	/**
	 * 获取自己已有优惠卷
	 * @param userId
	 * @param couponId
	 * @return
	 */
	@RequestMapping(value="owner",method =RequestMethod.GET)
	public WebResponse getCoupon(Integer typeId){
		return	new WebResponse("200","ok",this.couponCoreService.getCoupon(
				AppContextHelper.getCurrentUser().getId(), typeId,0));
	}
	/**
	 * 获取所有可用优惠卷
	 * @return 
	 */
	@RequestMapping(value="all",method =RequestMethod.GET)
	public WebResponse getAll(){
		return new WebResponse("200","ok",this.couponCoreService.all());
	}
	/**
	 * 
	 * @param id 服务id
	 * @param money 未使用优惠卷前预算服务金额
	 * @return 匹配的优惠卷
	 */
	@RequestMapping(value="orders",method=RequestMethod.GET)
	public WebResponse getCouponToOrder(String id,Integer money){
		return new WebResponse("200","ok",this.couponCoreService.getCouponForOrder(AppContextHelper.getCurrentUser().getId(),
				money*100));
	}
	
}
