package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_activity_service")
public class TActivityService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "activity_id")
    private Long activityId;

    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "service_time")
    private Date serviceTime;   //服务开始时间

    @Column(name = "service_num")
    private Integer serviceNum; //服务数量

    /**
     * 1--AA付费项目
     * 2--自选付费项目
     */
    @Column(name = "activity_service_type")
    private Integer activityServiceType;

    private Integer seq;

    public Date getServiceTime() {
        return serviceTime;
    }

    public void setServiceTime(Date serviceTime) {
        this.serviceTime = serviceTime;
    }

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return activity_id
     */
    public Long getActivityId() {
        return activityId;
    }

    /**
     * @param activityId
     */
    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    /**
     * @return service_id
     */
    public Integer getServiceId() {
        return serviceId;
    }

    /**
     * @param serviceId
     */
    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    /**
     * 获取1--AA付费项目
            2--自选付费项目
     *
     * @return activity_service_type - 1--AA付费项目
            2--自选付费项目
     */
    public Integer getActivityServiceType() {
        return activityServiceType;
    }

    /**
     * 设置1--AA付费项目
            2--自选付费项目
     *
     * @param activityServiceType 1--AA付费项目
            2--自选付费项目
     */
    public void setActivityServiceType(Integer activityServiceType) {
        this.activityServiceType = activityServiceType;
    }

    /**
     * @return seq
     */
    public Integer getSeq() {
        return seq;
    }

    /**
     * @param seq
     */
    public void setSeq(Integer seq) {
        this.seq = seq;
    }
}