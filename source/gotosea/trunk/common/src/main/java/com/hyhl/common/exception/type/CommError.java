package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum CommError implements IBaseBusinessError {
    CONTACT_SELF(200,"您总是时刻关注着自己","CONTACT_SELF"),
    CONTACT_EXIST(200, "您已经关注过该用户", "CONTACT_EXIST"),
    CONTACT_CUST_NOT_EXIST(200, "您关注的用户不存在", "CONTACT_CUST_NOT_EXIST"),
    ACTIVITY_DES_NOT_EXIST(200,"活动目的地不存在","ACTIVITY_DES_NOT_EXIST"),
    ACTIVITY_NOT_FOUND(200,"找不到该活动","ACTIVITY_NOT_FOUND"),
    ACTIVITY_EXPIRED(200,"活动已过期","ACTIVITY_EXPIRED"),
    ACTIVITY_BLOCKED(200,"活动进行中","ACTIVITY_BLOCKED"),
    ACTIVITY_CUST_NOT_FOUND(200,"没有活动参与用户","ACTIVITY_CUST_NOT_FOUND"),
    ACTIVITY_COSTOMERS_ENOUGH(200,"活动参与人数已满","ACTIVITY_COSTOMERS_ENOUGH"),
    ACTIVITY_CUST_NOT_EXIST(200,"您没有加入该活动","ACTIVITY_CUST_NOT_EXIST"),
    ACTIVITY_STATUS_EXCEPTION(200,"活动状态异常","ACTIVITY_STATUS_EXCEPTION"),
    ACTIVITY_NO_CHOOSE_SERVICE(200,"活动没有选择服务","ACTIVITY_NO_CHOOSE_SERVICE"),
    POST_NOT_EXIST(200,"帖子不存在","POST_NOT_EXIST"),
    ACTIVITY_NOT_EXIST(200,"活动不存在","POST_NOT_EXIST"),
    ACTIVITY_INIT_EXCEPTION(200,"您不是活动发起人","ACTIVITY_INIT_EXCEPTION"),
    POST_TYPE_NOT_EXIST(200,"没有该类型的动态","POST_TYPE_NOT_EXIST"),
    FAVORITE_POST_EXIST(200,"您已经收藏过该动态","POST_TYPE_NOT_EXIST"),
    ACTIVITY_APPLY_EXPIRE(200,"活动报名已结束","ACTIVITY_APPLY_EXPIRE"),
    ACTIVITY_JOIN_EXIST(200,"您已经加入过该活动了","ACTIVITY_JOIN_EXIST"),
    ACTIVITY_CUST_NOT_JOIN(200,"您无需加入自己的活动","ACTIVITY_CUST_NOT_JOIN"),
    ACTIVITY_SERVE_OPT_NOT_EXIST(200,"活动自选服务不存在","ACTIVITY_SERVE_OPT_NOT_EXIST"),
    ACTIVITY_SERVE_PUB_NOT_EXIST(200,"找不到该活动服务的公共资源","ACTIVITY_SERVE_PUB_NOT_EXIST"),
    ACTIVITY_SERVE_NOT_EXIST(200,"活动服务不存在","ACTIVITY_SERVE_NOT_EXIST"),
    CUST_TAG_NOT_EXIST(200,"您没有选择玩家标签,无法推荐","CUST_TAG_NOT_EXIST"),
    FAVORITE_ACTIVITY_EXIST(200,"您已经收藏过该动态或活动","FAVORITE_POST_EXIST")
    ;

    private CommError(int status, String message, String code){
        this.status = status;
        this.message = message;
        this.code = code;
    }

    private int status;
    private String message;
    private String code;

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String getCode() {
        return String.valueOf(this.status);
    }

    @Override
    public String getMessage(Locale locale) {
        return this.message;
    }
}
