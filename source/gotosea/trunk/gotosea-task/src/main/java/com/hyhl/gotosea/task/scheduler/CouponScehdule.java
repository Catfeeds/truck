package com.hyhl.gotosea.task.scheduler;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.hyhl.gotosea.core.order.po.Coupon;
import com.hyhl.gotosea.core.order.service.CouponCoreService;

@Configurable
@Component
@EnableScheduling
public class CouponScehdule {
	private static Logger log =LoggerFactory.getLogger(CouponScehdule.class);
		
	@Autowired
	private CouponCoreService CouponCoreService;
	/**
	 * 轮询找出过期优惠卷，处理
	 */
	@Scheduled(cron="0 0 0-2 * * ?")//每天凌晨0-2点，没半小时执行一次
	public void dealCouponValidity(){
		log.info("=====================轮询检测过期优惠卷开始=========================");
		Coupon coupon =new Coupon();
		coupon.setStatus(0);
		List<Coupon> list =this.CouponCoreService.select(coupon);
		if(list.size()>0){
			int[] ids =new int[list.size()];
			for(int i=0;i<list.size();i++){
				ids[i] =list.get(i).getId();
			}
			log.info("处理优惠卷 id "+Arrays.toString(ids));
			this.CouponCoreService.dealUnableCoupon(ids);
		}
		log.info("=====================轮询检测过期优惠卷结束=========================");
	}

}
