package com.hyhl.common.web;

/**
 * 通用返回结果类
 * @author Gene
 *
 */
public class WebResponse {

	//状态码
	private String code = "success";
	
	//返回信息
	private String message = "";
	
	//返回数据
	private Object data = null;

	public WebResponse() {
	}

	public WebResponse(String code, String message){
		this.code = code;
		this.message = message;
	}
	
	public WebResponse(Object data){
		this.code = "success";
		this.data = data;
	}
	
	public WebResponse(String code, String message,Object data){
		this.code = code;
		this.message = message;
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
	public WebResponse returnMsg(String message){
		this.message = message;
		return this;
	}
}
