package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 商家订单日志
 */
@Table(name = "t_merchant_order_log")
public class MercOrderLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private Integer merchantOrderId;

	private Integer processType;

	private Integer statusBefore;

	private Integer statusAfter;

	private Date processTime;

	private String processUser;

	private String remark;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMerchantOrderId() {
		return merchantOrderId;
	}

	public void setMerchantOrderId(Integer merchantOrderId) {
		this.merchantOrderId = merchantOrderId;
	}

	public Integer getProcessType() {
		return processType;
	}

	public void setProcessType(Integer processType) {
		this.processType = processType;
	}

	public Integer getStatusBefore() {
		return statusBefore;
	}

	public void setStatusBefore(Integer statusBefore) {
		this.statusBefore = statusBefore;
	}

	public Integer getStatusAfter() {
		return statusAfter;
	}

	public void setStatusAfter(Integer statusAfter) {
		this.statusAfter = statusAfter;
	}

	public Date getProcessTime() {
		return processTime;
	}

	public void setProcessTime(Date processTime) {
		this.processTime = processTime;
	}

	public String getProcessUser() {
		return processUser;
	}

	public void setProcessUser(String processUser) {
		this.processUser = processUser;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
