package com.hyhl.gotosea.core.order.enm;

import java.util.Objects;

/**
 * @author Leslie.Lam
 * @create 2017-07-31 10:17
 **/
public enum MercOrderEnum {

    /** 订单处理类型 */
    接单(1),执行订单(2),收款(3),撤单(4),


    /** 订单状态 */
    待接单(1,"status"),已接单待执行(2,"status"),已执行待收款(3,"status"), 已关闭已收款(4,"status"),已撤销(5,"status"),

    /** 订单状态和处理类型组合 */
    接单待执行(已接单待执行.code,接单.code),
    执行待收款(已执行待收款.code,执行订单.code),
    关闭已收款(已关闭已收款.code,收款.code),
    撤销订单(已撤销.code,撤单.code)
    ;

    private Integer code;

    private String field;

    private Integer status;

    private Integer processType;

    MercOrderEnum(Integer code) {
        this.code = code;
    }

    MercOrderEnum(Integer code, String field) {
        this.code = code;
        this.field = field;
    }

    MercOrderEnum(Integer status, Integer processType) {
        this.status = status;
        this.processType = processType;
    }

    public Integer code() {
        return code;
    }

    public Integer getStatus() {
        return status;
    }

    public Integer getProcessType() {
        return processType;
    }

    public String field() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public static String find(String field, Integer code){
        MercOrderEnum[] values = values();
        for (MercOrderEnum v: values){
            if (Objects.equals(field,v.field())&&Objects.equals(v.code(),code))return v.name();
        }
        return null;
    }
}
