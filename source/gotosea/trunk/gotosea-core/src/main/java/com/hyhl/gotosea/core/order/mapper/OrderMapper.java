package com.hyhl.gotosea.core.order.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.dto.AllCustOrderDto;
import com.hyhl.gotosea.core.order.po.CustCoupon;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.vo.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-04 10:55
 **/
public interface OrderMapper extends MyMapper<Order>{

    /**
     * 查询订单使用的优惠券
     * @param orderId
     * @return
     */
    List<CustCoupon> selectOrderCustCoupons(Integer orderId);

    /**
     * app根据订单id查询订单详情
     * @param id
     * @return
     */
    PerOrderDetail selectPerOrderDetail(Integer id);

    /**
     * 查询个人订单统计信息
     * @param custId
     * @return
     */
    OrderCount selectPersonOrderCount(String custId);

    /**
     * 查询个人订单列表
     * @param custId
     * @return
     */
    List<PerOrders> selectPerOrderList(@Param("custId") String custId,@Param("status")Integer[] status);

    /**
     * 后台查询玩家订单列表
     * @param param
     * @return
     */
    List<AllCustOrder> selectAllCustOrder(@Param("param") AllCustOrderDto param);

    /**
     * console根据订单id查询玩家订单详情
     * @param id
     * @return
     */
    CustOrderDetail selectCustOrderDetail(Integer id);

}
