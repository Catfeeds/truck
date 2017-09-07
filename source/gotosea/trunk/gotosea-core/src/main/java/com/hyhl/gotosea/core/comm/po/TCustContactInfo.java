package com.hyhl.gotosea.core.comm.po;

import javax.persistence.*;

@Table(name = "t_cust_contact_info")
public class TCustContactInfo {
    @Id
    @Column(name = "cust_id")
    private String custId;

    @Column(name = "fans_num")
    private Integer fansNum;

    @Column(name = "concern_num")
    private Integer concernNum;

    /**
     * @return cust_id
     */
    public String getCustId() {
        return custId;
    }

    /**
     * @param custId
     */
    public void setCustId(String custId) {
        this.custId = custId == null ? null : custId.trim();
    }

    /**
     * @return fans_num
     */
    public Integer getFansNum() {
        return fansNum;
    }

    /**
     * @param fansNum
     */
    public void setFansNum(Integer fansNum) {
        this.fansNum = fansNum;
    }

    /**
     * @return concern_num
     */
    public Integer getConcernNum() {
        return concernNum;
    }

    /**
     * @param concernNum
     */
    public void setConcernNum(Integer concernNum) {
        this.concernNum = concernNum;
    }
}