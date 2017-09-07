package com.hyhl.gotosea.core.comm.vo;

import java.util.Date;
import java.util.List;

public class ConActServeVo {
    private String serviceName;

    private Integer serviceId;
    /**
     * 1--AA付费项目
     * 2--自选付费项目
     */
    private Integer activityServiceType;    //服务类型

    private Date serviceTime;    //服务时间

    private Integer serviceNum;    //服务数量

    private Integer seq;

    private String picture; //服务列表图

    private Integer pubResourceId;

    private String pubResourceName;

    private Integer payFee; //应付欠款

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getActivityServiceType() {
        return activityServiceType;
    }

    public void setActivityServiceType(Integer activityServiceType) {
        this.activityServiceType = activityServiceType;
    }

    public Date getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(Date serviceTime) {
        this.serviceTime = serviceTime;
    }

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }

    public String getPubResourceName() {
        return pubResourceName;
    }

    public void setPubResourceName(String pubResourceName) {
        this.pubResourceName = pubResourceName;
    }

    public Integer getPayFee() {
        return payFee;
    }

    public void setPayFee(Integer payFee) {
        this.payFee = payFee;
    }

}
