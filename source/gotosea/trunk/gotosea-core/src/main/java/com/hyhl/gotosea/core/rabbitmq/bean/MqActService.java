package com.hyhl.gotosea.core.rabbitmq.bean;

import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;

import java.io.Serializable;
import java.util.List;

public class MqActService implements Serializable {
    private static final long serialVersionUID = 1L;

    private String custId;
    private Long actId;
    private List<ActivityServiceDto> activityServiceDtos;

    public MqActService(){super();}

    public MqActService(String custId,Long actId,List<ActivityServiceDto> activityServiceDtos){
        this.actId=actId;
        this.custId=custId;
        this.activityServiceDtos=activityServiceDtos;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
    }

    public List<ActivityServiceDto> getActivityServiceDtos() {
        return activityServiceDtos;
    }

    public void setActivityServiceDtos(List<ActivityServiceDto> activityServiceDtos) {
        this.activityServiceDtos = activityServiceDtos;
    }
}
