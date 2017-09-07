package com.hyhl.gotosea.core.local.po;

import javax.persistence.*;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 14:19
**/
@Table(name = "t_area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer areaId;//区域ID

    @Column(name = "p_area_id")
    private Integer pAreaId;//上级区域id

    @Column(name = "area_name")
    private String areaName;//区域名称

    private Integer level;//层级（省/市/区县）

    private String lng;//区域中心经度

    private String lat;//区域中心维度

    @Column(name = "meteor_area")
    private String meteorArea;//对应气象区域编码

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public Integer getpAreaId() {
        return pAreaId;
    }

    public void setpAreaId(Integer pAreaId) {
        this.pAreaId = pAreaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getMeteorArea() {
        return meteorArea;
    }

    public void setMeteorArea(String meteorArea) {
        this.meteorArea = meteorArea;
    }

}
