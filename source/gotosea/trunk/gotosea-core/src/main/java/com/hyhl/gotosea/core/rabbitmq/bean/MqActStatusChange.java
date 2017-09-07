package com.hyhl.gotosea.core.rabbitmq.bean;

import com.hyhl.gotosea.core.comm.enm.ActivityRuleEnum;

import java.io.Serializable;

public class MqActStatusChange implements Serializable{
    private static final long serialVersionUID = 1L;
    private Long actId;
    private ActivityRuleEnum activityRuleEnum;

    public MqActStatusChange(){super();};

    public MqActStatusChange(Long actId,ActivityRuleEnum activityRuleEnum){
        this.actId = actId;
        this.activityRuleEnum = activityRuleEnum;
    }

    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
    }

    public ActivityRuleEnum getActivityRuleEnum() {
        return activityRuleEnum;
    }

    public void setActivityRuleEnum(ActivityRuleEnum activityRuleEnum) {
        this.activityRuleEnum = activityRuleEnum;
    }
}
