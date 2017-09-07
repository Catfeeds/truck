package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class ConActVo extends ConCommVo{

    private Long activityId;    //活动id

    private String activityTitle;   //活动标题

    private String summary; //概要

    private Integer destination;    //目的地id

    private String destinationName; //目的地名称

    private Integer activityDays;   //活动天数

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginDate; //开始日期

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;   //结束日期

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gatherTime;    //集合时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date applyEndTime;  //活动报名结束时间

    private Integer minCustomers;   //人数下限

    private Integer maxCustomers;   //人数上限

    private Integer status; //状态 (console用)

    private String statusName;  //状态名称(console用)

    private List<ConActServeVo> conActServeVos; //服务项

    public List<ConActServeVo> getConActServeVos() {
        return conActServeVos;
    }

    public void setConActServeVos(List<ConActServeVo> conActServeVos) {
        this.conActServeVos = conActServeVos;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
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

    public Integer getDestination() {
        return destination;
    }

    public void setDestination(Integer destination) {
        this.destination = destination;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
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

    public Date getApplyEndTime() {
        return applyEndTime;
    }

    public void setApplyEndTime(Date applyEndTime) {
        this.applyEndTime = applyEndTime;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

}
