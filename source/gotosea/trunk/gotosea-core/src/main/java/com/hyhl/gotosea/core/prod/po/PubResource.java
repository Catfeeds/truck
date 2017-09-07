package com.hyhl.gotosea.core.prod.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author guan.sj
 */
@Table(name = "t_pub_resource")
public class PubResource implements Serializable {
    /**
     * 公共资源ID
     */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    /**
     * 公共资源类型ID
     */
    private Integer pubResourceTypeId;

    /**
     * 公共资源名称
     */
    private String name;

    /**
     * 公共资源简介
     */
    private String introduction;

    /**
     * 公共资源联系电话
     */
    private String phone;

    /**
     * 公共资源玉照
     */
    private String pictures;

    /**
     * 定位点id
     */
    private Integer locatorId;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPubResourceTypeId() {
        return pubResourceTypeId;
    }

    public void setPubResourceTypeId(Integer pubResourceTypeId) {
        this.pubResourceTypeId = pubResourceTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPictures() {
        return pictures;
    }

    public void setPictures(String pictures) {
        this.pictures = pictures;
    }

    public Integer getLocatorId() {
        return locatorId;
    }

    public void setLocatorId(Integer locatorId) {
        this.locatorId = locatorId;
    }
}