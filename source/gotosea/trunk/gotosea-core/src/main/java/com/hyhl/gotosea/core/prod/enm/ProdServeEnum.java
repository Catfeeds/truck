package com.hyhl.gotosea.core.prod.enm;

/**
 * @author Leslie.Lam
 * @create 2017-07-31 10:17
 **/
public enum ProdServeEnum {

    单品(1),线路(2),套餐(3),

    海岛游(2001,2),海钓(2002,2),
    租船(1001,1),饵料(1002,1),住宿(1003,1),餐饮(1004,1),烧烤(1005,1),露营(1006,1),潜水(1007,1),

    有所属商家(new Integer[]{租船.code(),饵料.code(),住宿.code(),餐饮.code(),烧烤.code(),露营.code(),潜水.code()}),

    不可用(0),可用(1);
    private Integer code;

    private Integer category;

    private Integer[] types;

    ProdServeEnum(Integer code) {
        this.code = code;
    }

    ProdServeEnum(Integer code, Integer category) {
        this.code = code;
        this.category = category;
    }

    public Integer code() {
        return code;
    }

    public Integer category() {
        return category;
    }

    ProdServeEnum(Integer[] types) {
        this.types = types;
    }

    public Integer[] types() {
        return types;
    }

    public void setTypes(Integer[] types) {
        this.types = types;
    }
}
