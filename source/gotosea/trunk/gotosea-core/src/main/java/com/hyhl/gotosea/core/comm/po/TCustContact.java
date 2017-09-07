package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;

@Table(name = "t_cust_contact")
public class TCustContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fans;

    private String star;

    @Column(name = "mutual_fans")
    private Integer mutualFans;

    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getMutualFans() {
        return mutualFans;
    }

    public void setMutualFans(Integer mutualFans) {
        this.mutualFans = mutualFans;
    }

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return fans
     */
    public String getFans() {
        return fans;
    }

    /**
     * @param fans
     */
    public void setFans(String fans) {
        this.fans = fans == null ? null : fans.trim();
    }

    /**
     * @return star
     */
    public String getStar() {
        return star;
    }

    /**
     * @param star
     */
    public void setStar(String star) {
        this.star = star == null ? null : star.trim();
    }
}