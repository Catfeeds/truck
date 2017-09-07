package com.hyhl.gotosea.core.comm.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.util.List;

public class PostDto extends Commdto{
    private Long id;

    @NotBlank
    private String content; //内容

    private List<PostAttachmentDto> attachmentDtos; //附件dto

    public List<PostAttachmentDto> getAttachmentDtos() {
        return attachmentDtos;
    }

    public void setAttachmentDtos(List<PostAttachmentDto> attachmentDtos) {
        this.attachmentDtos = attachmentDtos;
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

}
