package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;
import java.util.Date;

/**
 * 订单
 * @author Gene
 *
 */
@Table(name = "t_order")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "order_no")
	private String orderNo;

	private String remark;

	@Column(name = "order_type")
	private Integer orderType;//1-活动订单,2-单品服务订单',

	@Column(name = "cust_id")
	private String custId;

	@Column(name = "activity_id")
	private Long activityId;//如果订单类型是活动订单，则填写活动ID； 如果订单类型是单品服务订单，则null',

	@Column(name = "travelers_num")
	private Integer travelersNum;//订单玩家人数

	@Column(name = "create_time")
	private Date createTime;

	private Date departureTime;//出发时间

	private Date endTime;//结束时间

	@Column(name = "prefer_price")
	private Integer preferPrice;

	@Column(name = "market_price")
	private Integer marketPrice;

	@Column(name = "cost_price")
	private Integer costPrice;

	@Column(name = "pay_fee")
	private Integer payFee;//支付费用

	private Integer status;//0-待提交,1-已提交待付费,2-已付费待确认,3-已确认待出行,4-已出行待评价,5-已评价、订单关闭,6-已申请撤销待确认,7-已确认撤销待退款,8-已退款、订单关闭

	@Column(name = "status_time")
	private Date statusTime;//订单状态更新时间

	private String contacter;//预定人姓名

	private String contacterPhone;//预定人手机

	private String contacterRemark;//预定人备注信息

	private String sign;//签名(orderNo+付款userId)

	public Order() {
	}

	public Order(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getOrderType() {
		return orderType;
	}

	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Long getActivityId() {
		return activityId;
	}

	public void setActivityId(Long activityId) {
		this.activityId = activityId;
	}

	public Integer getTravelersNum() {
		return travelersNum;
	}

	public void setTravelersNum(Integer travelersNum) {
		this.travelersNum = travelersNum;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getPreferPrice() {
		return preferPrice;
	}

	public void setPreferPrice(Integer preferPrice) {
		this.preferPrice = preferPrice;
	}

	public Integer getMarketPrice() {
		return marketPrice;
	}

	public void setMarketPrice(Integer marketPrice) {
		this.marketPrice = marketPrice;
	}

	public Integer getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(Integer costPrice) {
		this.costPrice = costPrice;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getStatusTime() {
		return statusTime;
	}

	public void setStatusTime(Date statusTime) {
		this.statusTime = statusTime;
	}

	public Integer getPayFee() {
		return payFee;
	}

	public void setPayFee(Integer payFee) {
		this.payFee = payFee;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getContacter() {
		return contacter;
	}

	public void setContacter(String contacter) {
		this.contacter = contacter;
	}

	public String getContacterPhone() {
		return contacterPhone;
	}

	public void setContacterPhone(String contacterPhone) {
		this.contacterPhone = contacterPhone;
	}

	public String getContacterRemark() {
		return contacterRemark;
	}

	public void setContacterRemark(String contacterRemark) {
		this.contacterRemark = contacterRemark;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public Date getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(Date departureTime) {
		this.departureTime = departureTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
}
