package com.hyhl.gotosea.core.prod.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Table(name = "t_pub_resource_price")
public class PubResourcePrice implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    private Integer serviceSalesPlanId;//服务销售计划id

    private Integer pubResourceId;//公共资源id

    @NotNull(message = "市场价不能为空")
    private Integer marketPrice;//市场价

    @NotNull(message = "优惠价不能为空")
    private Integer preferPrice;//优惠价

    @NotNull(message = "成本价不能为空")
    private Integer costPrice;//成本价

    public PubResourcePrice() {
    }

    public PubResourcePrice(Integer serviceSalesPlanId, Integer pubResourceId) {
        this.serviceSalesPlanId = serviceSalesPlanId;
        this.pubResourceId = pubResourceId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceSalesPlanId() {
        return serviceSalesPlanId;
    }

    public void setServiceSalesPlanId(Integer serviceSalesPlanId) {
        this.serviceSalesPlanId = serviceSalesPlanId;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
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