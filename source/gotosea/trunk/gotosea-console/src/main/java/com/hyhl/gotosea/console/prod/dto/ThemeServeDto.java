package com.hyhl.gotosea.console.prod.dto;

import javax.validation.constraints.NotNull;

/**
* 
* @author Leslie.Lam
* @create 2017-09-07 10:13
**/
public class ThemeServeDto {

    private Integer id;

    @NotNull(message = "主题id不能为空")
    private Integer themeId;

    @NotNull(message = "服务id不能为空")
    private Integer serviceId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }
}
