package com.hyhl.gotosea.core.rabbitmq.enm;

import com.hyhl.gotosea.core.rabbitmq.bean.*;

/**消息route_key枚举
 * @author guan.sj
 */
public enum MqMessageEnum {

	/** 客户事件 */
	/** 登录 */
	cust_login("cust.login", MqCustLogin.class),
	/** 注册*/
	cust_register("cust.register", MqCustRegister.class),
	/** 认证商家成功*/
	be_merchant_success("cust.be_merchant_success", MqMerchantSuccess.class),
	/** 认证商家失败*/
	be_merchant_fail("cust.be_merchant_fail", MqMerchantFail.class),
	
	
	/** 商家事件 */
	/** 商家提现申请*/
	withdraw_apply("merchant.withdraw_apply",MqWithdrawApply.class),
	/** 商家提现成功*/
	withdraw_success("merchant.withdraw_success", MqWithdrawSuccess.class),
	/** 商家提现失败*/
	withdraw_fail("merchant.withdraw_fail", MqWithdrawFail.class),
	/** 更新商家统计信息*/
	merchant_statistics("merchant.statistics", MqMerchantStatistics.class),
	
	
	/** 优惠券事件*/
	/** 优惠券入账 */
	coupon_new("coupon.new", null),
	/** 优惠券过期 */
	coupon_expired("coupon.expired", null),
	/** 优惠券未领取 */
	coupon_receive("coupon.receive", null),
	
	
	/** 订单事件*/
	/** 订单出行人员 */
	order_togethers("order.togethers", null),
	/** 服务信息备份 */
	order_prod_info("order.prod.info", null),
	/** 服务资源备份 */
	order_prod_pub("order.prod.pub", null),
	/** 优惠券使用日志 */
	order_coupon_log("order.coupon.log", null),
	/** 关闭超时订单*/
	order_unpay_close("order.unpay.close", null),
	/** 出单*/
	order_start("order.start", null),
	/** 退单*/
	order_return("order.return", null),
	/** 订单结束*/
	order_end("order.end", MqOrderEnd.class),
	/** 评价成功*/
	order_evaluation("order.evaluation", MqEvaluation.class),
	
	
	/** 积分事件*/
	/** 积分新增*/
	credits_new("credits.credits_new", MqCreditsNew.class),
	/** 积分兑换*/
	credits_exchange("credits.credits_exchange", MqCreditsExchange.class),


	/** 社区事件 */
	/** 记录自选服务明细*/
	comm_act_opt_service("comm.act.opt.service", MqActService.class),
	/** 更改活动状态*/
	comm_act_status_chnage("comm.act.status.chnage",MqActStatusChange.class),
	
	/** 消息推送事件*/
	/** Sms推送*/
	sms_push("sms.push", MqSmsPush.class),
	/** Im推送*/
	im_push("im.push", MqImPush.class)
	;
	
	String key;
	Class<?> clazz;
	
	MqMessageEnum(String key, Class<?> clazz){
		this.key = key;
		this.clazz = clazz;
	}
	
	public String getKey(){
		return this.key;
	}
	
	public Class<?> getClazz(){
		return this.clazz;
	}
	
	
}
