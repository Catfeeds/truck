package com.hyhl.gotosea.core.comm.enm;

public enum  PostEnum {
    动态分享(1),
    活动约伴(2)
    ;

    PostEnum(Integer code){
        this.code = code;
    }
    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
