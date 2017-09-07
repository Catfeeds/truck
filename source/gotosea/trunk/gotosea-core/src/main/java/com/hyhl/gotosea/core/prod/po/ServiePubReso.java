package com.hyhl.gotosea.core.prod.po;

import com.hyhl.gotosea.core.common.annotation.Money;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
* 
* @author Leslie.Lam
* @create 2017-08-14 16:05
**/
@Table(name = "t_service_pub_resource")
public class ServiePubReso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "资源id不能为空")
    private Integer pubResourceId;

    private Integer serviceId;

    @NotNull(message = "市场价不能为空")
    @Money
    private Integer marketPrice;//市场价

    @NotNull(message = "优惠价不能为空")
    @Money
    private Integer preferPrice;//优惠价

    @NotNull(message = "成本价不能为空")
    @Money
    private Integer costPrice;//成本价

    public ServiePubReso() {
    }

    public ServiePubReso(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public ServiePubReso(Integer pubResourceId, Integer serviceId) {
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
}
