package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * @author guan.sj
 */
@Table(name = "t_coupon_use_log")
public class CouponUseLog implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer custCouponId;

    private String orderNo;

    private Integer usedNum;

    private Date useTime;

    private String remark;

    private static final long serialVersionUID = 1L;

    public CouponUseLog() {
    }

    public CouponUseLog(String orderNo, Integer custCouponId) {
        this.orderNo = orderNo;
        this.custCouponId = custCouponId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCustCouponId() {
        return custCouponId;
    }

    public void setCustCouponId(Integer custCouponId) {
        this.custCouponId = custCouponId;
    }

    public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getUsedNum() {
        return usedNum;
    }

    public void setUsedNum(Integer usedNum) {
        this.usedNum = usedNum;
    }

    public Date getUseTime() {
        return useTime;
    }

    public void setUseTime(Date useTime) {
        this.useTime = useTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public CouponUseLog(Integer custCouponId, String orderNo, Integer usedNum, Date useTime, String remark) {
		super();
		this.custCouponId = custCouponId;
		this.orderNo = orderNo;
		this.usedNum = usedNum;
		this.useTime = useTime;
		this.remark = remark;
	}
    
}