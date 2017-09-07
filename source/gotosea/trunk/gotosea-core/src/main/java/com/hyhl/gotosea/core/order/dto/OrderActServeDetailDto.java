package com.hyhl.gotosea.core.order.dto;

import com.hyhl.gotosea.core.comm.dto.ActivityServiceDetailDto;

import java.util.List;

public class OrderActServeDetailDto {
    private Integer serviceId;  //服务id  (自选服务)
    private List<ActivityServiceDetailDto> actServeDetailDtos; //自选服务明细

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public List<ActivityServiceDetailDto> getActServeDetailDtos() {
        return actServeDetailDtos;
    }

    public void setActServeDetailDtos(List<ActivityServiceDetailDto> actServeDetailDtos) {
        this.actServeDetailDtos = actServeDetailDtos;
    }
}
