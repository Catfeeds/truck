package com.hyhl.gotosea.console.order.service.impl;

import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.order.service.OrderService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.order.dto.AllCustOrderDto;
import com.hyhl.gotosea.core.order.mapper.CustPayLogMapper;
import com.hyhl.gotosea.core.order.mapper.OrderLogMapper;
import com.hyhl.gotosea.core.order.mapper.OrderMapper;
import com.hyhl.gotosea.core.order.mapper.RefundApplyMapper;
import com.hyhl.gotosea.core.order.po.CustPayLog;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderLog;
import com.hyhl.gotosea.core.order.po.RefundApply;
import com.hyhl.gotosea.core.order.service.MercOrderService;
import com.hyhl.gotosea.core.order.vo.AllCustOrder;
import com.hyhl.gotosea.core.order.vo.CustOrderDetail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqImPush;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Objects;

import static com.hyhl.gotosea.core.common.constant.Constant.HYHL_HOTLINE;
import static com.hyhl.gotosea.core.im.enm.ImMessageEnum.Order_Return;
import static com.hyhl.gotosea.core.im.enm.ImMessageEnum.Order_Statr;
import static com.hyhl.gotosea.core.order.enm.MercOrderEnum.接单待执行;
import static com.hyhl.gotosea.core.order.enm.MercOrderEnum.撤销订单;
import static com.hyhl.gotosea.core.order.enm.OrderEnum.*;
import static com.hyhl.gotosea.core.order.enm.StatusEnum.待处理;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_return;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.order_start;

/**
* 
* @author Leslie.Lam
* @create 2017-08-28 17:02
**/
@Service("consoleOrderService")
@Transactional(transactionManager = "orderTransationManager",readOnly = true)
public class OrderServiceImpl extends BaseServiceImpl<Order> implements OrderService {

    @Resource
    private CustMapper custMapper;

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private OrderLogMapper orderLogMapper;

    @Resource
    private MercOrderService mercOrderService;

    @Resource
    private RefundApplyMapper refundApplyMapper;

    @Resource
    private CustPayLogMapper custPayLogMapper;

    @Resource
    private MqProducer mqProducer;

    @Override
    public Pager<AllCustOrder> selectAllCustOrder(AllCustOrderDto param) {
        return selectByPage(()->orderMapper.selectAllCustOrder(param));
    }

    @Override
    public CustOrderDetail selectCustOrderDetail(Integer id) {
        return orderMapper.selectCustOrderDetail(id);
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void sureOrder(Integer id) throws Exception {
        String sysUserName = AuthAppContextHelper.getSysUserName();
        Date date = new Date();
        Order order = selectByPrimaryKey(id);
        Assert.notNull(order,"订单不存在");
        Integer oldStatus = order.getStatus();
        if(!Objects.equals(oldStatus,已付费待确认.code())) throw new BaseBusinessException("FAIL","订单不是待确认状态");
        order.setStatus(已确认待出行.code());
        order.setStatusTime(date);
        updateByPrimaryKey(order);
        //插入订单日志
        OrderLog ol = new OrderLog();
        ol.setStatusBefore(oldStatus);
        ol.setStatusAfter(order.getStatus());
        ol.setProcessTime(date);
        ol.setOrderId(id);
        ol.setOrderProcessType(订单确认.code());
        ol.setProcessUser(sysUserName);
        ol.setRemark(订单确认.name());
        orderLogMapper.insert(ol);

        //更新商家订单状态
        mercOrderService.updateMercOrderStatus(id,date,接单待执行);

        //玩家消息推送
        Cust cust = custMapper.selectByPrimaryKey(order.getCustId());
        if (null!=cust){
            String msg=String.format(Order_Statr.getMsg(),order.getRemark(), DateUtil.dateToString(order.getDepartureTime(),"yyyy-MM-dd"),HYHL_HOTLINE);
            mqProducer.send(MqMessage.newInstance().put(order_start,new MqImPush(cust.getPhone(),msg,Order_Statr.getTitle())));
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void returnOrder(Integer id) throws Exception {
        String sysUserName = AuthAppContextHelper.getSysUserName();
        Date date = new Date();
        Order order = selectByPrimaryKey(id);
        Assert.notNull(order,"订单不存在");
        Integer oldStatus = order.getStatus();
        if(!Objects.equals(oldStatus,已付费待确认.code())) throw new BaseBusinessException("FAIL","订单不是待确认状态");
        order.setStatus(已确认撤销待退款.code());
        order.setStatusTime(date);
        updateByPrimaryKey(order);
        //插入订单日志
        OrderLog ol = new OrderLog();
        ol.setStatusBefore(oldStatus);
        ol.setStatusAfter(order.getStatus());
        ol.setProcessTime(date);
        ol.setOrderId(id);
        ol.setOrderProcessType(订单撤销申请.code());
        ol.setProcessUser(sysUserName);
        ol.setRemark(订单撤销申请.name());
        orderLogMapper.insert(ol);
        //生成退款申请
        RefundApply apply = new RefundApply();
        apply.setCreateTime(date);
        apply.setProcessor(sysUserName);
        apply.setOrderId(order.getId());
        apply.setStatus(待处理.getCode());
        apply.setAmount(order.getPayFee());
        apply.setRemark("退单");
        CustPayLog payLog = custPayLogMapper.selectOne(new CustPayLog(order.getCustId(), order.getId()));
        if (null!=payLog){
            apply.setChannel(payLog.getPayChannel());
            apply.setAccount(payLog.getTradeAccount());
        }else {
            apply.setRemark("未能找到支付记录");
        }
        refundApplyMapper.insert(apply);
        //更新商家订单状态
        mercOrderService.updateMercOrderStatus(id,date,撤销订单);
        //玩家消息推送
        Cust cust = custMapper.selectByPrimaryKey(order.getCustId());
        if (null!=cust){
            String msg=String.format(Order_Return.getMsg(),order.getRemark(),DateUtil.dateToString(order.getDepartureTime(),"yyyy-MM-dd"),HYHL_HOTLINE);
            mqProducer.send(MqMessage.newInstance().put(order_return,new MqImPush(cust.getPhone(),msg,Order_Statr.getTitle())));
        }
    }
}
