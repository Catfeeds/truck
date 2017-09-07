package com.hyhl.gotosea.core.comm.po;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_post")
public class TPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "JDBC")
    private Long id;

    @Column(name = "cust_id")
    private String custId;

    private String content;

    @Column(name = "post_time")
    private Date postTime;

    @Column(name = "post_location")
    private String postLocation;

    @Column(name = "section_id")
    private Integer sectionId;

    @Column(name = "activity_id")
    private Long activityId;

    @Column(name = "attachment_num")
    private Integer attachmentNum;

    @Column(name = "thumbs_num")
    private Integer thumbsNum;

    @Column(name = "comments_num")
    private Integer commentsNum;

    @Column(name = "business_unit_id")
    private Integer businessUnitId;

    @Column(name = "favorite_num")
    private Integer favoriteNum;

    @Column(name = "only_for_mutual_fans")
    private Integer onlyForMutualFans;

    public Integer getFavoriteNum() {
        return favoriteNum;
    }

    public void setFavoriteNum(Integer favoriteNum) {
        this.favoriteNum = favoriteNum;
    }

    public Integer getOnlyForMutualFans() {
        return onlyForMutualFans;
    }

    public void setOnlyForMutualFans(Integer onlyForMutualFans) {
        this.onlyForMutualFans = onlyForMutualFans;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    /**
     * @return post_time
     */
    public Date getPostTime() {
        return postTime;
    }

    /**
     * @param postTime
     */
    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    /**
     * @return post_location
     */
    public String getPostLocation() {
        return postLocation;
    }

    /**
     * @param postLocation
     */
    public void setPostLocation(String postLocation) {
        this.postLocation = postLocation == null ? null : postLocation.trim();
    }

    /**
     * @return section_id
     */
    public Integer getSectionId() {
        return sectionId;
    }

    /**
     * @param sectionId
     */
    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    /**
     * @return activity_id
     */
    public Long getActivityId() {
        return activityId;
    }

    /**
     * @param activityId
     */
    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    /**
     * @return attachment_num
     */
    public Integer getAttachmentNum() {
        return attachmentNum;
    }

    /**
     * @param attachmentNum
     */
    public void setAttachmentNum(Integer attachmentNum) {
        this.attachmentNum = attachmentNum;
    }

    /**
     * @return thumbs_num
     */
    public Integer getThumbsNum() {
        return thumbsNum;
    }

    /**
     * @param thumbsNum
     */
    public void setThumbsNum(Integer thumbsNum) {
        this.thumbsNum = thumbsNum;
    }

    /**
     * @return comments_num
     */
    public Integer getCommentsNum() {
        return commentsNum;
    }

    /**
     * @param commentsNum
     */
    public void setCommentsNum(Integer commentsNum) {
        this.commentsNum = commentsNum;
    }

    /**
     * @return business_unit_id
     */
    public Integer getBusinessUnitId() {
        return businessUnitId;
    }

    /**
     * @param businessUnitId
     */
    public void setBusinessUnitId(Integer businessUnitId) {
        this.businessUnitId = businessUnitId;
    }
}