package com.hyhl.gotosea.console.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.MerchResourceService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.prod.dto.*;
import com.hyhl.gotosea.core.prod.po.MerchResCond;
import com.hyhl.gotosea.core.prod.po.MerchantResource;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping("/rest/prod")
public class ProdController {

    @Resource
    private MerchResourceService merchResourceService;

    /**
     * 列举商家资源类型
     * @return
     */
    @RequestMapping(value = "/merchResType/list")
    public WebResponse listMerchResourceType(){
        return merchResourceService.listMerchResourceType();
    }

    /**
     * 列举商家资源
     * @param
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.查询商家资源})
    @RequestMapping(value = "/merchResource/list",method = RequestMethod.GET)
    public WebResponse listMerchResource(MerchResCond merchResCond){
        return merchResourceService.listMerchResource(merchResCond);
    }

    /**
     * 批量更新商家资源状态(可用->不可用->可用)
     * @param merchResourceDelDto
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.修改商家资源状态})
    @RequestMapping(value = "/merchResource",method = RequestMethod.DELETE)
    public WebResponse deleteMerchResource(@RequestBody MerchResourceDelDto merchResourceDelDto){
        return merchResourceService.deleteMerchResource(merchResourceDelDto);
    }

    /**
     * 修改商家资源
     * @param id
     * @param merchantResource
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.修改商家资源})
    @RequestMapping(value = "/merchResource/{id}",method = RequestMethod.PUT)
    public WebResponse updateMerchResource(@PathVariable("id") Integer id,@RequestBody MerchantResource merchantResource){
        merchantResource.setId(id);
        return merchResourceService.updateMerchResource(merchantResource);
    }

    /**
     * 创建商家资源
     * @param merchantResourceDto
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.新增商家资源})
    @RequestMapping(value = "/merchResource",method = RequestMethod.POST)
    public WebResponse createMerchResource(@RequestBody @Valid MerchantResourceDto merchantResourceDto){
        return merchResourceService.createMerchResource(merchantResourceDto);
    }

}
