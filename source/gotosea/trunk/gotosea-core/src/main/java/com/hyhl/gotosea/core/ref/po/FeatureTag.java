package com.hyhl.gotosea.core.ref.po;

import javax.persistence.*;

/**
* 特征标签
* @author Leslie.Lam
* @create 2017-08-01 9:24
**/
@Table(name = "t_feature_tag")
public class FeatureTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;//标签ID

    @Column(name = "tag_type_id")
    private Integer tagTypeId;//标签类型id

    private Integer pid;//上级标签id

    private String name;//标签名称

    private Integer level;

    public FeatureTag() {
    }

    public FeatureTag(Integer level) {
        this.level = level;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTagTypeId() {
        return tagTypeId;
    }

    public void setTagTypeId(Integer tagTypeId) {
        this.tagTypeId = tagTypeId;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
