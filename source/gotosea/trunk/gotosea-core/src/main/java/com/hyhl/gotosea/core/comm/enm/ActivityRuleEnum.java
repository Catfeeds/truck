package com.hyhl.gotosea.core.comm.enm;

public enum  ActivityRuleEnum {
    订单已付款(1),
    订单申请退款(2),
    订单撤销申请退款(3);
    private Integer code;

    ActivityRuleEnum(Integer code){
        this.code = code;
    }

    public Integer code() {
        return code;
    }

    public static ActivityRuleEnum findEnum(int code){
        ActivityRuleEnum[] values = values();
        for(ActivityRuleEnum value : values){
            if(value.code()==code)return value;
        }
        return null;
    }
}
