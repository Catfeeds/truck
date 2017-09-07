package com.hyhl.gotosea.core.prod.dto;

import java.util.List;

/**
* 接收服务列表查询参数
* @author Leslie.Lam
* @create 2017-07-31 16:34
**/
public class AppSelectServe {

    private boolean hot;//是否查询热门线路

    private List<Integer> ids;

    private Integer category;//服务类别

    private String word;//搜索关键字

    private Integer type;//服务业务类型

    private Integer[] city;//市id

    private String areaStr;//区域id组成的字符串，逗号隔开

    private Integer orderType=0;//排序类型，默认0按时间倒序，1按好评倒序，2按人气最高

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

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

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public String getAreaStr() {
        return areaStr;
    }

    public void setAreaStr(String areaStr) {
        this.areaStr = areaStr;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public boolean isHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }
}
