package com.hyhl.gotosea.core.prod.po;

import javax.persistence.*;

/**
* 服务标签
* @author Leslie.Lam
* @create 2017-07-27 14:47
**/
@Table(name = "t_service_tag")
public class ServiceTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tag_id")
    private Integer tagId;//标签id

    @Column(name = "service_id")
    private Integer serviceId;//服务id

    public ServiceTag() {
    }

    public ServiceTag(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public ServiceTag(Integer tagId, Integer serviceId) {
        this.tagId = tagId;
        this.serviceId = serviceId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }
}
