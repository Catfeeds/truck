package com.hyhl.gotosea.core.comm.vo;

import com.hyhl.gotosea.core.common.annotation.FeatureTag;

import java.util.List;

public class CustEvaVo {
    private String id;  //id
    private String name;    //客户名称
    private String picture; //头像
    private Integer level;  //等级
    @FeatureTag
    private List<Integer> tags;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }
}
