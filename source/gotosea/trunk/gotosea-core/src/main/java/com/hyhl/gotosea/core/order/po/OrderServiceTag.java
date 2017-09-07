package com.hyhl.gotosea.core.order.po;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_order_service_tag")
public class OrderServiceTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 订单服务--指服务实例，类似老版本的行程
     */
    @Column(name = "order_service_id")
    private Long orderServiceId;

    @Column(name = "tag_id")
    private Integer tagId;

    @Column(name = "evaluation_time")
    private Date evaluationTime;

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取订单服务--指服务实例，类似老版本的行程
     *
     * @return order_service_id - 订单服务--指服务实例，类似老版本的行程
     */
    public Long getOrderServiceId() {
        return orderServiceId;
    }

    /**
     * 设置订单服务--指服务实例，类似老版本的行程
     *
     * @param orderServiceId 订单服务--指服务实例，类似老版本的行程
     */
    public void setOrderServiceId(Long orderServiceId) {
        this.orderServiceId = orderServiceId;
    }

    /**
     * @return tag_id
     */
    public Integer getTagId() {
        return tagId;
    }

    /**
     * @param tagId
     */
    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    /**
     * @return evaluation_time
     */
    public Date getEvaluationTime() {
        return evaluationTime;
    }

    /**
     * @param evaluationTime
     */
    public void setEvaluationTime(Date evaluationTime) {
        this.evaluationTime = evaluationTime;
    }
}