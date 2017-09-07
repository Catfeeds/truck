package com.hyhl.gotosea.core.prod.po;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
* 服务详情
* @author Leslie.Lam
* @create 2017-07-31 11:23
**/
@Table(name = "t_service_info")
public class ServiceInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "item_name")
    @NotBlank(message = "itemName不能为空")
    private String itemName;

    @Column(name = "item_content")
    private String itemContent;

    private Integer itemType;

    @NotNull(message = "seq不能为空")
    private Integer seq;

    public ServiceInfo() {
    }

    public ServiceInfo(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemContent() {
        return itemContent;
    }

    public void setItemContent(String itemContent) {
        this.itemContent = itemContent;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public Integer getItemType() {
        return itemType;
    }

    public void setItemType(Integer itemType) {
        this.itemType = itemType;
    }
}
