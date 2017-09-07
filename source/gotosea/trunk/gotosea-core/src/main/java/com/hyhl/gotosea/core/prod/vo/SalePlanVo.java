package com.hyhl.gotosea.core.prod.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-01 18:03
**/
public class SalePlanVo {

    private Integer id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date offerDate;

    private Integer preferPrice;

    public Date getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(Date offerDate) {
        this.offerDate = offerDate;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
