package com.hyhl.gotosea.core.comm.enm;

public enum  ActivityStatusEnum {
    待发布(0,"待发布"),
    已发布(1,"已发布"),
    已确认(2,"已确认"),
    已下订待出行(3,"已下订待出行"),
    行程中(4,"行程中"),
    已结束(5,"已结束"),
    已撤销(100,"已撤销")
    ;
    private Integer code;
    private String name;

    ActivityStatusEnum(Integer code,String name){
        this.code=code;
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static ActivityStatusEnum getByCode(Integer code) {
        for (ActivityStatusEnum activityStatusEnum : values()) {   //values是代表所有当前对象
            if (activityStatusEnum.getCode() == code) {
                return activityStatusEnum;
            }
        }
        return null;
    }
}
