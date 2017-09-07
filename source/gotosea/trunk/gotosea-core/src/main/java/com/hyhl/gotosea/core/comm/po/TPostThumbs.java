package com.hyhl.gotosea.core.comm.po;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_post_thumbs")
public class TPostThumbs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "cust_id")
    private String custId;

    @Column(name = "thumb_time")
    private Date thumbTime;

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
     * @return thumb_time
     */
    public Date getThumbTime() {
        return thumbTime;
    }

    /**
     * @param thumbTime
     */
    public void setThumbTime(Date thumbTime) {
        this.thumbTime = thumbTime;
    }
}