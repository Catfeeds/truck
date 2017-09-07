package com.hyhl.gotosea.core.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.po.Coupon;
import com.hyhl.gotosea.core.order.vo.CoupDetailVo;



public interface CouponMapper extends MyMapper<Coupon> {
	
	List<CoupDetailVo> getCouponVo(@Param("custId")String custId,@Param("typeId")Integer typeId,@Param("status")Integer status);
	
	List<Coupon> getAll();
	
	List<CoupDetailVo> getCouponForOrder(@Param("custId")String custId,@Param("typeId")Integer typeId,
									@Param("status")Integer status,@Param("amount")Integer amount);
}
