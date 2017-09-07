package com.hyhl.gotosea.core.prod.dto;

import java.util.List;

public class MerchResourceDelDto {
    private List<Integer> ids;
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }
}
