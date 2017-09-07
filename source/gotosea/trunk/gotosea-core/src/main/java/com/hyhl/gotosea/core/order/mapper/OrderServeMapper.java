package com.hyhl.gotosea.core.order.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.po.OrderServe;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-08 17:54
 **/
public interface OrderServeMapper extends MyMapper<OrderServe> {

    /**
     * 查询订单付款后5-10分钟内的订单服务
     * @param typeStr
     * @return
     */
    List<OrderServe> selecyOrderServePayedWithMerc(String typeStr);
}
