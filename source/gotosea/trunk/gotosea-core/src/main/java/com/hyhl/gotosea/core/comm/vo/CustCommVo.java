package com.hyhl.gotosea.core.comm.vo;

import com.hyhl.gotosea.core.cust.vo.CustTagVO;

import java.util.List;

/**
 * 评论中使用的用户信息
 */
public class CustCommVo {
    private String id;  //id
    private String name;    //客户名称
    private String picture; //头像
    private Integer level;  //等级
    List<CustTagVO> custTagVos; //客户评价标签

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getId() {
        return id;
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

    public List<CustTagVO> getCustTagVos() {
        return custTagVos;
    }

    public void setCustTagVos(List<CustTagVO> custTagVos) {
        this.custTagVos = custTagVos;
    }
}
