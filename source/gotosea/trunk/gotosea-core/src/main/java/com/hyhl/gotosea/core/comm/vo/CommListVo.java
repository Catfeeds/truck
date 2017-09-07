package com.hyhl.gotosea.core.comm.vo;

import java.util.Date;

public class CommListVo {
    //都需要的内容
    private CustCommVo custCommVo;
    private Integer businessUnitId;  //业务线id
    private Integer thumbsNum;  //点赞数量
    private Integer commentsNum;    //评论数量
    private String postLocation;    //发布位置
    private Integer favoriteNum;    //收藏数量
    private Boolean isThumb;    //是否点赞过
    private Boolean isFavorite; //是否收藏过
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

    public Boolean getIsThumb() {
        return isThumb;
    }

    public void setIsThumb(Boolean thumb) {
        isThumb = thumb;
    }

    public Boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(Boolean favorite) {
        isFavorite = favorite;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }
}
