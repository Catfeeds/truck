package com.hyhl.gotosea.app.order.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.order.service.OrderServeService;
import com.hyhl.gotosea.core.order.dto.EvaluationDto;
import com.hyhl.gotosea.core.order.service.OrderServeServiceCore;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaluationVo;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaReplyVo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RequestMapping("/rest/orderServe")
@RestController
public class OrderServeController {

    @Resource
    private OrderServeService orderServeService;
    @Resource
    private OrderServeServiceCore orderServeServiceCore;

    /**
     * 评论订单服务
     * @param evaluationDto
     * @return
     */
    @Login
    @RequestMapping(value = "/evaluation",method = RequestMethod.POST)
    public WebResponse evaluateOrder(@RequestBody EvaluationDto evaluationDto) throws Exception {
        return orderServeService.evaluateOrderService(evaluationDto);
    }

    /**
     * 回复订单评论 (回复不能加图片)
     * @param orderServiceEvaId 订单评论id
     * @param replyContent  回复内容
     * @return
     */
    @Login
    @RequestMapping(value = "/replyEva",method = RequestMethod.POST)
    public WebResponse replyEva(@RequestParam("orderServiceEvaId") Long orderServiceEvaId,
                                @RequestParam("replyContent") String replyContent){
       return orderServeService.replyEva(orderServiceEvaId,replyContent);
    }

    /**
     * 获取订单评论详细信息
     */
    @RequestMapping(value = "/serveEva/{serveEvaId}",method = RequestMethod.GET)
    public OrderServeEvaluationVo getOrderServe(@PathVariable("serveEvaId") Long serveEvaId) throws Exception {
        return orderServeServiceCore.getOrderServe(serveEvaId);
    }


    /**
     * 获取订单服务评价 回复信息
     * @param serveEvaId
     * @return
     */
    @RequestMapping(value = "/serveEvaReply/{serveEvaId}",method = RequestMethod.GET)
    public List<OrderServeEvaReplyVo> listEvaReply(@PathVariable("serveEvaId") Long serveEvaId) throws Exception {
        return orderServeServiceCore.listEvaReply(serveEvaId);
    }

    /**
     * 根据服务id获取服务评价 (一个服务可以有很多个订单和订单评价)
     * @param serviceId
     * @return
     */
    @RequestMapping(value = "/listOrderEva/{serviceId}",method = RequestMethod.GET)
    public WebResponse listOrderServeEva(@PathVariable("serviceId") Integer serviceId) throws Exception {
        return orderServeServiceCore.listOrderServeEvals(serviceId);
    }

    /**
     * 获取商家服务评价信息
     * @param merchantId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/merchant/serverEvas/{merchantId}")
    public WebResponse listMerchantServeEvas(@PathVariable("merchantId") String merchantId) throws Exception {
        return orderServeServiceCore.listMerchantServeEvas(merchantId);
    }

    /**
     * 为订单评价点赞
     * @param evaId
     * @return
     */
    @PostMapping(value = "/thumb/{evaId}")
    public WebResponse thumbOrderServeEva(@PathVariable("evaId")  Long evaId){
        return orderServeServiceCore.thumbOrderServeEva(evaId);
    }
}
