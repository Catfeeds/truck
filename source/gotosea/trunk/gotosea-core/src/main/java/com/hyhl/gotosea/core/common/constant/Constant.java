package com.hyhl.gotosea.core.common.constant;

/**
 * 常量
 * @author Gene
 *
 */
public interface Constant {
	String DEFAULT_MSG = "参数不全或格式错误";
	
	/** 海约互联服务热线电话*/
	String HYHL_HOTLINE = "4000042010";
	
	/** 用户默认值-名称 */
	String DEFAULT_CUST_NAME_PRE = "玩家_";
	/** 用户默认值-性别 */
	int DEFAULT_CUST_SEX = 1;
	/** 用户默认值-头像 */
	String DEFAULT_CUST_PICTURE = "http://gotosea.oss-cn-shenzhen.aliyuncs.com/pub/images/default_header.jpg";
	/** 用户默认值-等级 */
	int DEFAULT_CUST_LEVEL = 1;
	/** 用户默认值-积分 */
	int DEFAULT_CUST_CREDITS = 0;
	/** 用户默认值-经验值 */
	int DEFAULT_CUST_EXPERENCE_VALUE = 0;
	
	/** 商家默认值-商家评分 */
	int DEFAULT_MERCHANT_GRADE = 0;
	/** 商家默认值-商家订单总数 */
	int DEFAULT_MERCHANT_ORDERCOUNT = 0;

	int ORDER_PAY_TIME=1800;//单位为秒，共计30分钟

	String ROUTE_CONVER_SIZE = "x-oss-process=style/660-330";
}
