package com.hyhl.gotosea.core.comm.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class ActivityDto extends Commdto{


    @NotBlank(message = "活动标题不能为空")
    private String activityTitle;   //活动名称

    @NotBlank(message = "活动概要不能为空")
    private String summary; //活动概要

    @NotNull(message = "活动目的地不能为空")
    private Integer destination; //活动目的地(外键)

    @NotNull(message = "活动天数不能为空")
    private Integer activityDays;   //活动天数

    @NotNull(message = "活动开始时间不能为空")
    @JsonFormat( pattern = "yyyy-MM-dd")
    private Date beginDate;    //活动开始时间

    @NotNull(message = "活动结束时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;  //活动结束时间

    @NotNull(message = "活动报名截止时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date applyEndTime;  //报名活动截止时间

    @NotNull(message = "活动集合时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date gatherTime;   //集合时间

    private List<ActivityServiceDto> activityServiceDtos;  //活动服务项dto

    @NotNull(message = "活动出行人下限不能为空")
    private Integer minCustomers;  //活动出行人数下限

    @NotNull(message = "活动出行人上限不能为空")
    private Integer maxCustomers;  //活动出行人数上限

    public Date getApplyEndTime() {
        return applyEndTime;
    }

    public void setApplyEndTime(Date applyEndTime) {
        this.applyEndTime = applyEndTime;
    }

    public List<ActivityServiceDto> getActivityServiceDtos() {
        return activityServiceDtos;
    }

    public void setActivityServiceDtos(List<ActivityServiceDto> activityServiceDtos) {
        this.activityServiceDtos = activityServiceDtos;
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
