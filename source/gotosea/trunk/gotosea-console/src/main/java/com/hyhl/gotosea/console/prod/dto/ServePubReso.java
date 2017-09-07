package com.hyhl.gotosea.console.prod.dto;

import com.hyhl.gotosea.core.prod.po.ServiePubReso;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-09-01 14:38
**/
public class ServePubReso {

    @NotNull
    private Integer serviceId;

    @NotNull
    @Valid
    List<ServiePubReso> pubResos;

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public List<ServiePubReso> getPubResos() {
        return pubResos;
    }

    public void setPubResos(List<ServiePubReso> pubResos) {
        this.pubResos = pubResos;
    }
}
