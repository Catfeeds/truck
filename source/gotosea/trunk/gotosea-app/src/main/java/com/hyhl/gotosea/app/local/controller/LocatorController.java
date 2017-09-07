package com.hyhl.gotosea.app.local.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.local.service.LocatorService;
import com.hyhl.gotosea.core.local.po.LocatorCond;
import com.hyhl.gotosea.core.local.po.LocatorVo;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.local.vo.BaseInfoVo;
import lombok.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RequestMapping("/rest/locator")
@RestController
public class LocatorController {



    @Resource
    private LocatorService locatorService;

    /**
     * 根据条件列举所有定位点
     */
    @RequestMapping(value ="/list",method = RequestMethod.GET)
    public WebResponse listLocatorByCond(TLocator locator){
        return new WebResponse("success","获取定位点成功",locatorService.listLocatorByCond(locator));
    }

    /**
     * 根据定位点获取基本信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/baseInfo/{locatorId}",method = RequestMethod.GET)
    public WebResponse getBaseInfoByLocatorId(@PathVariable("locatorId") Integer id) throws Exception {
        return locatorService.getBaseInfoByLocatorId(id);
    }

    /**
     * 返回所有定位点类型
     * @return
     */
    @RequestMapping(value = "/types",method = RequestMethod.GET)
    public WebResponse listLocatorType (){
        return new WebResponse("success","",locatorService.listLocatorType());
    }
}
