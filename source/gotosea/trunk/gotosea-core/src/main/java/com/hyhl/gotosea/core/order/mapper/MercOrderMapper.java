package com.hyhl.gotosea.core.order.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.dto.ConsoleOrderDto;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.vo.AllMercOrder;
import com.hyhl.gotosea.core.order.vo.MercOrderDetail;
import com.hyhl.gotosea.core.order.vo.PerMercOrderDetail;
import com.hyhl.gotosea.core.order.vo.PerMercOrders;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-26 15:49
 **/
public interface MercOrderMapper extends MyMapper<MercOrder> {

    PerMercOrderDetail selectPerMercOrderDetail(Integer id);

    List<PerMercOrders> selectPerMercOrders(@Param("custId") String custId, @Param("status") Integer[] status);

    List<AllMercOrder> selectAllMercOrders(@Param("param")ConsoleOrderDto param);

    /**
     * 后台查询商家订单详情
     * @param id
     * @return
     */
    MercOrderDetail selectMercOrderDetail(Integer id);

    /**
     * 根据玩家订单id查询商家订单
     * @param orderId
     * @return
     */
    List<MercOrder> selectMercOrderByOrderId(Integer orderId);

    /**
     * 查询商家订单是否已执行
     * @return
     */
    MercOrder selectMercOrderWithOrderBegined(Integer id);
}
