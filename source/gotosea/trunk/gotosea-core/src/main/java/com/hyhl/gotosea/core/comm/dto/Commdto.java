package com.hyhl.gotosea.core.comm.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

public class Commdto {

    @NotNull(message = "是否仅朋友可见不能为空")
    private Integer onlyForMutaulFans;  //是否仅朋友可见

    @NotBlank(message = "发布位置不能为空")
    private String postLocation;    //发布位置

    @NotNull(message = "业务线id不能为空")
    private Integer businessUnitId; //业务线id

    public Integer getOnlyForMutaulFans() {
        return onlyForMutaulFans;
    }

    public void setOnlyForMutaulFans(Integer onlyForMutaulFans) {
        this.onlyForMutaulFans = onlyForMutaulFans;
    }

    public String getPostLocation() {
        return postLocation;
    }

    public void setPostLocation(String postLocation) {
        this.postLocation = postLocation;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }
}
