package com.hyhl.gotosea.core.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.po.CustCoupon;

public interface CustCouponMapper extends MyMapper<CustCoupon>{
		
	@Select("select * from t_cust_coupon where coupon_id in (#{ids})")
	List<CustCoupon> batchSelectEntityByIds(@Param("ids")String ids);
	@Delete("<script>"
				+ "delete from t_cust_coupon where id in"
				+ "<foreach item='item' index='index' collection='ids' open='(' separator=',' close=')'>"
				+ "#{item}"
				+"</foreach>"
				+ "</script>")
	void batchDeleteByIds(@Param("ids")List<Integer> ids);
}
