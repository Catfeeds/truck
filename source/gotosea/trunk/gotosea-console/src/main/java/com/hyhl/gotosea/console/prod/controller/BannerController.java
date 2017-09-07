package com.hyhl.gotosea.console.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.BannerService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.prod.dto.BannerDto;
import com.hyhl.gotosea.core.prod.po.Banner;
import com.hyhl.gotosea.core.prod.po.BannerCond;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.text.SimpleDateFormat;

@RequestMapping(value = "rest/banner")
@RestController
public class BannerController {

    @Resource
    private BannerService bannerService;

    /**
     * 根据条件列举广告
     * @param bannerCond
     * @return
     */
    @RequestMapping(value = "/list")
    @ExtPermission(values={ExtPermissionEumn.查询广告列表})
    public WebResponse listBanner(BannerCond bannerCond){
        return bannerService.listBanner(bannerCond);
    }


    /**
     * 创建广告
     * @param bannerDto
     * @return
     */
    @PostMapping(value = "")
    @ExtPermission(values={ExtPermissionEumn.新增广告})
    public WebResponse createBanner(@Valid @RequestBody BannerDto bannerDto){
        return bannerService.createBanner(bannerDto);
    }


    /**
     * 更新banner(删除 隐藏)
     * @param banner
     * @return
     */
    @PutMapping(value = "")
    @ExtPermission(values={ExtPermissionEumn.修改状态})
    public WebResponse updateBanner(@RequestBody Banner banner){
        return bannerService.updateBanner(banner);
    }
}
