package com.hyhl.gotosea.core.prod.dto;

/**
* 
* @author Leslie.Lam
* @create 2017-08-23 12:37
**/
public class PriceDto {

    private Integer costPrice;

    private Integer preferPrice;

    private Integer marketPrice;

    private Integer num;//购买数量

    public Integer getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Integer costPrice) {
        this.costPrice = costPrice;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Integer marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
