package com.hyhl.gotosea.core.order.service;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.enm.MercOrderEnum;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.vo.PerMercOrderDetail;
import com.hyhl.gotosea.core.order.vo.PerMercOrders;

import java.util.Date;

/**
 * @author Leslie.Lam
 * @create 2017-08-26 13:34
 **/
public interface MercOrderService extends BaseService<MercOrder> {

    /**
     * 生成商家订单
     * @throws Exception
     */
    void generateMercOrder()throws Exception;

    /**
     * 分页查询商家订单
     * @param status
     * @return
     */
    Pager<PerMercOrders> selectMercOrders(Integer[] status);

    /**
     * 确认接单
     * @param id
     */
    void sureMercOrder(Integer id)throws Exception;

    /**
     * 更新商家订单状态为已执行
     * @param id
     * @throws Exception
     */
    void changeMercOrderToExcuted(Integer id)throws Exception;

    /**
     * 查询商家订单详情
     * @param id
     * @return
     */
    PerMercOrderDetail selectPerMercOrderDetail(Integer id);

    /**
     * 更新玩家订单所对应商家订单状态
     * @param orderId
     */
    void updateMercOrderStatus(String processor,Integer orderId, Date date, MercOrderEnum mercOrderEnum)throws Exception;

    /**
     * 更新玩家订单所对应商家订单状态
     * @param orderId
     */
    void updateMercOrderStatus(Integer orderId, Date date, MercOrderEnum mercOrderEnum)throws Exception ;
}
