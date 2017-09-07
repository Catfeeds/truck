package com.hyhl.gotosea.app.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.prod.service.FishCaseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;

@RestController
@RequestMapping(value = "/rest/prod/")
public class FishCaseController {

    @Resource
    private FishCaseService fishCaseService;

    @RequestMapping(value = "/fishCase")
    public WebResponse getFishCase() throws ParseException {
        return new WebResponse(fishCaseService.getFishCase());
    }
}
