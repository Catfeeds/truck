package com.hyhl.gotosea.console.prod.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.dto.BannerDto;
import com.hyhl.gotosea.core.prod.po.Banner;
import com.hyhl.gotosea.core.prod.po.BannerCond;

public interface BannerService extends BaseService<Banner>{
    WebResponse listBanner(BannerCond bannerCond);

    WebResponse createBanner(BannerDto bannerDto);

    WebResponse updateBanner(Banner banner);
}
