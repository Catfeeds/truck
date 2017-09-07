package com.hyhl.gotosea.console.ref.controller;

import com.hfocean.common.auth.system.permission.annotation.MjPermission;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.ref.service.DictionaryService;
import com.hyhl.gotosea.core.ref.vo.DictionaryVo;

import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-03 18:43
**/
@Controller
@RequestMapping("rest/dic")
public class DictionaryController {

    @Resource
    private DictionaryService dictionaryService;

    /**
     * 添加数据字典
     * @return
     * @throws Exception
     */
    @ResponseBody
    @ExtPermission(values={ExtPermissionEumn.新增数据字典数据})
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public WebResponse addDictionary(@Validated DictionaryVo param) throws Exception {
        dictionaryService.addDictionary(param);
        return new WebResponse("添加成功");
    }

    /**
     * 查询数据字典
     * @param name
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.数据字典列表})
    @ResponseBody
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public WebResponse listDictionary(String name) throws Exception {
        return new WebResponse(dictionaryService.listDictionary(name));
    }

    /**
     * 修改数据字典
     * @return
     * @throws Exception
     */
    @ResponseBody
    @MjPermission
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public WebResponse updateDictionary(Integer id,String remark) throws Exception {
        Assert.notNull(id,"id不能为空");
        Assert.hasText(remark,"备注不能为空");
        dictionaryService.updateDictionary(id,remark);
        return new WebResponse("修改成功");
    }

    /**
     * 删除数据字典
     * @param id
     * @return
     * @throws Exception
     */
    @ResponseBody
    @MjPermission
    @RequestMapping(value = "/del/{id}",method = RequestMethod.DELETE)
    public WebResponse delDictionary(@PathVariable("id") Integer id) throws Exception {
        Assert.notNull(id,"id不能为空");
        dictionaryService.delDictionary(id);
        return new WebResponse("删除成功");
    }

    @ResponseBody
    @RequestMapping(value = "remark",method = RequestMethod.GET)
    public WebResponse getRemarkByNameAndCode(String name, Integer code) throws Exception {
        Assert.notNull(name,"name不能为空");
        return new WebResponse(dictionaryService.getRemarkByNameAndCode(name,code));
    }

    /**
     * 查询数据字典(带子类级别)
     * @param name
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "child",method = RequestMethod.GET)
    public WebResponse selectChildrenByName(String name) throws Exception {
        Assert.notNull(name,"name不能为空");
        return new WebResponse(dictionaryService.selectChildrenByName(name));
    }
}
