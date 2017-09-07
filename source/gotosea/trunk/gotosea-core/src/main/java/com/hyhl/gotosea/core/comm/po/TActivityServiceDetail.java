package com.hyhl.gotosea.core.comm.po;


import javax.persistence.*;

@Table(name = "t_activity_service_detail")
public class TActivityServiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "activity_service_id")
    private Integer activityServiceId;  //活动服务id

    @Column(name = "service_detail_id")
    private Integer serviceDetailId;    //活动服务明细id

    @Column(name = "service_detail_num")
    private Integer serviceDetailNum;   //活动服务明细数量

    @Column(name = "prefer_price")
    private Integer preferPrice;    //优惠价

    @Column(name = "market_price")
    private Integer marketPrice;    //市场价

    @Column(name = "cost_price")
    private Integer costPrice;  //成本价

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

    public Integer getServiceDetailId() {
        return serviceDetailId;
    }

    public void setServiceDetailId(Integer serviceDetailId) {
        this.serviceDetailId = serviceDetailId;
    }

    public Integer getServiceDetailNum() {
        return serviceDetailNum;
    }

    public void setServiceDetailNum(Integer serviceDetailNum) {
        this.serviceDetailNum = serviceDetailNum;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Integer marketPrice) {
        this.marketPrice = marketPrice;
    }

    public Integer getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Integer costPrice) {
        this.costPrice = costPrice;
    }
}
