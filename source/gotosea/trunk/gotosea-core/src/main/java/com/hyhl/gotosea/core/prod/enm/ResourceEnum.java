package com.hyhl.gotosea.core.prod.enm;

/**
 * @author Leslie.Lam
 * @create 2017-07-31 10:17
 **/
public enum ResourceEnum {

    目的地(1001),钓点(1002),海滩(1003),营地目的地(1004),景点目的地(1005),码头目的地(1006),其他目的地(1007),

    不可用(0),可用(1);
    private Integer code;

    ResourceEnum(Integer code) {
        this.code = code;
    }

    public Integer code() {
        return code;
    }
}
