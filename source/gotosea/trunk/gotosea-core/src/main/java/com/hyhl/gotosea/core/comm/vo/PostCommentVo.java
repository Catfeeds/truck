package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class PostCommentVo {
    private Long id;
    private Long postId;    //帖子id
    private CustCommVo cust;  //评论人/回复人
    private Long pid;   //上一条评论id
    private String pidContent;  //上一条回复内容
    private CustCommVo pidCust;   //上一条回复的用户id
    private String content;

//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date commentTime;

    public String getPidContent() {
        return pidContent;
    }

    public void setPidContent(String pidContent) {
        this.pidContent = pidContent;
    }

    public Date getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public CustCommVo getCust() {
        return cust;
    }

    public void setCust(CustCommVo cust) {
        this.cust = cust;
    }

    public CustCommVo getPidCust() {
        return pidCust;
    }

    public void setPidCust(CustCommVo pidCust) {
        this.pidCust = pidCust;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
