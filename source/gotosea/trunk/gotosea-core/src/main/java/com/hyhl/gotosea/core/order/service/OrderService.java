package com.hyhl.gotosea.core.order.service;

import com.hfocean.common.alipay.vo.AliayNotify;
import com.hfocean.common.weixin.vo.WxpayNotify;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.dto.*;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.order.vo.OrderCount;
import com.hyhl.gotosea.core.order.vo.PerOrderDetail;
import com.hyhl.gotosea.core.order.vo.OrderResult;
import com.hyhl.gotosea.core.order.vo.PerOrders;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * @author Leslie.Lam
 * @create 2017-08-10 10:10
 **/
public interface OrderService extends BaseService<Order>{

    /**
     * 线路下单接口
     * @param param
     * @return
     */
    WebResponse orderRoute(OrderRoute param) throws Exception;

    /**
     * 租船下单接口
     * @param param
     * @return
     */
    WebResponse orderCharter(OrderCharter param) throws Exception;

    /**
     * 活动下单接口
     * @param actDto
     * @return
     */
    OrderResult orderAct(OrderActDto actDto) throws Exception;

    /**
     * 订单支付接口
     * @param param
     * @return
     */
    WebResponse orderPay(OrderPay param, HttpServletRequest request) throws Exception;

    /**
     * 玩家退单接口
     * @param id
     * @throws Exception
     */
    void cancelPerOrder(Integer id)throws Exception;

    /**
     * 支付回调处理业务
     * @param param
     * @return
     * @throws Exception
     */
    void wechatPayNotify(WxpayNotify param) throws Exception;

    /**
     * 支付回调处理业务
     * @param param
     * @return
     * @throws Exception
     */
    void aliPayNotify(AliayNotify param) throws Exception;

    /**
     * 添加同行人员、订单和同行人员关系
     * @throws Exception
     */
    void addTravelers(OrderTogethers orderTogethers)throws Exception;

    /**
     * 插入订单服务记录
     * @throws Exception
     */
    void addOrderServe(OrderServe orderServe)throws Exception;

    /**
     * 备份订单服务与公共资源关系
     * @throws Exception
     */
    void addOrderServeReso(Integer orderId)throws Exception;

    /**
     * 查询超过30分钟未付款订单
     * @throws Exception
     */
    void autoCloseUnpayOrder()throws Exception;

    /**
     * 关闭超过30分钟未付款订单
     * @throws Exception
     */
    void handleUnpayOrder(Order order) throws IOException;

    /**
     * 根据订单id查询订单详情
     * @param id
     * @return
     */
    PerOrderDetail selectOrderDetail(Integer id) throws Exception;

    /**
     * 查询服务评论数量
     * @param serveId
     * @return
     */
    int selectServeEvaluates(Integer serveId);

    /**
     * 查询个人订单统计信息
     * @param custId
     * @return
     */
    OrderCount selectPersonOrderCount(String custId);

    /**
     * 查询个人订单列表
     * @param custId
     * @return
     */
    Pager<PerOrders> selectPerOrderList(String custId,Integer[] status);

    /**
     * 更新玩家订单为已出行状态
     * @throws Exception
     */
    void updateOrderBegined()throws Exception;
}
