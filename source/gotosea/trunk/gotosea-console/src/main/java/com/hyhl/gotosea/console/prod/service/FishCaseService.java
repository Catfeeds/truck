package com.hyhl.gotosea.console.prod.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.po.FishCase;

public interface FishCaseService extends BaseService<FishCase> {
    WebResponse createFishCase(FishCase fishCase);
}
