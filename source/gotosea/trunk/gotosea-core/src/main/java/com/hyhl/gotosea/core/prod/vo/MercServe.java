package com.hyhl.gotosea.core.prod.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.ServeTagSerializer;

import java.util.List;

/**
* 商家资源服务列表vo
* @author Leslie.Lam
* @create 2017-08-03 14:41
**/
public class MercServe {

    private Integer id;

    private String name;

    private Integer soldNum;

    private Integer serviceTypeId;

    private String price;

    @JsonSerialize(using = ServeTagSerializer.class)
    private List<Integer> tags;

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

    public Integer getSoldNum() {
        return soldNum;
    }

    public void setSoldNum(Integer soldNum) {
        this.soldNum = soldNum;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
