package com.hyhl.gotosea.core.prod.po;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class ProdServeCond {
    private Integer pubResourceId;  //公共资源id (根据目的地来选)

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date beginDate; //出发日期

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;   //结束日期

    private Integer advanceDays;    //提前预定天数(需要提前预定天数)

    private Integer minPersons;     //活动最少人数

    private Integer maxPersons;     //活动最多人数

    public Integer getMinPersons() {
        return minPersons;
    }

    public void setMinPersons(Integer minPersons) {
        this.minPersons = minPersons;
    }

    public Integer getMaxPersons() {
        return maxPersons;
    }

    public void setMaxPersons(Integer maxPersons) {
        this.maxPersons = maxPersons;
    }

    public Integer getAdvanceDays() {
        return advanceDays;
    }

    public void setAdvanceDays(Integer advanceDays) {
        this.advanceDays = advanceDays;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
