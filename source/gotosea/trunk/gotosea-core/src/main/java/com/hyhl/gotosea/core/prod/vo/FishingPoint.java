package com.hyhl.gotosea.core.prod.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hyhl.gotosea.core.common.annotation.Locator;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.annotation.NumberConvert;

/**
* 
* @author Leslie.Lam
* @create 2017-08-18 14:08
**/
public class FishingPoint {

    @JsonProperty("key")
    private Integer id;

    @JsonProperty("value")
    private String name;

    @NumberConvert(divide = 100)
    private Integer preferPrice;

    @Locator
    private Integer locatorId;

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

    public Integer getLocatorId() {
        return locatorId;
    }

    public void setLocatorId(Integer locatorId) {
        this.locatorId = locatorId;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }
}
