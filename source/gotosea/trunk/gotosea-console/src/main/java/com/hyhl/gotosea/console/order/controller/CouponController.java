package com.hyhl.gotosea.console.order.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.order.param.CouponParam;
import com.hyhl.gotosea.console.order.service.ICouponService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.order.enm.StatusEnum;
import com.hyhl.gotosea.core.order.po.Coupon;

import net.sf.json.JSONObject;

@RestController
@RequestMapping("rest/coup")
public class CouponController {
	
	@Autowired
	private ICouponService couponService;
	
	/**
	 * 查询优惠卷
	 * @return
	 */
	@ExtPermission(values={ExtPermissionEumn.优惠券列表})
	@RequestMapping(value="/all",method =RequestMethod.GET)
	public WebResponse getCoupon(CouponParam couponParam){
		Coupon record = new Coupon();
		BeanUtils.copyProperties(couponParam, record);
		return new WebResponse("200","",this.couponService.getCoupon(record));
		
	}
	/**
	 * 禁用优惠卷
	 * @param id
	 */
	@ExtPermission(values={ExtPermissionEumn.优惠券禁启用})
	@RequestMapping(value="/state",method =RequestMethod.PUT)
	public WebResponse delete(@RequestBody JSONObject jso){
		Integer id =jso.getInt("id");
		String state =jso.getString("state");
		String msg ="";
		if(id==null || state==null) throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		Coupon coupon =new Coupon();
		coupon.setId(id);
		switch (state) {
			case "N": coupon.setStatus(StatusEnum.不可用.getCode()); msg="禁用成功!"; break;//优惠卷状态设置为1
			case "Y":coupon.setStatus(StatusEnum.可用.getCode()); msg="启用成功!"; break;
			default:throw new  BaseBusinessException(BaseBusinessError.PARAMETER_ERROR) ;
			}
		this.couponService.updateByPrimaryKeySelective(coupon);

		return new WebResponse("200",msg);
	}
	/**
	 * 修改优惠卷信息
	 * @param couponParam
	 * @return
	 */
	@ExtPermission(values={ExtPermissionEumn.优惠券修改})
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public WebResponse updateCoupon(@Validated @RequestBody CouponParam couponParam){
			Coupon po =new Coupon();
			BeanUtils.copyProperties(couponParam,po);
			this.couponService.updateByPrimaryKeySelective(po);
			return new WebResponse("200","更新成功!");
	}
	
	/**
	 * 新建优惠卷
	 * @param couponParam
	 * @return
	 */
	@ExtPermission(values={ExtPermissionEumn.优惠券新增})
	@RequestMapping(value="",method=RequestMethod.POST)
	public WebResponse addCoupon(@RequestBody CouponParam couponParam){
			Coupon coupon =new Coupon();
			BeanUtils.copyProperties(couponParam, coupon);
			coupon.setId(null);
			this.couponService.insert(coupon);
			return new WebResponse("200","新建成功!");
	}
	/**
	 * 获取查询条件
	 * @return
	 */
	@ExtPermission(values={ExtPermissionEumn.优惠卷获取条件})
	@RequestMapping(value="listways",method=RequestMethod.GET)
	public WebResponse getAllCondition(){
		return new WebResponse("200","",this.couponService.getAllCondition()) ;
	}
}
