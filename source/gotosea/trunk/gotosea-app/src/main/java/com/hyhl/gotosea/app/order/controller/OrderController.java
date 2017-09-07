package com.hyhl.gotosea.app.order.controller;

import com.aliyun.oss.common.utils.IOUtils;
import com.hfocean.common.alipay.vo.AliayNotify;
import com.hfocean.common.weixin.util.HttpUtil;
import com.hfocean.common.weixin.vo.WxpayNotify;
import com.hyhl.common.annotation.Login;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.pay.AlipayService;
import com.hyhl.gotosea.core.common.pay.WechatPayService;
import com.hyhl.gotosea.core.common.pay.sign.PaySecretKey;
import com.hyhl.gotosea.core.common.pay.sign.RSA;
import com.hyhl.gotosea.core.order.dto.OrderActDto;
import com.hyhl.gotosea.core.order.dto.OrderCharter;
import com.hyhl.gotosea.core.order.dto.OrderPay;
import com.hyhl.gotosea.core.order.dto.OrderRoute;
import com.hyhl.gotosea.core.order.service.OrderService;
import com.hyhl.gotosea.core.order.vo.OrderResult;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

import static com.hyhl.common.exception.type.OrderError.PAY_FAIL;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 15:50
**/
@RestController
@RequestMapping("rest/order")
public class OrderController {

    @Resource
    private WechatPayService wechatPayService;

    @Resource
    private OrderService orderService;

    @Resource
    private AlipayService alipayService;

    /**
     * 查询订单详情接口
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "detail/{id}",method = RequestMethod.GET)
    public WebResponse selectOrderDetail(@PathVariable("id")Integer id) throws Exception {
        return new WebResponse(orderService.selectOrderDetail(id));
    }

    /**
     * 线路下单
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "route",method = RequestMethod.POST)
    public WebResponse orderRoute(@Validated @RequestBody OrderRoute param) throws Exception {
        return orderService.orderRoute(param);
    }

    /**
     * 租船下单接口
     * @param param
     * @return
     */
    @Login
    @RequestMapping(value = "charter",method = RequestMethod.POST)
    public WebResponse orderCharter(@Validated @RequestBody OrderCharter param) throws Exception {
        return orderService.orderCharter(param);
    }

    /**
     * 活动下单接口(针对租船服务)
     * @param orderActDto
     * @return
     */
    @Login
    @RequestMapping(value = "act",method = RequestMethod.POST)
    public OrderResult orderAct(@Valid @RequestBody OrderActDto orderActDto) throws Exception {
        return orderService.orderAct(orderActDto);
    }

    /**
     * 支付接口
     * @param param
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "pay",method = RequestMethod.POST)
    public WebResponse pay(@Validated @RequestBody OrderPay param,HttpServletRequest request) throws Exception {
        BaseSessionUser user = AppContextHelper.getCurrentUser();
        String sign = param.getSign();
        String orderNo = param.getOrderNo();
        //验证签名
        Map<String,String> signMap = new HashMap<>(2);
        signMap.put("orderNo", orderNo);//订单号
        signMap.put("userId", user.getId());//支付者ID,默认是下单用户ID
        boolean isContinue = RSA.verify(HttpUtil.createLinkString(signMap), sign, PaySecretKey.commonPublicKey, PaySecretKey.input_charset);
        if(!isContinue) throw new RuntimeException("签名验证失败");
        return orderService.orderPay(param,request);
    }

    /**
     * 查询个人订单统计信息
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "count",method = RequestMethod.GET)
    public WebResponse selectPersonOrderCount() throws Exception {
        return new WebResponse(orderService.selectPersonOrderCount(AppContextHelper.getCurrentUser().getId()));
    }

    /**
     * 查询个人订单列表
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "per/list",method = RequestMethod.GET)
    public WebResponse selectPerOrderList(Integer[] status) throws Exception {
        return new WebResponse(orderService.selectPerOrderList(AppContextHelper.getCurrentUser().getId(),status));
    }

    /**
     * 订单退款
     * @return
     * @throws Exception
     */
    @Login
    @RequestMapping(value = "cancel/{id}",method = RequestMethod.PUT)
    public WebResponse cancelPerOrder(@PathVariable("id") Integer id) throws Exception {
        orderService.cancelPerOrder(id);
        return new WebResponse().returnMsg("退单成功");
    }

    @RequestMapping(value = "notify/wechatpay")
    public void wechatPayNotify(@RequestBody String requestStr,HttpServletResponse response) throws Exception {
        WxpayNotify notify = wechatPayService.wechatPayNotify(requestStr);
        if(!notify.isSuccess())throw new BaseBusinessException(PAY_FAIL);
        orderService.wechatPayNotify(notify);
        String msg = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
        ServletOutputStream out = response.getOutputStream();
        out.print(msg);
        out.flush();
        IOUtils.safeClose(out);
    }

    @RequestMapping(value = "notify/alipay")
    public void aliPayNotify(HttpServletRequest request,HttpServletResponse response) throws Exception {
        AliayNotify notify = alipayService.alipayNotify(request);
        if(!notify.isSuccess())throw new BaseBusinessException(PAY_FAIL);
        orderService.aliPayNotify(notify);
        ServletOutputStream out = response.getOutputStream();
        out.print("success");
        out.flush();
        IOUtils.safeClose(out);
    }

    @RequestMapping(value = "return/alipay")
    public WebResponse aliPayReturn(HttpServletRequest request) throws Exception {
        if (!alipayService.alipayReturn(request))throw new BaseBusinessException(PAY_FAIL);
        return new WebResponse("支付成功!");
    }

}
