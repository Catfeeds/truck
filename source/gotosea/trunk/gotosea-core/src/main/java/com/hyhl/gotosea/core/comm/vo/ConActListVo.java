package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class ConActListVo {
    //活动需要的内容
    private Long id;
    private String activityTitle;   //活动标题
    private String destination; //目的地（id转string）
    private Integer activityDays;   //活动天数
    private String summary;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date gatherTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date applyEndTime;      //报名截止时间
    private Integer minCustomers;   //最少人数
    private Integer maxCustomers;   //最多人数
    private Integer status; //状态 (console用)
    private String statusName;  //状态名称(console用)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getActivityDays() {
        return activityDays;
    }

    public void setActivityDays(Integer activityDays) {
        this.activityDays = activityDays;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
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
