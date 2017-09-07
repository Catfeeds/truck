package com.hyhl.gotosea.core.cust.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_cust_recent_info")
public class CustRecentInfo implements Serializable {
    /**
     * 客户ID
     */
	@Id
    private String custId;

    /**
     * 最近登录IP
     */
    private String loginIp;

    /**
     * 最近登录时间
     */
    private Date loginTime;

    /**
     * 登录次数
     */
    private Integer loginNum;

    private static final long serialVersionUID = 1L;

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public Integer getLoginNum() {
        return loginNum;
    }

    public void setLoginNum(Integer loginNum) {
        this.loginNum = loginNum;
    }
}