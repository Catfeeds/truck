package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_order_service_evaluation")
public class OrderServeEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_service_id")
    private Long orderServiceId;    //订单服务Id

    private Integer grade;  //评分

    @Column(name = "cust_id")
    private String custId;

    @Column(name = "evaluation_content")
    private String evaluationContent;   //评价内容

    @Column(name = "evaluation_time")
    private Date evaluationTime;    //评价时间

    @Column(name = "attachment_num")
    private Integer attachmentNum;  //附件数量

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderServiceId() {
        return orderServiceId;
    }

    public void setOrderServiceId(Long orderServiceId) {
        this.orderServiceId = orderServiceId;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public String getEvaluationContent() {
        return evaluationContent;
    }

    public void setEvaluationContent(String evaluationContent) {
        this.evaluationContent = evaluationContent;
    }

    public Date getEvaluationTime() {
        return evaluationTime;
    }

    public void setEvaluationTime(Date evaluationTime) {
        this.evaluationTime = evaluationTime;
    }

    public Integer getAttachmentNum() {
        return attachmentNum;
    }

    public void setAttachmentNum(Integer attachmentNum) {
        this.attachmentNum = attachmentNum;
    }
}
