package com.hyhl.gotosea.core.order.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.order.enm.CouponEnum;
import com.hyhl.gotosea.core.order.mapper.CouponMapper;
import com.hyhl.gotosea.core.order.mapper.CouponUseLogMapper;
import com.hyhl.gotosea.core.order.mapper.CustCouponMapper;
import com.hyhl.gotosea.core.order.po.Coupon;
import com.hyhl.gotosea.core.order.po.CouponUseLog;
import com.hyhl.gotosea.core.order.po.CustCoupon;
import com.hyhl.gotosea.core.order.service.CouponCoreService;
import com.hyhl.gotosea.core.order.vo.CoupDetailVo;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;


@Service
public class CouponCoreServiceImpl extends BaseServiceImpl<Coupon> implements CouponCoreService {
	
	private static Logger log=LoggerFactory.getLogger(CouponCoreServiceImpl.class);
	
	@Autowired
	private CouponMapper couponMapper;
	@Autowired
	private CustCouponMapper custCouponMapper;
	@Autowired
	private CouponUseLogMapper userLogMapper;
	
	@Autowired
	private MqProducer mqProducer;
	
	@Override
	public List<CoupDetailVo> getCoupon(String custId,Integer typeId,Integer status) {
		List<CoupDetailVo> list =this.couponMapper.getCouponVo(custId, typeId,status);
		return list;
	}

	@Override
	public Integer useCouponNum(Integer custCoupId,Integer type, Integer num,String orderNo) {
		//查询
		CustCoupon custCoup=this.custCouponMapper.selectByPrimaryKey(custCoupId);
		Assert.notNull(custCoup,"优惠券信息异常！");
		Coupon coupon =this.couponMapper.selectByPrimaryKey(custCoup.getCouponId());
		Assert.notNull(coupon,"优惠券信息异常！");
		//检测优惠卷类型是否匹配
		if(!coupon.getCouponTypeId().equals(type)) throw new BaseBusinessException("","类型不匹配");
		//验证优惠卷可用状态
		if(coupon.getStatus()==0) throw new BaseBusinessException("","优惠卷已失效");
		//验证优惠卷有效期
		Calendar cal =Calendar.getInstance(Locale.CHINA);
		if(custCoup.getEndDate().before(cal.getTime())) throw new BaseBusinessException("","您的优惠卷已过期");
		//验证优惠卷数量是否足够
		if((custCoup.getCouponNum()-custCoup.getUsedNum())<num) throw new BaseBusinessException("","您的优惠卷数量不足");
		//修改优惠卷
		CustCoupon record =new CustCoupon();
		int usedNumber =custCoup.getUsedNum()+num;
		record.setId(custCoupId);
		record.setUsedNum(usedNumber);
		this.custCouponMapper.updateByPrimaryKeySelective(record);
		//生成日志
		CouponUseLog log =new CouponUseLog(custCoupId, orderNo, num, cal.getTime(), "使用正常");
		userLogMapper.insert(log);
		return coupon.getAmount();
	}

	@Override
	public List<Coupon> all() {
		return this.couponMapper.getAll();
	}

	@Override
	public void addCoupon(String custId,Integer couponId,Integer num,Integer getWay) {
		Coupon coup =this.selectByPrimaryKey(couponId);
		if(coup.getSuppliedNum()<num) throw new BaseBusinessException("","满减卷数量不足，无法兑换");
		CustCoupon custCoup =new CustCoupon(couponId, custId, num,getWay);
		Calendar cal=Calendar.getInstance(Locale.CHINA);
		custCoup.setCouponTime(cal.getTime());
		custCoup.setBeginDate(cal.getTime());
		//获取截止时间
		cal.setTime(cal.getTime());
		cal.add(Calendar.MONTH, coup.getValidityMonths());
		custCoup.setEndDate(cal.getTime());
		this.custCouponMapper.insert(custCoup);
		//增加优惠卷发现数量
		Coupon record =new Coupon();
		record.setSuppliedNum(coup.getSuppliedNum()+num);
		record.setId(couponId);
		this.couponMapper.updateByPrimaryKey(record);
	}

	@Override
	public void dealUnableCoupon(int[] couponIds) {
		StringBuffer ids =new StringBuffer();
		for(int i=0;i<couponIds.length;i++ ){
			ids.append(String.valueOf(couponIds[i]));
			if(i !=(couponIds.length-1)) ids.append(",");
		}
		MqMessage mqMessage=null;
		try {
			mqMessage=MqMessage.newInstance().put(MqMessageEnum.coupon_expired, ids.toString());
		} catch (JsonProcessingException e) {
			log.error(e.getMessage());
		}
		mqProducer.send(mqMessage);
	}

	@Override
	public List<CoupDetailVo> getCouponForOrder(String custId,int amount) {
		
		List<CoupDetailVo> replacts_list  = this.couponMapper.getCouponVo(custId,CouponEnum.类型_代金券.getCode(),1);
		List<CoupDetailVo> condition_list = this.couponMapper.getCouponForOrder(custId,CouponEnum.类型_满减券.getCode(),1,amount);
		List<CoupDetailVo> list =new ArrayList<>();
		list.addAll(replacts_list);
		list.addAll(condition_list);
		return list;
	}

	@Override
	@Transactional(transactionManager="orderTransationManager")
	public Boolean rollBackCoupon(String orderNo) {
		try{
			CouponUseLog log =new CouponUseLog(orderNo, null);
			List<CouponUseLog> list= this.userLogMapper.select(log);
			//订单记录不存在
			if(list.size()<0) throw new BaseBusinessException("","订单不存在是用优惠卷记录");
			for(CouponUseLog c:list){
				CustCoupon custCoup = this.custCouponMapper.selectByPrimaryKey(c.getCustCouponId()); 
				Coupon coupon =this.couponMapper.selectByPrimaryKey(custCoup.getCouponId());
				//判断优惠卷是否仍旧可用
				if(coupon.getStatus()==0) throw new BaseBusinessException("","优惠卷已失效");
				//判断优惠卷是否超过有效期
				Calendar cal =Calendar.getInstance(Locale.CHINA);
				if(custCoup.getEndDate().before(cal.getTime()))throw new BaseBusinessException("","优惠卷已超过有效期"); 
				//回滚
				custCoup.setUsedNum(custCoup.getUsedNum()-c.getUsedNum());
				custCouponMapper.updateByPrimaryKeySelective(custCoup);
				userLogMapper.delete(log);
			}
			return true;
		}catch (Exception e) {
			System.out.println(e.getMessage());
			log.error(e.getMessage());
		}
		return false;
	}
	
	
	
	


}
