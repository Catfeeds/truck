package com.hyhl.gotosea.core.comm.po;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_post_comment")
public class TPostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "cust_id")
    private String custId;

    private Long pid;

    private String content;

    @Column(name = "comment_time")
    private Date commentTime;

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
     * @return post_id
     */
    public Long getPostId() {
        return postId;
    }

    /**
     * @param postId
     */
    public void setPostId(Long postId) {
        this.postId = postId;
    }

    /**
     * @return cust_id
     */
    public String getCustId() {
        return custId;
    }

    /**
     * @param custId
     */
    public void setCustId(String custId) {
        this.custId = custId == null ? null : custId.trim();
    }

    /**
     * @return pid
     */
    public Long getPid() {
        return pid;
    }

    /**
     * @param pid
     */
    public void setPid(Long pid) {
        this.pid = pid;
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
     * @return comment_time
     */
    public Date getCommentTime() {
        return commentTime;
    }

    /**
     * @param commentTime
     */
    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }
}