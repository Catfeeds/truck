package com.hyhl.gotosea.console.locator.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.local.po.TLocator;

public interface LocatorService{
    public WebResponse listLocator(TLocator locator);
}