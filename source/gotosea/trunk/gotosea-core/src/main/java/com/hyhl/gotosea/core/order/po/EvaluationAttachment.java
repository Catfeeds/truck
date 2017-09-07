package com.hyhl.gotosea.core.order.po;

import java.io.Serializable;

import javax.persistence.*;

/**
 * @author guan.sj
 */
@Table(name = "t_evaluation_attachment")
public class EvaluationAttachment implements Serializable {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer attachmentId;

	@Column(name = "order_service_eva_id")
    private Long orderServiceEvaId;

	@Column(name = "attachment_type")
    private Integer attachmentType;

    private String thumbnail;

    private String original;

    private static final long serialVersionUID = 1L;

    public Integer getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(Integer attachmentId) {
        this.attachmentId = attachmentId;
    }

    public Long getOrderServiceEvaId() {
        return orderServiceEvaId;
    }

    public void setOrderServiceEvaId(Long orderServiceEvaId) {
        this.orderServiceEvaId = orderServiceEvaId;
    }

    public Integer getAttachmentType() {
        return attachmentType;
    }

    public void setAttachmentType(Integer attachmentType) {
        this.attachmentType = attachmentType;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }
}