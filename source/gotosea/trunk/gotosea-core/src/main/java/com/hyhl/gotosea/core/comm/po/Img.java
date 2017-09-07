package com.hyhl.gotosea.core.comm.po;

public class Img {
    private Integer attachmentType; //附件类型 1 图片 2 视频
    private String thumbnail;   //缩略图地址
    private String original;    //原图地址

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
