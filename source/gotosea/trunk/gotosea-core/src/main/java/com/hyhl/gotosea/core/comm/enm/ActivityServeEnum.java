package com.hyhl.gotosea.core.comm.enm;

public enum  ActivityServeEnum {
    AA项目(1),
    自选项目(2);
    private Integer code;

    ActivityServeEnum(Integer code){
        this.code=code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
