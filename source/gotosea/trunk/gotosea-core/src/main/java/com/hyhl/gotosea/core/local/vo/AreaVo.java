package com.hyhl.gotosea.core.local.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 14:32
**/
public class AreaVo {

    @JsonProperty("key")
    private Integer areaId;

    @JsonProperty("value")
    private String areaName;//区域名称

    @JsonProperty("items")
    private List<AreaVo> children;

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public List<AreaVo> getChildren() {
        return children;
    }

    public void setChildren(List<AreaVo> children) {
        this.children = children;
    }
}
