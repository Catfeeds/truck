package com.hyhl.gotosea.core.order.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * 订单日志
 * @author Gene
 *
 */
@Table(name = "t_order_log")
public class OrderLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private Integer orderId;

	private Integer orderProcessType;

	private Integer statusBefore;

	private Integer statusAfter;

	private Date processTime;

	private String processUser;

	private String remark;

	public OrderLog() {
	}

	public OrderLog(Integer orderId, Integer statusBefore, Integer statusAfter, Integer orderProcessType, Date processTime) {
		this.orderId = orderId;
		this.statusBefore = statusBefore;
		this.statusAfter = statusAfter;
		this.orderProcessType = orderProcessType;
		this.processTime = processTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getOrderProcessType() {
		return orderProcessType;
	}

	public void setOrderProcessType(Integer orderProcessType) {
		this.orderProcessType = orderProcessType;
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
