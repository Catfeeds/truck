package com.hyhl.gotosea.console.prod.dto;

import com.hyhl.gotosea.core.prod.po.SalesPlan;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-21 10:11
**/
public class ServeSalePlan {

    @NotNull
    private Integer serviceId;

    @Valid
    @NotNull
    private List<SalesPlan> plans;//销售计划

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public List<SalesPlan> getPlans() {
        return plans;
    }

    public void setPlans(List<SalesPlan> plans) {
        this.plans = plans;
    }
}
