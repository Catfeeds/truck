package com.hyhl.gotosea.app.local.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.local.util.LocalHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 15:50
**/
@RestController
@RequestMapping("rest/local")
public class LocalController {

    @Resource
    private LocalHelper localHelper;

    /**
     * 获取有线路的省市联动
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "route")
    public WebResponse getAreaWithRoute() throws Exception {
        return new WebResponse(localHelper.loadAreaWithRoute());
    }

    /**
     * 获取有商家的省市联动
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "merchant")
    public WebResponse getAreaWithMerchant() throws Exception {
        return new WebResponse(localHelper.loadAreaWithMerchant());
    }
    
    /**
     * 查询省市区联动
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "area/link")
    public WebResponse loadLinkageArea() throws Exception {
        return new WebResponse(localHelper.loadLinkageArea());
    }
}
