package com.hyhl.gotosea.core.cust.enm;

public enum CreditsRuleEnum {
	/** 
	 * 1.平台消费，每消费1元累计1分。
	 * 2.出行后评价，带图评论积5分，无图评论积3分。
	 * 3.社区发表一篇动态和活动积5分，评论积1分
	 * 4.发布活动，订单生成且所有人付款后积100分
	 * 5.邀请好友成为会员，100分一人/次
	 * 6.每日签到积分，1/2/3/4/5  分/日,登录APP后自动获取。
	 * */
	
	/** 积分新增-类型 以及对应的 数据库规则表 id */
	/** 每消费1元累计1分*/
	平台消费(1,10001),
	/** 带图评论积5分*/
	带图评价(2,10002),
	/** 无图评论积3分*/
	无图评价(3,10002),
	/** 发表一篇动态5分*/
	发表动态(4,10003),
	/** 评论动态积1分*/
	评论动态(5,10003),
	/** 发表一篇活动积5分*/
	发表活动(6,10004),
	/** 评论活动积1分*/
	评论活动(7,10004),
	/** 订单生成且所有人付款后积100分*/
	发布活动成功付款(8,10005),
	/** 邀请好友成为会员，100分一人/次*/
	邀请好友成为会员(9,10006),
	/** 每日签到积分，1/2/3/4/5  分/日,登录APP后自动获取。*/
	每日签到(10,10007)
	
	;
	
	public int type;
	
	public int id;
	
	CreditsRuleEnum(int type, int id){
		this.type = type;
		this.id = id;
	}
	
	public int getType(){
		return this.type;
	}
	
	public int getId(){
		return this.id;
	}
	
	public static CreditsRuleEnum findEnum(int type){
		CreditsRuleEnum[] values = values();
		for(CreditsRuleEnum value : values){
			if(value.getType()==type)return value;
		}
		return null;
	}
	
}

