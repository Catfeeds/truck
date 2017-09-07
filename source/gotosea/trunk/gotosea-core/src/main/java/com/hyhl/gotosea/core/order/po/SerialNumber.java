package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;

/**
 *@author lin.bc
 *2016年9月9日
 */
@Table(name="t_serial_number")
public class SerialNumber {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="max_serial_numer")
	private Integer serialNo;
	
	@Column(name="name")
	private String serialName;
	
	private Integer type;

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public SerialNumber() {
	}

	public SerialNumber(String serialName) {
		this.serialName = serialName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(Integer serialNo) {
		this.serialNo = serialNo;
	}

	public String getSerialName() {
		return serialName;
	}

	public void setSerialName(String serialName) {
		this.serialName = serialName;
	}
}
