package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name="t_audit_log")
public class AuditLog implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private BigInteger id;//
	private String auditObjectId;// '根据审核类型，填写对应类型的审核对象ID.例如审核类型为1（商家认证），则审核对象ID填写商家的cust_id',
	private Integer auditType;// '1--商家认证审核',
	private Integer status;// '0--已提交待审核1-审核通 2-审核失败,
	private String applyRemark;//
	private String auditRemark;//
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date applyTime;//
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date auditTime;//
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getAuditObjectId() {
		return auditObjectId;
	}
	public void setAuditObjectId(String auditObjectId) {
		this.auditObjectId = auditObjectId;
	}
	public Integer getAuditType() {
		return auditType;
	}
	public void setAuditType(Integer auditType) {
		this.auditType = auditType;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getApplyRemark() {
		return applyRemark;
	}
	public void setApplyRemark(String applyRemark) {
		this.applyRemark = applyRemark;
	}
	public String getAuditRemark() {
		return auditRemark;
	}
	public void setAuditRemark(String auditRemark) {
		this.auditRemark = auditRemark;
	}
	public Date getApplyTime() {
		return applyTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public Date getAuditTime() {
		return auditTime;
	}
	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
	}
}
