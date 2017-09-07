package com.hyhl.gotosea.core.local.po;

import java.math.BigDecimal;
import javax.persistence.*;

@Table(name = "t_locator")
public class TLocator {
    /**
     * 定位点ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 定位点名称
     */
    private String name;

    /**
     * 定位点类型id
     */
    @Column(name = "locator_type_id")
    private Integer locatorTypeId;

    /**
     * 归属区域id
     */
    @Column(name = "area_id")
    private Integer areaId;

    /**
     * 经度
     */
    private BigDecimal lng;

    /**
     * 维度
     */
    private BigDecimal lat;

    /**
     * 定位点描述
     */
    private String description;

    /**
     * 获取定位点ID
     *
     * @return id - 定位点ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置定位点ID
     *
     * @param id 定位点ID
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取定位点名称
     *
     * @return name - 定位点名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置定位点名称
     *
     * @param name 定位点名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取定位点类型id
     *
     * @return locator_type_id - 定位点类型id
     */
    public Integer getLocatorTypeId() {
        return locatorTypeId;
    }

    /**
     * 设置定位点类型id
     *
     * @param locatorTypeId 定位点类型id
     */
    public void setLocatorTypeId(Integer locatorTypeId) {
        this.locatorTypeId = locatorTypeId;
    }

    /**
     * 获取归属区域id
     *
     * @return area_id - 归属区域id
     */
    public Integer getAreaId() {
        return areaId;
    }

    /**
     * 设置归属区域id
     *
     * @param areaId 归属区域id
     */
    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    /**
     * 获取经度
     *
     * @return lng - 经度
     */
    public BigDecimal getLng() {
        return lng;
    }

    /**
     * 设置经度
     *
     * @param lng 经度
     */
    public void setLng(BigDecimal lng) {
        this.lng = lng;
    }

    /**
     * 获取维度
     *
     * @return lat - 维度
     */
    public BigDecimal getLat() {
        return lat;
    }

    /**
     * 设置维度
     *
     * @param lat 维度
     */
    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    /**
     * 获取定位点描述
     *
     * @return description - 定位点描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置定位点描述
     *
     * @param description 定位点描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}