package com.hyhl.gotosea.core.order.po;

import java.io.Serializable;

import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name = "t_coupon_type")
public class CouponType implements Serializable {
    /**
     * 1--代金券
            2--满减券
     */
    private Integer id;

    private String name;

    private String remark;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}