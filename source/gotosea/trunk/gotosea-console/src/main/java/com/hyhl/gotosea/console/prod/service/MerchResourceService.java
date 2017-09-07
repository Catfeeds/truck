package com.hyhl.gotosea.console.prod.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.dto.MerchResourceDelDto;
import com.hyhl.gotosea.core.prod.dto.MerchantResourceDto;
import com.hyhl.gotosea.core.prod.po.MerchResCond;
import com.hyhl.gotosea.core.prod.po.MerchantResource;

public interface MerchResourceService extends BaseService<MerchantResource>{
    public WebResponse createMerchResource(MerchantResourceDto merchantResourceDto);
    public WebResponse listMerchResource(MerchResCond merchResCond);
    public WebResponse deleteMerchResource(MerchResourceDelDto merchResourceDelDto);
    public WebResponse updateMerchResource(MerchantResource merchantResource);
    public WebResponse listMerchResourceType();
}
