package com.hyhl.gotosea.core.cust.vo;

import com.hyhl.gotosea.core.cust.po.AuditLog;

/**
 * @author guan.sj
 */
public class AuditLogVO extends AuditLog{
	private static final long serialVersionUID = 1L;
	private String realName;
	private String phone;
	private String idNum;
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
}