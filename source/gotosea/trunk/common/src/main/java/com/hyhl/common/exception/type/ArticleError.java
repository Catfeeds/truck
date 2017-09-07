package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum ArticleError implements IBaseBusinessError {
    ARTICLE_NOTFOUND(200,"找不到指定文章","ARTICLE_NOTFOUND"),
    ARTICLE_FAV_EXIST(200,"您已经收藏过该文章了","ARTICLE_FAV_EXIST"),
    THUMB_EXIST(200,"您已经点过赞了","THUMB_EXIST");
    ;

    private ArticleError(int status,String message,String code){
        this.status = status;
        this.message = message;
        this.code = code;
    }

    private int status;
    private String message;
    private String code;

    @Override
    public int getStatus() {
        return this.status;
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
