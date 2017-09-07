package com.hyhl.gotosea.core.article.po;

import javax.persistence.*;
import java.util.Date;

@Table(name="t_article_thumb")
public class ArticleThumb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thumb_id")
    private Integer thumbId;

    @Column(name = "article_id")
    private Integer articleId;

    @Column(name = "cust_id")
    private String custId;

    @Column(name = "thumb_time")
    private Date thumbTime;

    public Integer getThumbId() {
        return thumbId;
    }

    public void setThumbId(Integer thumbId) {
        this.thumbId = thumbId;
    }

    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Date getThumbTime() {
        return thumbTime;
    }

    public void setThumbTime(Date thumbTime) {
        this.thumbTime = thumbTime;
    }
}
