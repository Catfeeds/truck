package com.hyhl.gotosea.app.web.controller;

import com.hfocean.common.oss.service.OssService;
import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("rest/oss")
public class OssController {

	@Resource
	private OssService ossService;

	/**
	 * 获取oss上传图片token
	 * @return
	 * @throws Exception
     */
	@Login
	@RequestMapping(value = "token", method = RequestMethod.GET)
	public WebResponse token()throws Exception {
		return new WebResponse(ossService.getToken());
	}
	
}
