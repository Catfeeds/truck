package com.hyhl.gotosea.core.order.vo;

public class ActivityServePrice {
    private Integer aaCostPrice;  //成本价格
    private Integer aaMarketPrice;    //市场价格
    private Integer aaPreferPrice;    //优惠价格

    private Integer optCostPrice;
    private Integer optMarketPrice;
    private Integer optPreferPrice;

    public Integer getAaCostPrice() {
        return aaCostPrice;
    }

    public void setAaCostPrice(Integer aaCostPrice) {
        this.aaCostPrice = aaCostPrice;
    }

    public Integer getAaMarketPrice() {
        return aaMarketPrice;
    }

    public void setAaMarketPrice(Integer aaMarketPrice) {
        this.aaMarketPrice = aaMarketPrice;
    }

    public Integer getAaPreferPrice() {
        return aaPreferPrice;
    }

    public void setAaPreferPrice(Integer aaPreferPrice) {
        this.aaPreferPrice = aaPreferPrice;
    }

    public Integer getOptCostPrice() {
        return optCostPrice;
    }

    public void setOptCostPrice(Integer optCostPrice) {
        this.optCostPrice = optCostPrice;
    }

    public Integer getOptMarketPrice() {
        return optMarketPrice;
    }

    public void setOptMarketPrice(Integer optMarketPrice) {
        this.optMarketPrice = optMarketPrice;
    }

    public Integer getOptPreferPrice() {
        return optPreferPrice;
    }

    public void setOptPreferPrice(Integer optPreferPrice) {
        this.optPreferPrice = optPreferPrice;
    }
}
