package com.hyhl.gotosea.core.comm.vo;

import java.util.Date;

public class CommVo {
    private CustCommVo custCommVo;  //发帖人信息
    private Integer businessUnitId;  //业务线id
    private Integer thumbsNum;  //点赞数量
    private Integer commentsNum;    //评论数量
    private String postLocation;    //发布位置
    private Integer favoriteNum;    //收藏数量
    private Date postTime;    //发布时间
    private Boolean isSelf; //是否是自己发的

    public Boolean getIsSelf() {
        return isSelf;
    }

    public void setIsSelf(Boolean self) {
        isSelf = self;
    }

    public CustCommVo getCustCommVo() {
        return custCommVo;
    }

    public void setCustCommVo(CustCommVo custCommVo) {
        this.custCommVo = custCommVo;
    }

    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }

    public Integer getThumbsNum() {
        return thumbsNum;
    }

    public void setThumbsNum(Integer thumbsNum) {
        this.thumbsNum = thumbsNum;
    }

    public Integer getCommentsNum() {
        return commentsNum;
    }

    public void setCommentsNum(Integer commentsNum) {
        this.commentsNum = commentsNum;
    }

    public String getPostLocation() {
        return postLocation;
    }

    public void setPostLocation(String postLocation) {
        this.postLocation = postLocation;
    }

    public Integer getFavoriteNum() {
        return favoriteNum;
    }

    public void setFavoriteNum(Integer favoriteNum) {
        this.favoriteNum = favoriteNum;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }
}
