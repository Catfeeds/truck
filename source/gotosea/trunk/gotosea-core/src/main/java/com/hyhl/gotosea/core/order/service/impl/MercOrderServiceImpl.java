package com.hyhl.gotosea.core.order.service.impl;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.order.enm.MercOrderEnum;
import com.hyhl.gotosea.core.order.mapper.MercOrderLogMapper;
import com.hyhl.gotosea.core.order.mapper.MercOrderMapper;
import com.hyhl.gotosea.core.order.mapper.OrderServeMapper;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.po.MercOrderLog;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.order.service.MercOrderService;
import com.hyhl.gotosea.core.order.vo.PerMercOrderDetail;
import com.hyhl.gotosea.core.order.vo.PerMercOrders;
import com.hyhl.gotosea.core.prod.enm.ProdServeEnum;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.util.NumberGenerator;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.hyhl.gotosea.core.order.enm.MercOrderEnum.待接单;
import static com.hyhl.gotosea.core.order.enm.MercOrderEnum.接单待执行;

/**
* 
* @author Leslie.Lam
* @create 2017-08-26 13:34
**/
@Service
public class MercOrderServiceImpl extends BaseServiceImpl<MercOrder> implements MercOrderService {

    @Resource
    private OrderServeMapper orderServeMapper;

    @Resource
    private ProdServeMapper prodServeMapper;

    @Resource
    private MercOrderMapper mercOrderMapper;

    @Resource
    private MercOrderLogMapper mercOrderLogMapper;

    @Override
    @Transactional(transactionManager = "orderTransationManager",readOnly = true)
    public Pager<PerMercOrders> selectMercOrders(Integer[] status) {
        return selectByPage(()->mercOrderMapper.selectPerMercOrders(AppContextHelper.getCurrentUser().getId(),status));
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void generateMercOrder() throws Exception {
        List<OrderServe> serves = orderServeMapper.selecyOrderServePayedWithMerc(StringUtils.join(ProdServeEnum.有所属商家.types(), ","));
        if(null!=serves&&serves.size()>0){
            Date date = new Date();
            mercOrderMapper.insertList(serves.stream().map(s->{
                ProdServe serve = prodServeMapper.selectByPrimaryKey(s.getServiceId());
                MercOrder mercOrder = new MercOrder();
                mercOrder.setCreateTime(date);
                mercOrder.setOrderNo(NumberGenerator.getMercOrderNo());
                mercOrder.setOrderServiceId(s.getId());
                mercOrder.setServiceFee(s.getCostPrice()*s.getServiceNum());
                mercOrder.setStatus(待接单.code());
                mercOrder.setCustId(serve.getCustId());
                return mercOrder;
            }).collect(Collectors.toList()));
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void sureMercOrder(Integer id) throws Exception{
        MercOrderEnum mercOrderEnum =接单待执行;
        MercOrder mercOrder = selectByPrimaryKey(id);
        Assert.notNull(mercOrder,"NOT FOUND");
        if (!Objects.equals(mercOrder.getCustId(),AppContextHelper.getCurrentUser().getId()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN);
        Integer status = mercOrder.getStatus();
        if (!Objects.equals(status,待接单.code()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN);
        mercOrder.setStatus(mercOrderEnum.getStatus());
        Date date = new Date();
        mercOrder.setUpdateTime(date);
        if (mercOrderMapper.updateByPrimaryKey(mercOrder)==1){
            MercOrderLog log = new MercOrderLog();
            log.setMerchantOrderId(mercOrder.getId());
            log.setProcessTime(date);
            log.setStatusBefore(status);
            log.setStatusAfter(mercOrder.getStatus());
            log.setProcessType(mercOrderEnum.getProcessType());
            log.setRemark(mercOrderEnum.name());
            mercOrderLogMapper.insert(log);
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void changeMercOrderToExcuted(Integer id) throws Exception {
        MercOrder mercOrder = mercOrderMapper.selectMercOrderWithOrderBegined(id);
        Assert.notNull(mercOrder,"商家 订单不存在");
        MercOrderEnum mercOrderEnum = MercOrderEnum.执行待收款;
        Date date = new Date();
        Integer status = mercOrder.getStatus();
        mercOrder.setStatus(mercOrderEnum.getStatus());
        mercOrder.setUpdateTime(date);
        updateByPrimaryKey(mercOrder);

        MercOrderLog log = new MercOrderLog();
        log.setMerchantOrderId(mercOrder.getId());
        log.setProcessTime(date);
        log.setStatusBefore(status);
        log.setStatusAfter(mercOrder.getStatus());
        log.setProcessType(mercOrderEnum.getProcessType());
        log.setRemark(mercOrderEnum.name());
        mercOrderLogMapper.insert(log);
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void updateMercOrderStatus(String processor,Integer orderId, Date date,MercOrderEnum mercOrderEnum) throws Exception {
        //更新商家订单状态
        List<MercOrder> mercOrders = mercOrderMapper.selectMercOrderByOrderId(orderId);
        if(null!=mercOrders&&mercOrders.size()>0){
            mercOrderLogMapper.insertList(mercOrders.stream().map(mercOrder->{
                int old=mercOrder.getStatus();
                mercOrder.setStatus(mercOrderEnum.getStatus());
                mercOrder.setUpdateTime(date);
                if (mercOrderMapper.updateByPrimaryKey(mercOrder)==1){
                    MercOrderLog log = new MercOrderLog();
                    log.setMerchantOrderId(mercOrder.getId());
                    log.setProcessTime(date);
                    log.setStatusBefore(old);
                    log.setStatusAfter(mercOrder.getStatus());
                    log.setProcessUser(processor);
                    log.setProcessType(mercOrderEnum.getProcessType());
                    log.setRemark(mercOrderEnum.name());
                    return log;
                }else {
                    return null;
                }
            }).filter(e->null!=e).collect(Collectors.toList()));
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void updateMercOrderStatus(Integer orderId, Date date, MercOrderEnum mercOrderEnum) throws Exception {
        updateMercOrderStatus(null,orderId,date,mercOrderEnum);
    }

    @Override
    public PerMercOrderDetail selectPerMercOrderDetail(Integer id) {
        return mercOrderMapper.selectPerMercOrderDetail(id);
    }
}
