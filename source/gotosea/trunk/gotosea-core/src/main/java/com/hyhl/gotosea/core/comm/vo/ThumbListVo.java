package com.hyhl.gotosea.core.comm.vo;

import java.util.Date;

public class ThumbListVo {
    private Date thumbTime; //点赞时间
    private CustCommVo thumbCust;

    public Date getThumbTime() {
        return thumbTime;
    }

    public void setThumbTime(Date thumbTime) {
        this.thumbTime = thumbTime;
    }

    public CustCommVo getThumbCust() {
        return thumbCust;
    }

    public void setThumbCust(CustCommVo thumbCust) {
        this.thumbCust = thumbCust;
    }
}
