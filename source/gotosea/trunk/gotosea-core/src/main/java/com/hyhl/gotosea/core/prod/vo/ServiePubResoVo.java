package com.hyhl.gotosea.core.prod.vo;

import com.hyhl.gotosea.core.common.annotation.Money;

/**
* 
* @author Leslie.Lam
* @create 2017-08-14 16:05
**/
public class ServiePubResoVo {

    private Integer id;

    private Integer pubResourceId;

    private Integer serviceId;

    private String name;//资源名称

    @Money
    private Integer marketPrice;//市场价

    @Money
    private Integer preferPrice;//优惠价

    @Money
    private Integer costPrice;//成本价

    public ServiePubResoVo() {
    }

    public ServiePubResoVo(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public ServiePubResoVo(Integer pubResourceId, Integer serviceId) {
        this.pubResourceId = pubResourceId;
        this.serviceId = serviceId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Integer marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Integer costPrice) {
        this.costPrice = costPrice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
