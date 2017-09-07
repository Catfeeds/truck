package com.hyhl.gotosea.core.prod.po;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Table(name = "t_banner")
public class Banner {
    @Id
    private String id;

    @Column(name = "img_url")
    private String imgUrl;  //广告图片url

    @Column(name = "img_link")
    private String imgLink; //广告链接url

    @Column(name = "title_desc")
    private String titleDesc;    //标题描述

    @Column(name = "sort_order")
    private Integer sortOrder;  //排序

    @Column(name = "is_hidden")
    private Byte isHidden;  //是否隐藏

    @Column(name = "is_delete")
    private Byte isDelete;  //是否删除

    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;    //创建时间

    private String creator; //创建人

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }

    public String getTitleDesc() {
        return titleDesc;
    }

    public void setTitleDesc(String titleDesc) {
        this.titleDesc = titleDesc;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Byte getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(Byte isHidden) {
        this.isHidden = isHidden;
    }

    public Byte getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Byte isDelete) {
        this.isDelete = isDelete;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }
}
