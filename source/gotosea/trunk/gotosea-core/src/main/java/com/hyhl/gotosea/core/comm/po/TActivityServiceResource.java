package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;

@Table(name = "t_activity_service_resource")
public class TActivityServiceResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "activity_service_id")
    private Integer activityServiceId;

    @Column(name = "pub_resource_id")
    private Integer pubResourceId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getActivityServiceId() {
        return activityServiceId;
    }

    public void setActivityServiceId(Integer activityServiceId) {
        this.activityServiceId = activityServiceId;
    }

    public Integer getPubResourceId() {
        return pubResourceId;
    }

    public void setPubResourceId(Integer pubResourceId) {
        this.pubResourceId = pubResourceId;
    }
}
