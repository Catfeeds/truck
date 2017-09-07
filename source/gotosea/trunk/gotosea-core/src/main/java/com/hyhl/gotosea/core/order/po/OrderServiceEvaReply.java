package com.hyhl.gotosea.core.order.po;


import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Table(name = "t_order_service_eva_reply")
public class OrderServiceEvaReply {
    @Id
    @Column(name = "reply_id")
    private Long replyId;

    @Column(name = "order_service_eva_id")
    private Long orderServiceEvaId;

    @Column(name = "reply_content")
    private String replyContent;

    @Column(name = "reply_time")
    private Date replyTime;

    @Column(name = "cust_id")
    private String custId;

    /**
     * @return reply_id
     */
    public Long getReplyId() {
        return replyId;
    }

    /**
     * @param replyId
     */
    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    /**
     * @return order_service_eva_id
     */
    public Long getOrderServiceEvaId() {
        return orderServiceEvaId;
    }

    /**
     * @param orderServiceEvaId
     */
    public void setOrderServiceEvaId(Long orderServiceEvaId) {
        this.orderServiceEvaId = orderServiceEvaId;
    }

    /**
     * @return reply_content
     */
    public String getReplyContent() {
        return replyContent;
    }

    /**
     * @param replyContent
     */
    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent == null ? null : replyContent.trim();
    }

    /**
     * @return reply_time
     */
    public Date getReplyTime() {
        return replyTime;
    }

    /**
     * @param replyTime
     */
    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
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
}
