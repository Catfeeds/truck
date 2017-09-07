package com.hyhl.common.validator.constant;

/**
 * 正则表达式常量
 * @author guan.sj
 */
public interface ConstantRegex {
	/** 手机正则表达式
     * 大陆手机号码11位数，匹配格式：前三位固定格式+后8位任意数 
     * 此方法中前三位格式有： 
     * 13+任意数 
     * 15+除4的任意数 
     * 18+任意数 
     * 17+除9的任意数 
     * 147+145 
     */
    String PHONE = "^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(14[5,7]))\\d{8}$";
    String PHONE_MSG = "手机号码格式错误";
    String PHONE_NOTNULL_MSG = "手机号不能为空";
	
    /**
     * 邮箱验证
     */
    String EMAIL = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
    String EMAIL_MSG = "邮箱格式错误";
    
    
	/**
	 * 密码验证
	 */
	String PASSWORD = "^(?!^\\d+$)(?!^[a-zA-Z]+$)[A-Za-z0-9]{6,18}$";
	String PASSWORD_MSG = "密码格式错误,格式:6~18位字母与数字的组合";
	
}
