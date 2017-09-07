package com.hyhl.gotosea.core.comm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.comm.po.TPostAttachment;

import java.util.Date;
import java.util.List;

public class PostListVo extends CommListVo{
    //帖子需要内容
    private Long id;    //帖子Id
    private String content; //内容
    private List<TPostAttachment> postAttachments;//附件内容
    private Long activityId;    //活动id (TActivity里是id)

    //活动内容
    private ActivityListVo activityListVo;

    public ActivityListVo getActivityListVo() {
        return activityListVo;
    }

    public void setActivityListVo(ActivityListVo activityListVo) {
        this.activityListVo = activityListVo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

}
