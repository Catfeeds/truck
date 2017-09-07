package com.hyhl.gotosea.console.order.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.console.order.service.ICouponService;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.order.enm.CustCouponEnum;
import com.hyhl.gotosea.core.order.mapper.CouponMapper;
import com.hyhl.gotosea.core.order.po.Coupon;
@Service
public class CouponServiceImpl extends BaseServiceImpl<Coupon> implements ICouponService {
	
	@Autowired
	CouponMapper couponMapper;

	@Override
	public Pager<Coupon> getCoupon(Coupon param) {
		Pager<Coupon> pager =(Pager<Coupon>) selectByPage(new PageExcute<Coupon>() {
			@Override
			public List<Coupon> excute() {
				return mapper.select(param);
			}
		});
		return pager;
	}

	@Override
	public List<Object> getAllCondition() {
		CustCouponEnum [] ways =CustCouponEnum.values();
		List<Object> list =new ArrayList<>();
		Map<String, Object> map =null;
		for(int i=0;i<ways.length;i++ ){
			map=new HashMap<>();
			map.put("key", ways[i].getCode());
			map.put("name", ways[i].toString());
			list.add(map);
		}
		return list;
	}
	
}
