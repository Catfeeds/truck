package com.hyhl.gotosea.console.prod.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.dto.*;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.dto.ConsoleSelectServe;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.po.SalesPlan;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;
import com.hyhl.gotosea.core.prod.vo.ConsoleServesList;
import com.hyhl.gotosea.core.prod.vo.ServiePubResoVo;

import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * @author Leslie.Lam
 * @create 2017-08-19 10:44
 **/
public interface ProdService extends BaseService<ProdServe> {

    ProdServe addServe(ServeDto param,Supplier<ProdServe> supplier);

    /**
     * 新增线路
     * @param param
     * @return
     * @throws Exception
     */
    WebResponse addRoute(RouteDetail param)throws Exception;

    /**
     * 新增租船
     * @param param
     * @return
     * @throws Exception
     */
    WebResponse addCharter(CharterDetail param)throws Exception;

    /**
     * 根据资源类型分页查询公共资源
     * @param type
     * @return
     */
    List<PubResource> selectPubResourceByPage(Integer type);

    /**
     * 查询线路详情
     * @param id
     * @return
     */
    RouteDetail selectRouteDetail(Integer id);

    /**
     * 查询租船详情
     * @param id
     * @return
     */
    CharterDetail selectCharterDetail(Integer id);

    void updateServe(ServeDto param,Function<ProdServe,ProdServe> function)throws Exception;

    /**
     * 修改线路
     * @param param
     * @return
     * @throws Exception
     */
    WebResponse updateRoute(RouteDetail param)throws Exception;

    /**
     * 修改租船
     * @param param
     * @return
     * @throws Exception
     */
    WebResponse updateCharter(CharterDetail param)throws Exception;

    /**
     * 分页查询服务
     * @param param
     * @return
     */
    Pager<ConsoleServesList> selectServeByPage(ConsoleSelectServe param);

    /**
     * 上下线服务
     * @param ids
     * @param status
     * @return
     * @throws Exception
     */
    WebResponse switchServe(Integer ids[],Integer status)throws Exception;

    /**
     * 添加时间定价（按不同时间定价）
     * @return
     */
    WebResponse addSalePlan(ServeSalePlan param);

    /**
     * 添加资源定价（按不同资源定价）
     * @return
     */
    WebResponse addPubReso(ServePubReso param);

    /**
     * 更新服务标签
     * @param list
     * @param serveId
     */
    void updateServiceTag(List<Integer> list,Integer serveId);

    /**
     * 分页查询时间定价
     * @param serveId
     * @return
     */
    Pager<SalesPlan> selectSalePlanByPage(Integer serveId);

    /**
     * 分页查询资源定价
     * @param serveId
     * @return
     */
    Pager<ServiePubResoVo> selectServiePubResoByPage(Integer serveId);

    /**
     * 删除时间定价
     * @param id
     */
    void delSalePlan(Integer[] id);

    /**
     * 删除资源定价
     * @param id
     */
    void delServiePubReso(Integer[] id);
}
