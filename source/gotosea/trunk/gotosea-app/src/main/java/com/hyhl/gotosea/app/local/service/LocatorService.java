package com.hyhl.gotosea.app.local.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.local.po.LocatorVo;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.local.po.TLocatorType;
import com.hyhl.gotosea.core.local.vo.BaseInfoVo;

import java.util.List;

public interface LocatorService {
    public List<LocatorVo> listLocatorByCond(TLocator locator);
    public WebResponse getBaseInfoByLocatorId(Integer id) throws Exception;
    public List<TLocatorType> listLocatorType();
}
