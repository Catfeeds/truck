package com.hyhl.gotosea.app.local.po;

public class Meteor {
    private String maxTemperature;  //一天最高温 ℃
    private String minTemperature;  //一天最低温 ℃
    private String weatherStatus;    //天气状况，关联参照表ID，见附录-参照表
    private String windSpeed;    //风速， m/s
    private String windAngle;      //风向角 指南起点，顺时针计算
    private String fcstDate;        //预测日期
    private String windDireciton;    //风向
    private String windGrade;       //风力等级
    private String moonAge;        //月龄
    private String fishery;          //渔汛关联参照表ID，见附录
    private String fishIndex;         //鱼情指数
    private String pressure;         //气压
    private String tideInfo;          //潮汐状况
    private String tideSub;          //潮差

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

    public String getWeatherStatus() {
        return weatherStatus;
    }

    public void setWeatherStatus(String weatherStatus) {
        this.weatherStatus = weatherStatus;
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getWindAngle() {
        return windAngle;
    }

    public void setWindAngle(String windAngle) {
        this.windAngle = windAngle;
    }

    public String getFcstDate() {
        return fcstDate;
    }

    public void setFcstDate(String fcstDate) {
        this.fcstDate = fcstDate;
    }

    public String getWindDireciton() {
        return windDireciton;
    }

    public void setWindDireciton(String windDireciton) {
        this.windDireciton = windDireciton;
    }

    public String getWindGrade() {
        return windGrade;
    }

    public void setWindGrade(String windGrade) {
        this.windGrade = windGrade;
    }

    public String getMoonAge() {
        return moonAge;
    }

    public void setMoonAge(String moonAge) {
        this.moonAge = moonAge;
    }

    public String getFishery() {
        return fishery;
    }

    public void setFishery(String fishery) {
        this.fishery = fishery;
    }

    public String getFishIndex() {
        return fishIndex;
    }

    public void setFishIndex(String fishIndex) {
        this.fishIndex = fishIndex;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public String getTideInfo() {
        return tideInfo;
    }

    public void setTideInfo(String tideInfo) {
        this.tideInfo = tideInfo;
    }

    public String getTideSub() {
        return tideSub;
    }

    public void setTideSub(String tideSub) {
        this.tideSub = tideSub;
    }
}
