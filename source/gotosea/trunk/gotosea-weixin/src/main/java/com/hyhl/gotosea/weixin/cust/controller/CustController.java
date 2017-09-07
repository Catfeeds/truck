package com.hyhl.gotosea.weixin.cust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.gotosea.core.cust.service.ICustServiceCore;

@RestController
public class CustController {
	
	@Autowired
	private ICustServiceCore iCustServiceCore;
	
}
