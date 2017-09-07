package com.hyhl.common.exception.type;

import com.hyhl.common.exception.IBaseBusinessError;

import java.util.Locale;

public enum RefError implements IBaseBusinessError {
    BIZ_NOT_EXIST(200,"业务线不存在","BIZ_NOT_EXIST")

    ;
    private RefError(int status, String message, String code){
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
        return message;
    }

    @Override
    public String getCode() {
        return String.valueOf(status);
    }

    @Override
    public String getMessage(Locale locale) {
        return message;
    }
}
