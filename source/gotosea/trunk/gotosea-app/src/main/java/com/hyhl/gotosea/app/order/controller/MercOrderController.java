package com.hyhl.gotosea.app.order.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.order.service.MercOrderService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 15:50
**/
@RestController
@RequestMapping("rest/order/merc")
public class MercOrderController {

    @Resource
    private MercOrderService mercOrderService;

    /**
     * 查询商家订单列表
     * @param status
     * @return
     */
    @Login
    @RequestMapping(value = "list",method = RequestMethod.GET)
    public WebResponse selectMercOrders(Integer[] status){
        return new WebResponse(mercOrderService.selectMercOrders(status));
    }

    /**
     * 查询商家订单详情
     * @param id
     * @return
     */
    @Login
    @RequestMapping(value = "detail/{id}",method = RequestMethod.GET)
    public WebResponse selectMercOrderDetail(@PathVariable("id") Integer id){
        return new WebResponse(mercOrderService.selectPerMercOrderDetail(id));
    }

    /**
     * 确认接单
     * @return
     */
    @Login
    @RequestMapping(value ="sure/{id}",method = RequestMethod.PUT)
    public WebResponse sureMercOrder(@PathVariable("id")Integer id)throws Exception{
        mercOrderService.sureMercOrder(id);
        return new WebResponse("SUCCESS","接单成功");
    }

    /**
     * 更新商家订单状态为已执行
     * @return
     */
    @Login
    @RequestMapping(value ="excute/{id}",method = RequestMethod.PUT)
    public WebResponse changeMercOrderToExcuted(@PathVariable("id")Integer id)throws Exception{
        mercOrderService.changeMercOrderToExcuted(id);
        return new WebResponse("SUCCESS","操作成功");
    }
}
