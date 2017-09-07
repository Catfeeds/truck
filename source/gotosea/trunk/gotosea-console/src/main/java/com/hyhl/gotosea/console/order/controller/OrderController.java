package com.hyhl.gotosea.console.order.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.order.service.MercOrderService;
import com.hyhl.gotosea.console.order.service.OrderService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.order.dto.AllCustOrderDto;
import com.hyhl.gotosea.core.order.dto.ConsoleOrderDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-28 17:11
**/
@RestController
@RequestMapping("rest/order")
public class OrderController {

    @Resource
    private OrderService orderService;

    /**
     * 查询玩家订单列表
     * @param param
     * @return
     */
    @RequestMapping(value = "list",method = RequestMethod.GET)
    @ExtPermission(values={ExtPermissionEumn.查询玩家订单列表})
    public WebResponse selectAllCustOrder(AllCustOrderDto param){
        return new WebResponse(orderService.selectAllCustOrder(param));
    }

    /**
     * 查询玩家订单详情
     * @return
     */
    @RequestMapping(value = "detail/{id}",method = RequestMethod.GET)
    @ExtPermission(values={ExtPermissionEumn.查询玩家订单详情})
    public WebResponse selectCustOrderDetail(@PathVariable("id")Integer id){
        return new WebResponse(orderService.selectCustOrderDetail(id));
    }

    /**
     * 确认订单(出单)
     * @param id
     * @return
     */
    @RequestMapping(value = "sure/{id}",method = RequestMethod.PUT)
    public WebResponse sureOrder(@PathVariable("id")Integer id) throws Exception {
        orderService.sureOrder(id);
        return new WebResponse("SUCCESS","操作成功");
    }

    /**
     * 退单
     * @param id
     * @return
     */
    @RequestMapping(value = "return/{id}",method = RequestMethod.PUT)
    public WebResponse returnOrder(@PathVariable("id")Integer id) throws Exception {
        orderService.returnOrder(id);
        return new WebResponse("SUCCESS","操作成功");
    }
}
