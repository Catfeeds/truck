package com.hyhl.gotosea.console.prod.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.dto.CharterDetail;
import com.hyhl.gotosea.console.prod.dto.RouteDetail;
import com.hyhl.gotosea.console.prod.dto.ServePubReso;
import com.hyhl.gotosea.console.prod.dto.ServeSalePlan;
import com.hyhl.gotosea.console.prod.service.ProdService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.prod.dto.ConsoleSelectServe;
import com.hyhl.gotosea.core.prod.enm.ProdServeEnum;
import com.hyhl.gotosea.core.prod.util.ProdHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/rest/prod/serve")
public class ProdServeController {

    @Resource
    private ProdService prodService;

    @Resource
    private ProdHelper prodHelper;

    /**
     * 获取服务类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "type",method = RequestMethod.GET)
    public WebResponse getServeType() throws Exception {
        return new WebResponse(prodHelper.getServeType());
    }

    /**
     * 获取公共资源类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "reso/type",method = RequestMethod.GET)
    public WebResponse getPubResourceType() throws Exception {
        return new WebResponse(prodHelper.getPubResourceType());
    }

    /**
     * 根据资源类型查询公共资源
     * @param type
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "reso/list/{type}",method = RequestMethod.GET)
    public WebResponse selectPubResourceByPage(@PathVariable("type")Integer type) throws Exception {
        return new WebResponse(prodService.selectPubResourceByPage(type));
    }

    /**
     * 新增线路
     * @param param
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "route/add",method = RequestMethod.POST)
    @ExtPermission(values={ExtPermissionEumn.新增线路服务})
    public WebResponse addRoute(@Validated  @RequestBody RouteDetail param) throws Exception {
        return prodService.addRoute(param);
    }

    /**
     * 新增租船
     * @param param
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "charter/add",method = RequestMethod.POST)
    @ExtPermission(values={ExtPermissionEumn.新增租船服务})
    public WebResponse addCharter(@Validated  @RequestBody CharterDetail param) throws Exception {
        return prodService.addCharter(param);
    }

    /**
     * 分页查询服务
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.查询线路服务})
    @RequestMapping(value = "page",method = RequestMethod.GET)
    public WebResponse selectRouteByPage(ConsoleSelectServe param) throws Exception {
        return new WebResponse(prodService.selectServeByPage(param));
    }

    /**
     * 查询线路详情
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.查询线路服务详情})
    @RequestMapping(value = "route/detail/{id}",method = RequestMethod.GET)
    public WebResponse selectRouteDetail(@PathVariable("id")Integer id) throws Exception {
        return new WebResponse(prodService.selectRouteDetail(id));
    }

    /**
     * 查询租船详情
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.查询租船服务详情})
    @RequestMapping(value = "charter/detail/{id}",method = RequestMethod.GET)
    public WebResponse selectCharterDetail(@PathVariable("id")Integer id) throws Exception {
        return new WebResponse(prodService.selectCharterDetail(id));
    }

    /**
     * 修改线路
     * @param param
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.修改线路服务})
    @RequestMapping(value = "route/update",method = RequestMethod.PUT)
    public WebResponse updateRoute(@Validated  @RequestBody RouteDetail param) throws Exception {
        return prodService.updateRoute(param);
    }

    /**
     * 修改租船
     * @param param
     * @return
     * @throws Exception
     */
    @ExtPermission(values={ExtPermissionEumn.修改租船服务})
    @RequestMapping(value = "charter/update",method = RequestMethod.PUT)
    public WebResponse updateCharter(@Validated  @RequestBody CharterDetail param) throws Exception {
        return prodService.updateCharter(param);
    }

    /**
     * 添加时间定价（按不同时间定价）
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "sale/add",method = RequestMethod.POST)
    public WebResponse addSalePlan(@Validated  @RequestBody ServeSalePlan param) throws Exception {
        return prodService.addSalePlan(param);
    }

    /**
     * 添加资源定价（按不同资源定价）
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "reso/add",method = RequestMethod.POST)
    public WebResponse addPubReso(@Validated  @RequestBody ServePubReso param) throws Exception {
        return prodService.addPubReso(param);
    }

    /**
     * 分页查询服务时间定价列表
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "sale/page/{serveId}",method = RequestMethod.GET)
    public WebResponse selectSalePlanByPage(@PathVariable("serveId")Integer serveId) throws Exception {
        return new WebResponse(prodService.selectSalePlanByPage(serveId));
    }

    /**
     * 分页查询服务资源定价列表
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "reso/page/{serveId}",method = RequestMethod.GET)
    public WebResponse selectServiePubResoByPage(@PathVariable("serveId")Integer serveId) throws Exception {
        return new WebResponse(prodService.selectServiePubResoByPage(serveId));
    }

    /**
     * 删除销售计划
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "sale/del/{id}",method = RequestMethod.DELETE)
    public WebResponse selectSalePlanByPage(@PathVariable("id")Integer[] id) throws Exception {
        prodService.delSalePlan(id);
        return new WebResponse("200","删除成功");
    }

    /**
     * 删除销售计划
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "reso/del/{id}",method = RequestMethod.DELETE)
    public WebResponse delServiePubReso(@PathVariable("id")Integer[] id) throws Exception {
        prodService.delServiePubReso(id);
        return new WebResponse("200","删除成功");
    }

    /**
     * 上线服务
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "switch/on/{id}",method = RequestMethod.PUT)
    public WebResponse switchServeOn(@PathVariable("id") Integer[] ids) throws Exception {
        return prodService.switchServe(ids, ProdServeEnum.可用.code());
    }

    /**
     * 下线服务
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "switch/off/{id}",method = RequestMethod.PUT)
    public WebResponse switchServeOff(@PathVariable("id") Integer[] ids) throws Exception {
        return prodService.switchServe(ids, ProdServeEnum.不可用.code());
    }


}
