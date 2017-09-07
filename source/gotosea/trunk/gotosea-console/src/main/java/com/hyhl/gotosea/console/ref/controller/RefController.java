package com.hyhl.gotosea.console.ref.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.ref.service.ITagServiceCore;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-02 15:50
**/
@RestController
@RequestMapping("rest/ref")
public class RefController {

    @Resource
    private RefHelper refHelper;

    @Resource
    private ITagServiceCore iTagServiceCore;

    /**
     * 获取服务业务板块类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "bus/unit",method = RequestMethod.GET)
    public WebResponse getBusinessUnit() throws Exception {
        return new WebResponse(refHelper.getBusinessUnit());
    }

    /**
     * 查询服务标签
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "serve/tag",method = RequestMethod.GET)
    public WebResponse findServeTags() throws Exception {
        return new WebResponse(iTagServiceCore.findServeTags());
    }
}
