package com.hyhl.gotosea.core.article.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ArticleListVo {
    private Integer id;

    private String businessUnitName;//业务线名称

    private String title;

    private Boolean isThumb;

    private String summary; //概要

    private String thumbnail;  //缩略图

    @JsonFormat(pattern = "yyyy-MM-dd")
//    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date releaseDate;

    public Boolean getIsThumb() {
        return isThumb;
    }

    public void setIsThumb(Boolean thumb) {
        isThumb = thumb;
    }

    private  Integer readQuantity;  //阅读量

    private  Integer thumbQuantity; //点赞量

    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBusinessUnitName() {
        return businessUnitName;
    }

    public void setBusinessUnitName(String businessUnitName) {
        this.businessUnitName = businessUnitName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getReadQuantity() {
        return readQuantity;
    }

    public void setReadQuantity(Integer readQuantity) {
        this.readQuantity = readQuantity;
    }

    public Integer getThumbQuantity() {
        return thumbQuantity;
    }

    public void setThumbQuantity(Integer thumbQuantity) {
        this.thumbQuantity = thumbQuantity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
