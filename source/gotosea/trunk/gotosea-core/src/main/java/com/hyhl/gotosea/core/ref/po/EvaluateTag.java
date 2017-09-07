package com.hyhl.gotosea.core.ref.po;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_evaluate_tag")
public class EvaluateTag implements Serializable {
    /**
     * 标签ID
     */
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 标签类型id
     */
    private Integer tagTypeId;

    /**
     * 上级标签id
     */
    private Integer pid;

    /**
     * 标签名称
     */
    private String name;

    /**
     * 评价正负面等级
     */
    private Integer positiveNegative;

    private Integer level;

    private static final long serialVersionUID = 1L;

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

    public Integer getPositiveNegative() {
        return positiveNegative;
    }

    public void setPositiveNegative(Integer positiveNegative) {
        this.positiveNegative = positiveNegative;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}