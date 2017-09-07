package com.hyhl.gotosea.core.local.vo;

import com.hyhl.gotosea.core.ref.po.FeatureTag;

import java.util.List;

public class BaseInfoVo {
    private String resourceId; //资源id
    private String meteorArea;  //对应区域编码
    private String resourceName;    //资源名字
    private String address; //地址
    private Integer resourceType;   //1 商家资源  2 公共资源
//    private String areaName;    //归属区域名称
    private List<String> featureTags;   //商家资源标签（1级）
    private Integer areaId; //所属区域id
    private String weatherStatus;  //天气状况 阴天 晴天
    private String windGrade;  //风力等级
    private String windDirection;  //风向
    private String maxTemperature;  //最高温
    private String minTemperature;  //最低温
    private String tideSub; //潮差
    private String fishIndex;         //鱼情指数
    private Integer grade;  //评分

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMeteorArea() {
        return meteorArea;
    }

    public void setMeteorArea(String meteorArea) {
        this.meteorArea = meteorArea;
    }

    public String getWindGrade() {
        return windGrade;
    }

    public void setWindGrade(String windGrade) {
        this.windGrade = windGrade;
    }

    public String getWindDirection() {
        return windDirection;
    }

    public void setWindDirection(String windDirection) {
        this.windDirection = windDirection;
    }

    public String getMaxTemperature() {
        return maxTemperature;
    }

    public void setMaxTemperature(String maxTemperature) {
        this.maxTemperature = maxTemperature;
    }

    public String getMinTemperature() {
        return minTemperature;
    }

    public void setMinTemperature(String minTemperature) {
        this.minTemperature = minTemperature;
    }

    public String getTideSub() {
        return tideSub;
    }

    public void setTideSub(String tideSub) {
        this.tideSub = tideSub;
    }

    public String getFishIndex() {
        return fishIndex;
    }

    public void setFishIndex(String fishIndex) {
        this.fishIndex = fishIndex;
    }

    public String getWeatherStatus() {
        return weatherStatus;
    }

    public void setWeatherStatus(String weatherStatus) {
        this.weatherStatus = weatherStatus;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Integer getResourceType() {
        return resourceType;
    }

    public void setResourceType(Integer resourceType) {
        this.resourceType = resourceType;
    }

    public List<String> getFeatureTags() {
        return featureTags;
    }

    public void setFeatureTags(List<String> featureTags) {
        this.featureTags = featureTags;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }
}
