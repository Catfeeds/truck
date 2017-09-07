package com.hyhl.gotosea.core.im.enm;

public enum ImMessageEnum {
	/** 客户*/
	/** 审核通过消息*/
	Merchant_Success("您好，您申请的商家身份已通过审核。"),
	/** 审核不通过消息*/
	Merchant_Fail("您好，您申请的商家身份未通过审核，请登录海约app查看详情重新提交资料进行审核。如有任何疑问，请致电海约客服热线%s。"),
	
	/** 商家*/
	/** 提现申请*/
	Withdraw_apply(""),
	/** 提现成功*/
	Withdraw_Success("您好，%s提现申请%s元成功。如有任何疑问，请致电海约客服热线%s。"),
	/** 提现失败*/
	Withdraw_Fail("您好，%s提现申请%s元提现失败。如有任何疑问，请致电海约客服热线%s。"),
	
	/** 积分*/
	/** 积分新增消息*/
	/** 签到*/
	Credits_Checkin("签到","签到成功，获得%d积分。"),
	/** 邀请好友*/
	Credits_Invite("邀请好友","%s用户通过您的邀请成为平台会员，奖励%d积分。"),
	/** 发表动态*/
	Credits_Dynamic("发表动态","动态发布成功，获得%d积分。"),
	/** 评价动态*/
	Credits_Evaluate_Dynamic("评价动态","动态评价成功，获得%d积分。"),
	/** 发表活动*/
	Credits_Activity("发表活动","活动发布成功，获得%d积分。"),
	/** 发表活动*/
	Credits_Evaluate_Activity("评价活动","活动评价成功，获得%d积分。"),
	/** 活动参与者全部付款*/
	Credits_PayAll("活动参与者全部付款","您的活动已成行成功，获得%d积分。"),
	/** 服务结束*/
	Credits_ServiceEnd("服务结束","根据您在平台上的消费记录，奖励%d积分。"),
	/** 出行评价*/
	Credits_Evaluate("出行评价","非常感谢您对本次服务的评价，奖励%d积分。"),

	/** 积分兑换优惠券成功消息*/
	Credits_Exchange_Success("您好，您已成功兑换%d张%s优惠券，详情请到个人中心查看。"),

	/** 订单 */
	/** 出单 */
	Order_Statr("出单成功","您预订的%s已出单成功，出行日期：%s。请做好出行准备，祝您旅途愉快。如有任何疑问，请致电海约客服热线%s。"),
	/** 退单 */
	Order_Return("出单失败","您预订的%s出单失败，出行日期：%s。我们会在3个工作日内为您退款，对您的旅程产生的影响，我们感到非常抱歉。如有任何疑问，请致电海约客服热线%s。"),
	;
	public String msg;

	private String title;
	
	
	ImMessageEnum(String msg){
		this.msg = msg;
	}

	ImMessageEnum(String title, String msg) {
		this.msg = msg;
		this.title = title;
	}

	public String getMsg(){
		return this.msg;
	}

	public String getTitle() {
		return title;
	}
}
