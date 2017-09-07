package com.hyhl.gotosea.console.locator.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.locator.service.LocatorService;
import com.hyhl.gotosea.core.local.po.TLocator;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/rest/locator")
public class LocatorController {

    @Resource
    private LocatorService locatorService;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public WebResponse listLocator(TLocator locator){
        return locatorService.listLocator(locator);
    }
}
