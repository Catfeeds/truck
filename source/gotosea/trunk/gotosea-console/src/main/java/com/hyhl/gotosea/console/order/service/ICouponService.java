package com.hyhl.gotosea.console.order.service;

import java.util.List;
import java.util.Map;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.po.Coupon;

public interface ICouponService extends BaseService<Coupon>{
	
	
	Pager<Coupon> getCoupon(Coupon coupon);
	 
	List<Object> getAllCondition();
	
}
