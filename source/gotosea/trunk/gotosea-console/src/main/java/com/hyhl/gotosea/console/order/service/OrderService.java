package com.hyhl.gotosea.console.order.service;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.dto.AllCustOrderDto;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.vo.AllCustOrder;
import com.hyhl.gotosea.core.order.vo.CustOrderDetail;

/**
 * @author Leslie.Lam
 * @create 2017-08-28 17:01
 **/
public interface OrderService extends BaseService<Order> {

    /**
     * 后台查询玩家订单列表
     * @param param
     * @return
     */
    Pager<AllCustOrder> selectAllCustOrder(AllCustOrderDto param);

    CustOrderDetail selectCustOrderDetail(Integer id);

    /**
     * 确认线路订单
     * @param id
     * @return
     */
    void sureOrder(Integer id)throws Exception;

    /**
     * 退单
     * @param id
     * @return
     */
    void returnOrder(Integer id)throws Exception;
}
