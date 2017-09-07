package com.hyhl.common.exception;

import java.util.Locale;

/**
 * 基础业务信息接口，如创建新的业务类错误，请实现此接口
 * @author Gene
 *
 */
public interface IBaseBusinessError {

	/**
	 * 获取状态码
	 * @return
	 *    状态码
	 */
	public int getStatus();
	
	/**
	 * 获取消息
	 * @return
	 *    消息内容
	 */
	public String getMessage();
	
	/**
	 * 获取消息名称
	 * @return
	 *    消息名
	 */
	public String getCode();
	
	/**
	 * 根据本地化设置获取消息
	 * @param locale
	 *     本地化类
	 * @return
	 *     消息内容
	 */
	public String getMessage(Locale locale);
	
}
