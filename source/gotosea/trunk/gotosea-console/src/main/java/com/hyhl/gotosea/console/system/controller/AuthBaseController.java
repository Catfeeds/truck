package com.hyhl.gotosea.console.system.controller;

import org.springframework.web.servlet.ModelAndView;

import com.hyhl.common.web.WebResponse;


public class AuthBaseController {
	
	protected WebResponse doJsonOut(Object data){
		return new WebResponse(data);
	}
	
	protected WebResponse doJsonOut(String msg,Object data){
		WebResponse jsonOut = doJsonMsg(msg);
		jsonOut.setData(data);
		return jsonOut;
	}
	
	protected ModelAndView modelAndView(String key,Object value,String viewUrl){
		ModelAndView mav = new ModelAndView();
		mav.addObject(key, value);
		mav.setViewName(viewUrl);
		return mav;
	}
	
	protected ModelAndView modelAndView(String viewUrl){
		ModelAndView mav = new ModelAndView();
		mav.setViewName(viewUrl);
		return mav;
	}
	
	/**
	 * 输出提示信息
	 * @param msg 提示信息
	 * @throws Exception
	 */
	public WebResponse doJsonMsg(String msg){
		WebResponse w= new WebResponse(null);
		w.setMessage(msg);
		return w;
	}
	
}
