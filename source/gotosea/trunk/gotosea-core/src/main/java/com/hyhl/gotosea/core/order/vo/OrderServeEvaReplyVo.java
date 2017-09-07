package com.hyhl.gotosea.core.order.vo;

import com.hyhl.gotosea.core.comm.vo.CustCommVo;

import java.util.Date;

public class OrderServeEvaReplyVo {
    private Long replyId;

    private Long orderServiceEvaId;

    private String replyContent;

    private Date replyTime;

    private CustCommVo custCommVo;

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public Long getOrderServiceEvaId() {
        return orderServiceEvaId;
    }

    public void setOrderServiceEvaId(Long orderServiceEvaId) {
        this.orderServiceEvaId = orderServiceEvaId;
    }

    public String getReplyContent() {
        return replyContent;
    }

    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }

    public Date getReplyTime() {
        return replyTime;
    }

    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
    }

    public CustCommVo getCustCommVo() {
        return custCommVo;
    }

    public void setCustCommVo(CustCommVo custCommVo) {
        this.custCommVo = custCommVo;
    }
}
