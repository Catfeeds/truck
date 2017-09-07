package com.hyhl.gotosea.core.comm.enm;

public enum PostCondEnum {
    我的帖子(1),
    我收藏的帖子(2)
    ;
    PostCondEnum(Integer code){
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
