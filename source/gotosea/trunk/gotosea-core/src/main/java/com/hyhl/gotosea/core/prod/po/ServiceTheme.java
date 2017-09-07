package com.hyhl.gotosea.core.prod.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* 
* @author Leslie.Lam
* @create 2017-09-06 14:24
**/
@Table(name = "t_service_theme")
public class ServiceTheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer themeId;

    private Integer serviceId;

    public ServiceTheme() {
    }

    public ServiceTheme(Integer themeId) {
        this.themeId = themeId;
    }

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
