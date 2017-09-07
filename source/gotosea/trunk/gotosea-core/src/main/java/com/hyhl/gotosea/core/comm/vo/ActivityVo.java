package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.cust.po.Cust;

import java.util.Date;
import java.util.List;

public class ActivityVo extends CommVo{
    private Long activityId;    //活动id

    private String activityTitle;   //活动标题

    private String summary; //概要

    private String destinationName; //目的地名称

    private Integer activityDays;   //活动天数

    private Date beginDate; //开始日期

    private Date endDate;   //结束日期

    private Date gatherTime;    //集合时间

    private Date applyEndTime;  //活动报名结束时间

    private Integer minCustomers;   //人数下限

    private Integer maxCustomers;   //人数上限

    private Integer status; //状态

    private Boolean isPay;  //是否已经付款

    private List<ActivityServiceVo> activityServiceVos; //服务项

    public Boolean getIsPay() {
        return isPay;
    }

    public void setIsPay(Boolean pay) {
        isPay = pay;
    }

    public Date getApplyEndTime() {
        return applyEndTime;
    }

    public void setApplyEndTime(Date applyEndTime) {
        this.applyEndTime = applyEndTime;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public List<ActivityServiceVo> getActivityServiceVos() {
        return activityServiceVos;
    }

    public void setActivityServiceVos(List<ActivityServiceVo> activityServiceVos) {
        this.activityServiceVos = activityServiceVos;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getActivityDays() {
        return activityDays;
    }

    public void setActivityDays(Integer activityDays) {
        this.activityDays = activityDays;
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

    public Date getGatherTime() {
        return gatherTime;
    }

    public void setGatherTime(Date gatherTime) {
        this.gatherTime = gatherTime;
    }

    public Integer getMinCustomers() {
        return minCustomers;
    }

    public void setMinCustomers(Integer minCustomers) {
        this.minCustomers = minCustomers;
    }

    public Integer getMaxCustomers() {
        return maxCustomers;
    }

    public void setMaxCustomers(Integer maxCustomers) {
        this.maxCustomers = maxCustomers;
    }

}
