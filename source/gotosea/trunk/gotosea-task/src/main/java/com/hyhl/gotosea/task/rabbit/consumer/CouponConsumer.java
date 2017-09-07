package com.hyhl.gotosea.task.rabbit.consumer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.gotosea.core.order.mapper.CouponUseLogMapper;
import com.hyhl.gotosea.core.order.mapper.CustCouponMapper;
import com.hyhl.gotosea.core.order.po.CouponUseLog;
import com.hyhl.gotosea.core.order.po.CustCoupon;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;

/**
 * Cust消费者
 * @author guan.sj
 *
 */
@Component
public class CouponConsumer {
	
//	@Autowired
//	private MessageResolverHelper resolverHelper;
	@Autowired
	private CustCouponMapper custCouponMapper;
	@Autowired
	private CouponUseLogMapper logMapper;
	
	@RabbitListener(queues = "coupon.queue")
	@Transactional(transactionManager="orderTransationManager")
	public void processMessage(MqMessage message) throws Exception {
		
		//处理优惠券入账事件
		if(message.getRouteKey().equals(MqMessageEnum.coupon_new.getKey())){
			CustCoupon custCoupon =(CustCoupon) message.get(MqMessageEnum.coupon_new);
			this.custCouponMapper.insert(custCoupon);
		}
		//处理过期优惠券事件
		if(message.getRouteKey().equals(MqMessageEnum.coupon_expired.getKey())){
			String ids =(String) message.get(MqMessageEnum.coupon_expired);
			List<CustCoupon> list = this.custCouponMapper.batchSelectEntityByIds(ids);
			List<Integer> idList=new ArrayList<>();
			CouponUseLog log =null;
			for(CustCoupon cc:list){
				log =new CouponUseLog();
				log.setCustCouponId(cc.getId());
				log.setRemark("优惠券已过期");
				logMapper.insert(log);
				idList.add(cc.getId());
			}
			if(idList.size()>0) this.custCouponMapper.batchDeleteByIds(idList);
		}
		
	}
	
}
