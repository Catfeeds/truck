package com.hyhl.gotosea.core.order.dto;

public class EvaluationAttachmentDto {
    private Integer attachment_type;    //附件类型
    private String thumbnail;   //缩略图
    private String original;    //原件

    public Integer getAttachment_type() {
        return attachment_type;
    }

    public void setAttachment_type(Integer attachment_type) {
        this.attachment_type = attachment_type;
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
