package com.hyhl.gotosea.console.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 主控制器 
 * @author Administrator
 *
 */
@Controller
public class IndexController {

	/**
	 * 主入口
	 * @return
	 */
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String indexController(){
		return "index";
	}
	
}
