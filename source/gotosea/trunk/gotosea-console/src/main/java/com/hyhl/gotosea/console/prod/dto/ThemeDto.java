package com.hyhl.gotosea.console.prod.dto;

import org.hibernate.validator.constraints.NotBlank;

/**
* 
* @author Leslie.Lam
* @create 2017-09-07 9:33
**/
public class ThemeDto {

    private Integer id;

    @NotBlank(message = "主题名称不能为空")
    private String name;

    @NotBlank(message = "图片路径不能为空")
    private String picture;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
