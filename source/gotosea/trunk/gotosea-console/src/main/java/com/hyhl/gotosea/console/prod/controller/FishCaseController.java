package com.hyhl.gotosea.console.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.FishCaseService;
import com.hyhl.gotosea.core.prod.po.FishCase;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "/rest/fishCase")
public class FishCaseController {

    @Resource
    private FishCaseService fishCaseService;

    /**
     * 添加鱼情
     * @param fishCase
     * @return
     */
    @PostMapping(value = "")
    public WebResponse createFishCase(@RequestBody  FishCase fishCase){
        return fishCaseService.createFishCase(fishCase);
    }

    /**
     * 修改鱼情内容/删除鱼情
     * @param fishCase
     * @return
     */
    @PutMapping(value = "")
    public WebResponse updateFishCase(@RequestBody FishCase fishCase){
        fishCaseService.updateByPrimaryKey(fishCase);
        return new WebResponse("success","更新成功");
    }

    /**
     * 获取鱼情
     * @return
     */
    @RequestMapping(value = "/list")
    public WebResponse listFishCase(){
        return new WebResponse("success","",fishCaseService.selectAll());
    }

    /**
     * 通过id获取鱼情
     * @param fishCaseId
     * @return
     */
    @RequestMapping(value = "/{fishCaseId}")
    public WebResponse getFishCaseById(@PathVariable(value = "fishCaseId") Integer fishCaseId){
        return new WebResponse("success","",fishCaseService.selectByPrimaryKey(fishCaseId));
    }
}
