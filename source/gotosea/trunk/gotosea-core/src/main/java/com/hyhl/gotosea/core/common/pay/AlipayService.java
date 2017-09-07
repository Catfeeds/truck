package com.hyhl.gotosea.core.common.pay;

import com.hyhl.gotosea.core.order.enm.OrderEnum;
import com.hyhl.gotosea.core.order.mapper.OrderMapper;
import com.hyhl.gotosea.core.order.po.Order;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Objects;

/**
* 
* @author Leslie.Lam
* @create 2017-08-15 10:58
**/
@Service
public class AlipayService extends com.hfocean.common.alipay.service.AlipayService {
    @Resource
    private OrderMapper orderMapper;

    /**
     * 判断是否已经对订单进行处理
     * @return
     */
    @Override
    public boolean haveBeenProcessedIf(String orderNo) {
        Order order = orderMapper.selectOne(new Order(orderNo));
        return !Objects.equals(order.getStatus(), OrderEnum.已提交待付费.code());
    }

    /**
     * 判断请求时的total_fee与通知时获取的total_fee是否一致的
     * @param orderNo
     * @return
     */
    @Override
    public boolean totalFeeQqualsIf(String totalFee,String orderNo) {
        Order order = orderMapper.selectOne(new Order(orderNo));
        return Objects.equals(String.valueOf(order.getPayFee()),totalFee);
    }

}
