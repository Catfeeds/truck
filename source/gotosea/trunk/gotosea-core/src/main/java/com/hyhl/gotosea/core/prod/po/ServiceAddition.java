package com.hyhl.gotosea.core.prod.po;

import javax.persistence.*;

/**
* 附加服务项目
* @author Leslie.Lam
* @create 2017-07-27 14:38
**/
@Table(name = "t_service_addition")
public class ServiceAddition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "order_num")
    private Integer orderNum;//序号

    @Column(name = "master_service_id")
    private Integer masterServiceId;//服务id

    @Column(name = "slave_service_id")
    private Integer slaveServiceId;//附加服务id

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }

    public Integer getMasterServiceId() {
        return masterServiceId;
    }

    public void setMasterServiceId(Integer masterServiceId) {
        this.masterServiceId = masterServiceId;
    }

    public Integer getSlaveServiceId() {
        return slaveServiceId;
    }

    public void setSlaveServiceId(Integer slaveServiceId) {
        this.slaveServiceId = slaveServiceId;
    }
}
