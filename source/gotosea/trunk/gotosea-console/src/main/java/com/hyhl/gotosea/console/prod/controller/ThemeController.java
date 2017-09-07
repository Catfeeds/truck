package com.hyhl.gotosea.console.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.dto.*;
import com.hyhl.gotosea.console.prod.service.ProdService;
import com.hyhl.gotosea.console.prod.service.ThemeService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.prod.dto.ConsoleSelectServe;
import com.hyhl.gotosea.core.prod.enm.ProdServeEnum;
import com.hyhl.gotosea.core.prod.util.ProdHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/rest/prod/theme")
public class ThemeController {

    @Resource
    private ThemeService themeService;

    /**
     * 添加主题
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    public WebResponse addTheme(@Validated @RequestBody ThemeDto param) throws Exception {
        themeService.addTheme(param);
        return new WebResponse().returnMsg("添加成功");
    }

    /**
     * 查询主题列表
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "list",method = RequestMethod.GET)
    public WebResponse selectTheme() throws Exception {
        return new WebResponse(themeService.selectAll());
    }

    /**
     * 修改主题
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    public WebResponse updateTheme(@Validated @RequestBody ThemeDto param) throws Exception {
        themeService.updateTheme(param);
        return new WebResponse().returnMsg("修改成功");
    }

    /**
     * 删除主题
     * @param id
     */
    @RequestMapping(value = "del/{id}",method = RequestMethod.DELETE)
    public WebResponse delTheme(@PathVariable("id") Integer id) throws Exception {
        themeService.delTheme(id);
        return new WebResponse().returnMsg("删除成功");
    }

    /**
     * 添加主题服务
     */
    @RequestMapping(value = "serve/add",method = RequestMethod.POST)
    public WebResponse addThemeServe(@Validated @RequestBody ThemeServeDto param) throws Exception {
        themeService.addThemeServe(param);
        return new WebResponse().returnMsg("添加成功");
    }

    /**
     * 移除主题服务
     */
    @RequestMapping(value = "serve/del/{id}",method = RequestMethod.DELETE)
    public WebResponse delThemeServe(@PathVariable("id") Integer id) throws Exception {
        themeService.delThemeServe(id);
        return new WebResponse().returnMsg("移除成功");
    }
}
