package com.hyhl.gotosea.core.order.vo;

public class EvaluationAttachmentVo {
    private Integer attachmentType; //附件类型
    private String thumbnail;   //缩略图
    private String original;    //原件

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
