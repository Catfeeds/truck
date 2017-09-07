package com.hyhl.gotosea.core.ref.po;

import javax.persistence.*;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 13:57
**/
@Table(name = "t_dictionary")
public class Dictionary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer code;

    @Column(name = "parent_code")
    private Integer parentCode;

    @Column(name = "is_parent")
    private Integer isParent;

    private String remark;

    public Dictionary() {
    }

    public Dictionary(String name) {
        this.name = name;
    }

    public Dictionary(Integer parentCode) {
        this.parentCode = parentCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getParentCode() {
        return parentCode;
    }

    public void setParentCode(Integer parentCode) {
        this.parentCode = parentCode;
    }

    public Integer getIsParent() {
        return isParent;
    }

    public void setIsParent(Integer isParent) {
        this.isParent = isParent;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
