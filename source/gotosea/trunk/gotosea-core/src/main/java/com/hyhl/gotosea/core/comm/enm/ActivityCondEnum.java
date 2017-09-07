package com.hyhl.gotosea.core.comm.enm;

public enum ActivityCondEnum {
    我的活动(1),    //我发起的活动，我参加的活动
    我收藏的活动(2)
    ;
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    ActivityCondEnum(Integer code){
        this.code = code;
    }
}
