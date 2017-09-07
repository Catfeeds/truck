package com.hyhl.gotosea.core.cust.dto;

/**
* 接收分页查询商家参数
* @author Leslie.Lam
* @create 2017-08-04 17:58
**/
public class SelectMerchant {

    private Integer type;//商家资源类型

    private String custIds;//区域id组成的字符串，逗号隔开

    private Integer[] city;//市id

    private String areaStr;//区域id组成的字符串，逗号隔开

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer[] getCity() {
        return city;
    }

    public void setCity(Integer[] city) {
        this.city = city;
    }

    public String getAreaStr() {
        return areaStr;
    }

    public void setAreaStr(String areaStr) {
        this.areaStr = areaStr;
    }

    public String getCustIds() {
        return custIds;
    }

    public void setCustIds(String custIds) {
        this.custIds = custIds;
    }
}
