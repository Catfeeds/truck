package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_activity_opt_service")
public class TActOptService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "activity_id")
    private Long activityId;

    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "service_num")
    private Integer serviceNum;

    @Column(name = "service_time")
    private Date serviceTime;

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Date getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(Date serviceTime) {
        this.serviceTime = serviceTime;
    }

}
