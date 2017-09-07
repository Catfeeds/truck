package com.hyhl.gotosea.core.prod.po;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* 商家资源类型
* @author Leslie.Lam
* @create 2017-07-27 14:51
**/
@Table(name = "t_merchant_resource_type")
public class MerchantResourceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("key")
    private Integer id;

    @JsonProperty("value")
    private String name;

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
