package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.comm.po.TPostAttachment;

import java.util.Date;
import java.util.List;

public class PostVo extends CommVo{

    //帖子需要内容
    private Long postId;    //帖子Id
    private String content; //内容
    private List<TPostAttachment> postAttachments;//附件内容

    //活动内容
    private ActivityVo activityVo;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<TPostAttachment> getPostAttachments() {
        return postAttachments;
    }

    public void setPostAttachments(List<TPostAttachment> postAttachments) {
        this.postAttachments = postAttachments;
    }

    public ActivityVo getActivityVo() {
        return activityVo;
    }

    public void setActivityVo(ActivityVo activityVo) {
        this.activityVo = activityVo;
    }
}
