package com.hyhl.gotosea.core.order.dto;

import com.hyhl.gotosea.core.order.po.EvaluationAttachment;

import java.util.List;

public class EvaluationDto {
    private Long orderServiceId;    //订单服务id
    private Integer grade;  //评分
    private String evaluationContent;//评价内容
    private List<EvaluationAttachmentDto> evaluationAttachmentDtos; //附件
    private List<Integer> tagIds;

    public List<Integer> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Integer> tagIds) {
        this.tagIds = tagIds;
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

    public List<EvaluationAttachmentDto> getEvaluationAttachmentDtos() {
        return evaluationAttachmentDtos;
    }

    public void setEvaluationAttachmentDtos(List<EvaluationAttachmentDto> evaluationAttachmentDtos) {
        this.evaluationAttachmentDtos = evaluationAttachmentDtos;
    }
}
