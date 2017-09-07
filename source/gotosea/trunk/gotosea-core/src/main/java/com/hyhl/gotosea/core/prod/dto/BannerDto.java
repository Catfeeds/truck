package com.hyhl.gotosea.core.prod.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

public class BannerDto {
    @NotBlank(message = "imgUrl不能为空")
    private String imgUrl;  //图片url

    @NotBlank(message = "imgLink不能为空")
    private String imgLink; //跳转链接

    @NotBlank(message = "titleDesc不能为空")
    private String titleDesc;    //标题描述

    @NotNull(message = "sortOrder不能为空")
    private Integer sortOrder;  //排序

    private String creator;

    public String getTitleDesc() {
        return titleDesc;
    }

    public void setTitleDesc(String titleDesc) {
        this.titleDesc = titleDesc;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
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

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
