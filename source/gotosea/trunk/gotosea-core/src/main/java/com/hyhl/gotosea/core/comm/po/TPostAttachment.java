package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;

@Table(name = "t_post_attachment")
public class TPostAttachment {
    @Id
    @Column(name = "attachment_id")
    private Integer attachmentId;

    @Column(name = "post_id")
    private Long postId;

    /**
     * 0-图片
     * 1-视频
     */
    @Column(name = "attachment_type")
    private Integer attachmentType;

    private String thumbnail;//缩略图

    private String original;//原图

    /**
     * @return attachment_id
     */
    public Integer getAttachmentId() {
        return attachmentId;
    }

    /**
     * @param attachmentId
     */
    public void setAttachmentId(Integer attachmentId) {
        this.attachmentId = attachmentId;
    }

    /**
     * @return post_id
     */
    public Long getPostId() {
        return postId;
    }

    /**
     * @param postId
     */
    public void setPostId(Long postId) {
        this.postId = postId;
    }

    /**
     * 获取0-图片
            1-视频
     *
     * @return attachment_type - 0-图片
            1-视频
     */
    public Integer getAttachmentType() {
        return attachmentType;
    }

    /**
     * 设置0-图片
            1-视频
     *
     * @param attachmentType 0-图片
            1-视频
     */
    public void setAttachmentType(Integer attachmentType) {
        this.attachmentType = attachmentType;
    }

    /**
     * @return thumbnail
     */
    public String getThumbnail() {
        return thumbnail;
    }

    /**
     * @param thumbnail
     */
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail == null ? null : thumbnail.trim();
    }

    /**
     * @return original
     */
    public String getOriginal() {
        return original;
    }

    /**
     * @param original
     */
    public void setOriginal(String original) {
        this.original = original == null ? null : original.trim();
    }
}