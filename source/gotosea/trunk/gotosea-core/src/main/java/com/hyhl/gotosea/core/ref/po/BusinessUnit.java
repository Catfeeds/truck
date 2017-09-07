package com.hyhl.gotosea.core.ref.po;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "t_business_unit")
public class BusinessUnit {
    @Id
    @JsonProperty("key")
    private Integer id;
    @JsonProperty("value")
    private String name;

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
