package com.hyhl.gotosea.core.local.po;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

public class LocatorVo {
    /**
     * 定位点ID
     */
    private Integer id;

    /**
     * 定位点名称
     */
    private String name;

    /**
     * 定位点类型id
     */
    private Integer locatorTypeId;

    /**
     * 归属区域id
     */
    private Integer areaId;

    /**
     * 经度
     */
    private BigDecimal lng;

    /**
     * 维度
     */
    private BigDecimal lat;

    /**
     * 定位点描述
     */
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLocatorTypeId() {
        return locatorTypeId;
    }

    public void setLocatorTypeId(Integer locatorTypeId) {
        this.locatorTypeId = locatorTypeId;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
