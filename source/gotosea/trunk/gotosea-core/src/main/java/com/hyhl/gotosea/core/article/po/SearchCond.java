package com.hyhl.gotosea.core.article.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class SearchCond {
    private Integer bizId;  //业务线id
    private String keyword; //关键字
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startTime; //开始时间
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endTime;   //结束时间

    public Integer getBizId() {
        return bizId;
    }

    public void setBizId(Integer bizId) {
        this.bizId = bizId;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
