package com.hyhl.gotosea.core.comm.vo;

public class ActivityServiceDetailVo {
    private Integer id;

    private Integer serviceDetailId;    //活动服务明细id

    private Integer serviceDetailNum;   //活动服务明细数量

    private String  serviceDetailName;  //活动服务明细名称

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceDetailId() {
        return serviceDetailId;
    }

    public void setServiceDetailId(Integer serviceDetailId) {
        this.serviceDetailId = serviceDetailId;
    }

    public Integer getServiceDetailNum() {
        return serviceDetailNum;
    }

    public void setServiceDetailNum(Integer serviceDetailNum) {
        this.serviceDetailNum = serviceDetailNum;
    }

    public String getServiceDetailName() {
        return serviceDetailName;
    }

    public void setServiceDetailName(String serviceDetailName) {
        this.serviceDetailName = serviceDetailName;
    }
}
