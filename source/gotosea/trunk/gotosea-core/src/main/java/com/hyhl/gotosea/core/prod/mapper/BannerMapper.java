package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.po.Banner;
import com.hyhl.gotosea.core.prod.po.BannerCond;

import java.util.List;

public interface BannerMapper extends MyMapper<Banner>{
    public List<Banner> listBanner(BannerCond bannerCond);
}
