package com.hyhl.gotosea.console.order.service;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.dto.ConsoleOrderDto;
import com.hyhl.gotosea.core.order.enm.MercOrderEnum;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.vo.AllMercOrder;
import com.hyhl.gotosea.core.order.vo.MercOrderDetail;

import java.util.Date;

/**
 * @author Leslie.Lam
 * @create 2017-08-26 13:34
 **/
public interface MercOrderService extends BaseService<MercOrder> {

    Pager<AllMercOrder> selectAllMercOrders(ConsoleOrderDto param);

    /**
     * 查询商家订单详情
     * @param id
     * @return
     */
    MercOrderDetail selectMercOrderDetail(Integer id);

}
