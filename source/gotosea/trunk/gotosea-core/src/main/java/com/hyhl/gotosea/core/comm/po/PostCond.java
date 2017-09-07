package com.hyhl.gotosea.core.comm.po;

public class PostCond {
    private Integer sectionId;  //0 推荐 1 动态分享 2 活动约伴
    private Long id;
    private Integer bizId;  //业务线id (0 全部)
    private String postCustId;  //发帖人id (通过该id来列举其发的帖子)
    private String visitorId;   //来访者id(通过SessionUser获取; 用于 帖子是否仅好友可见// )


    public String getPostCustId() {
        return postCustId;
    }

    public void setPostCustId(String postCustId) {
        this.postCustId = postCustId;
    }

    public String getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(String visitorId) {
        this.visitorId = visitorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public Integer getBizId() {
        return bizId;
    }

    public void setBizId(Integer bizId) {
        this.bizId = bizId;
    }
}
