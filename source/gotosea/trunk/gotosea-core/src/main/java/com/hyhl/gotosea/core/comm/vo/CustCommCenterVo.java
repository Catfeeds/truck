package com.hyhl.gotosea.core.comm.vo;

import com.hyhl.gotosea.core.comm.po.TCustContactInfo;

public class CustCommCenterVo {
    private Integer postNum;    //动态数量
    private Integer activityNum;    //活动数量（我发起 我参加）
    private Integer fansNum;    //粉丝数量
    private Integer contactNum; //关注数量

    public Integer getContactNum() {
        return contactNum;
    }

    public void setContactNum(Integer contactNum) {
        this.contactNum = contactNum;
    }

    public Integer getFansNum() {
        return fansNum;
    }

    public void setFansNum(Integer fansNum) {
        this.fansNum = fansNum;
    }


    public Integer getPostNum() {
        return postNum;
    }

    public void setPostNum(Integer postNum) {
        this.postNum = postNum;
    }

    public Integer getActivityNum() {
        return activityNum;
    }

    public void setActivityNum(Integer activityNum) {
        this.activityNum = activityNum;
    }
}
