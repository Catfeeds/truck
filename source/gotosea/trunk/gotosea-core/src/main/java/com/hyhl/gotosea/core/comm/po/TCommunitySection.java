package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;

@Table(name = "t_community_section")
public class TCommunitySection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    /**
     * 0-系统内置板块
            1-自定义板块
     */
    @Column(name = "section_type")
    private Integer sectionType;

    private Integer seq;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取0-系统内置板块
            1-自定义板块
     *
     * @return section_type - 0-系统内置板块
            1-自定义板块
     */
    public Integer getSectionType() {
        return sectionType;
    }

    /**
     * 设置0-系统内置板块
            1-自定义板块
     *
     * @param sectionType 0-系统内置板块
            1-自定义板块
     */
    public void setSectionType(Integer sectionType) {
        this.sectionType = sectionType;
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