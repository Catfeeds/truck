package com.hyhl.gotosea.core.comm.vo;

import com.hyhl.gotosea.core.cust.vo.CustTagVO;

import java.util.List;

public class CustInfo {
    private String id;  //id
    private String name;    //客户名称
    private String picture; //头像
    private Integer level;  //等级
    List<CustTagVO> custTagVos; //客户评价标签
    private Boolean isContact;
    private Integer sex;
    private Boolean isSelf;

    public String getId() {
        return id;
    }

    public Boolean getIsSelf() {
        return isSelf;
    }

    public void setIsSelf(Boolean self) {
        isSelf = self;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<CustTagVO> getCustTagVos() {
        return custTagVos;
    }

    public void setCustTagVos(List<CustTagVO> custTagVos) {
        this.custTagVos = custTagVos;
    }

    public Boolean getIsContact() {
        return isContact;
    }

    public void setIsContact(Boolean contact) {
        isContact = contact;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }
}
