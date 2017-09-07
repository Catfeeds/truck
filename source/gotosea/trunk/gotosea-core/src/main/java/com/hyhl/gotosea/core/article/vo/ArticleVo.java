package com.hyhl.gotosea.core.article.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ArticleVo {
    private Integer id;

    private String summary; //概要

    private Integer businessUnitId;

    private String businessUnitName;    //业务线名称

    private String title;

    private String htmlFile;    //正文

    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date releaseDate;

    private  Integer readQuantity;

    private String thumbnail;   //缩略图

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private  Integer thumbQuantity;

    private Integer status;

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public String getReleaseDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(this.releaseDate);
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

    public String getHtmlFile() {
        return htmlFile;
    }

    public void setHtmlFile(String htmlFile) {
        this.htmlFile = htmlFile;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }
}
