package com.hyhl.gotosea.core.order.service;

import java.util.List;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.po.Coupon;
import com.hyhl.gotosea.core.order.vo.CoupDetailVo;

public interface CouponCoreService extends BaseService<Coupon>{
	/**
	 * 查询用户优惠卷
	 * @param custId 用户ID
	 * @param typeId 类型ID
	 * @return
	 */
	List<CoupDetailVo> getCoupon(String custId,Integer typeId,Integer status);
	
	List<Coupon> all();
	
	/**
	 * 减除用户优惠卷数量
	 * @param custCoupId 用户-优惠卷关联表主键
	 * @param type 类型
	 * @param num 数量
	 * @param orderNo 订单编号
	 * @return
	 */
	
	Integer useCouponNum(Integer custCoupId,Integer type, Integer num,String orderNo);
	
	/**
	 * 回滚优惠卷
	 * @param orderNo
	 */
	Boolean  rollBackCoupon(String orderNo);
	
	
	/** 
	 * 新增用户优惠卷
	 * @param custId 用户ID	
	 * @param couponId 优惠卷ID
	 * @param num 新增优惠卷数量
	 * @param getWay 或得途径
	 */
	void addCoupon(String custId,Integer couponId,Integer num,Integer getWay);
	
	/**
	 * 处理失效的优惠券
	 * @param couponIds int[]数组，处理优惠卷id数组
	 */
	void dealUnableCoupon(int[] couponIds);
	
	/**
	 *
	 * @param type  优惠卷类型 
	 * @param amount 消费金额
	 */
	 List<CoupDetailVo> getCouponForOrder(String custId,int amount);
}
