package com.hyhl.gotosea.core.order.po;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name="t_cust_coupon")
public class CustCoupon {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Integer id;

    private Integer couponId;

    private String custId;
    
    private Integer couponNum;
    
    private Integer usedNum;
    
    private Integer getWay;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date couponTime;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date useTime;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date beginDate;
    @JsonFormat(pattern="yyyy-MM-dd")
    
    private Date endDate;
    
	private String remark;
	
    public CustCoupon() {}
    public CustCoupon(Integer couponId, String custId) {
		super();
		this.couponId = couponId;
		this.custId = custId;
	}
    
    public CustCoupon(Integer couponId, String custId, Integer couponNum, Integer getWay) {
		super();
		this.couponId = couponId;
		this.custId = custId;
		this.couponNum = couponNum;
		this.getWay = getWay;
	}
    
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	




	public Integer getCouponId() {
		return couponId;
	}

	public void setCouponId(Integer couponId) {
		this.couponId = couponId;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}


	public Integer getGetWay() {
		return getWay;
	}

	public void setGetWay(Integer getWay) {
		this.getWay = getWay;
	}

	public Date getCouponTime() {
		return couponTime;
	}

	public void setCouponTime(Date couponTime) {
		this.couponTime = couponTime;
	}

	public Date getUseTime() {
		return useTime;
	}

	public void setUseTime(Date useTime) {
		this.useTime = useTime;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getCouponNum() {
		return couponNum;
	}

	public void setCouponNum(Integer couponNum) {
		this.couponNum = couponNum;
	}

	public Integer getUsedNum() {
		return usedNum;
	}

	public void setUsedNum(Integer usedNum) {
		this.usedNum = usedNum;
	}
    
	
}
