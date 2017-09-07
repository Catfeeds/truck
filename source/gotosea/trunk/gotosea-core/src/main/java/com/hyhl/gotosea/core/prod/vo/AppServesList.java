package com.hyhl.gotosea.core.prod.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.annotation.OssPattern;
import com.hyhl.gotosea.core.common.serialize.ServeTagSerializer;

import java.util.List;

/**
* 服务列表
* @author Leslie.Lam
* @create 2017-07-31 11:33
**/
public class AppServesList {

    private Integer id;

    private Integer type;

    @OssPattern
    private String thumbnail;//缩略图路径

    private String name;

    private Integer price;

    private Integer soldNum;//已售数量

    private String destination;//目的地名

    private Integer category;//服务类别

    @JsonSerialize(using = ServeTagSerializer.class)
    private List<Integer> tags;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }

    public Integer getSoldNum() {
        return soldNum;
    }

    public void setSoldNum(Integer soldNum) {
        this.soldNum = soldNum;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
