package com.hyhl.gotosea.core.article.po;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Table(name="t_article")
public class Article implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "business_unit_id")
    private Integer businessUnitId; //业务线id

    private String title;

    private String summary; //概要

    private String thumbnail;  //缩略图

    @Column(name = "release_date")  //发布日期
    private Date releaseDate;

    private String author;

    @Column(name = "read_quantity") //阅读量
    private  Integer readQuantity;

    @Column(name = "thumb_quantity")    //点赞量
    private  Integer thumbQuantity;

    @Column(name = "html_file") //正文
    private String htmlFile;

    private  Integer status; //状态

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", businessUnitId=" + businessUnitId +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", thumbnail=" + thumbnail +
                ", releaseDate=" + releaseDate +
                ", author='" + author + '\'' +
                ", readQuantity=" + readQuantity +
                ", thumbQuantity=" + thumbQuantity +
                ", htmlFile='" + htmlFile + '\'' +
                ", status=" + status +
                '}';
    }
}
