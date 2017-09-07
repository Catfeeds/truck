package com.hyhl.gotosea.core.prod.po;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author guan.sj
 */
@Table(name = "t_pub_resource_type")
public class PubResourceType implements Serializable {
    /**
     * 公共资源类型ID
     */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    /**
     * 公共资源类型名称
     */
    private String name;

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
}