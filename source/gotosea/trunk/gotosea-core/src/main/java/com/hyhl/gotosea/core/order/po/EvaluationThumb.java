package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_evaluation_thumbs")
public class EvaluationThumb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "evaluation_id")
    private Long evaluationId;

    private Integer status;

    @Column(name = "cust_id")
    private String custId;

    @Column(name = "thumb_time")
    private Date thumbTime;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getEvaluationId() {
        return evaluationId;
    }

    public void setEvaluationId(Long evaluationId) {
        this.evaluationId = evaluationId;
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
