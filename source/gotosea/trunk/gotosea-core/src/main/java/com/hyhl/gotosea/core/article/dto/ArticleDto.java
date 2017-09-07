package com.hyhl.gotosea.core.article.dto;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class ArticleDto {

    private Integer id;

    @NotNull(message = "业务线id不能为空")
    private Integer businessUnitId; //业务单元businessUnitId

    @NotBlank(message = "标题不能为空")
    private String title;   //标题

    @NotBlank(message = "概要不能为空")
    private String summary; //概要

    @NotBlank(message = "缩略图不能为空")
    private String thumbnail;   //缩略图

//    @NotNull(message = "日期不能为空")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    private Date releaseDate;

    private String author;  //作者

    @NotBlank(message = "正文不能为空")
    private String htmlFile;    //正文

//    @NotNull(message = "状态不能为空")
    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getHtmlFile() {
        return htmlFile;
    }

    public void setHtmlFile(String htmlFile) {
        this.htmlFile = htmlFile;
    }


}
