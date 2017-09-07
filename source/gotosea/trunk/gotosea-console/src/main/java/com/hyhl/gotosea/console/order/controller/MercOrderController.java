package com.hyhl.gotosea.console.order.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.order.service.MercOrderService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
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
@RequestMapping("rest/order/merc")
public class MercOrderController {

    @Resource
    private MercOrderService mercOrderService;

    /**
     * 查询商家订单列表
     * @param param
     * @return
     */
    @RequestMapping(value = "list",method = RequestMethod.GET)
    @ExtPermission(values={ExtPermissionEumn.查询商家订单列表})
    public WebResponse selectAllMercOrders(ConsoleOrderDto param){
        return new WebResponse(mercOrderService.selectAllMercOrders(param));
    }

    /**
     * 查询商家订单详情
     * @return
     */
    @RequestMapping(value = "detail/{id}",method = RequestMethod.GET)
    @ExtPermission(values={ExtPermissionEumn.查询商家订单详情})
    public WebResponse selectMercOrderDetail(@PathVariable("id")Integer id){
        return new WebResponse(mercOrderService.selectMercOrderDetail(id));
    }
}
