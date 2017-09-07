package com.hyhl.gotosea.core.ref.po;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guan.sj
 */
@Table(name="t_tag_type")
public class TagType implements Serializable {
    /**
     * 标签类型ID
     */
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 标签类型名称
     */
    private String name;

    /**
     * 标签类别：evaluate：评价标签
            feature：特征标签
     */
    private String category;

    /**
     * 标签层级
     */
    private Integer level;

    private static final long serialVersionUID = 1L;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}