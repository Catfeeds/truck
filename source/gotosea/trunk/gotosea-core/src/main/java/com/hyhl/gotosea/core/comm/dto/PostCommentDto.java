package com.hyhl.gotosea.core.comm.dto;


import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

public class PostCommentDto {
    private Long id;

    @NotNull(message = "帖子id不能为空")
    private Long postId;    //帖子id

    private String custId;  //被回复人id

    private Long pid;

    @NotBlank(message = "评论内容不能为空")
    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
