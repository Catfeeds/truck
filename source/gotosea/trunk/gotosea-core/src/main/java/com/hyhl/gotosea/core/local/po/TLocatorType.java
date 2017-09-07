package com.hyhl.gotosea.core.local.po;

import javax.persistence.*;

@Table(name = "t_locator_type")
public class TLocatorType {
    /**
     * 定位点类型ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 定位点类型名称
     */
    private String name;

    /**
     * 定位点类型说明
     */
    private String description;

    @Column(name = "show_in_map")
    private Integer showInMap;

    private Integer seq;

    /**
     * 获取定位点类型ID
     *
     * @return id - 定位点类型ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置定位点类型ID
     *
     * @param id 定位点类型ID
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取定位点类型名称
     *
     * @return name - 定位点类型名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置定位点类型名称
     *
     * @param name 定位点类型名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取定位点类型说明
     *
     * @return description - 定位点类型说明
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置定位点类型说明
     *
     * @param description 定位点类型说明
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * @return show_in_map
     */
    public Integer getShowInMap() {
        return showInMap;
    }

    /**
     * @param showInMap
     */
    public void setShowInMap(Integer showInMap) {
        this.showInMap = showInMap;
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