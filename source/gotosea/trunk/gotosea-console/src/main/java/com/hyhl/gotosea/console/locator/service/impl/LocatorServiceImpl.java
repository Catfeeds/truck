package com.hyhl.gotosea.console.locator.service.impl;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.locator.service.LocatorService;
import com.hyhl.gotosea.core.local.mapper.TLocatorMapper;
import com.hyhl.gotosea.core.local.po.TLocator;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LocatorServiceImpl implements LocatorService{

    @Resource
    private TLocatorMapper locatorMapper;

    @Override
    public WebResponse listLocator(TLocator locator) {
        return new WebResponse("200","",locatorMapper.select(locator));
    }
}
