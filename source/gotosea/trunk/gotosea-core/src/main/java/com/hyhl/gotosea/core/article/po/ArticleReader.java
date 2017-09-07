package com.hyhl.gotosea.core.article.po;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Table(name="t_article_reader")
public class ArticleReader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cust_id")
    private String custId;

    @Column(name = "article_id")
    private Long articleId;

    @Column(name = "read_time")
    private Date readTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Date getReadTime() {
        return readTime;
    }

    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }
}
