package com.hyhl.gotosea.core.comm.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public class ActivityServiceDto {

    private Integer serviceId;  //服务id

    private Integer activityServiceType;    //服务类型

    private Integer seq;    //序号

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date serviceTime;   //服务开始时间

    private Integer serviceNum; //服务数量

    private Integer pubResourceId;  //选择的公共资源id(比如在哪个钓点海钓)

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


    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }

//    public List<ActivityServiceDetailDto> getActivityServiceDetailDtos() {
//        return activityServiceDetailDtos;
//    }

//    public void setActivityServiceDetailDtos(List<ActivityServiceDetailDto> activityServiceDetailDtos) {
//        this.activityServiceDetailDtos = activityServiceDetailDtos;
//    }

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

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }
}
