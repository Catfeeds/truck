package com.hyhl.gotosea.core.prod.po;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* 服务类型
* @author Leslie.Lam
* @create 2017-07-27 14:49
**/
@Table(name = "t_service_type")
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("key")
    private Integer id;

    @JsonProperty("value")
    private String name;

    @JsonIgnore
    private Integer category;//服务类别（单品/套餐/线路）

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

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

}
