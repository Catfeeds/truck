package com.hyhl.gotosea.app.prod.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.dto.AppSelectServe;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.ServiceInfo;
import com.hyhl.gotosea.core.prod.vo.*;

import java.util.List;
import java.util.Map;

/**
 * @author Leslie.Lam
 * @create 2017-07-27 16:21
 **/
public interface ProdService extends BaseService<ProdServe> {


    /**
     * 分页查询主题服务列表
     * @param themeId
     * @return
     */
    Pager<AppThemeServes> selectServesByTheme(Integer themeId);

    /**
     * 分页查询服务列表
     * @param param
     * @return
     */
    Pager<AppServesList> selectServesByPage(AppSelectServe param);

    /**
     * 查询海岛游详情
     * @param id
     * @return
     * @throws Exception
     */
    IslandDetail getIslandDetail(Integer id) throws Exception;

    /**
     * 查询海钓详情
     * @param id
     * @return
     */
    CharterDetail getCharterDetail(Integer id)throws Exception;

    /**
     * 查询服务的额外内容，如介绍，须知等
     * @param serveId
     * @return
     */
	List<ServiceInfo> getServeInfo(Integer serveId);
    
    /**
     * 查询服务详情选项卡获取html片段
     * @param serveId
     * @return
     */
    String getServeDetailItemContents(Integer serveId);

    /**
     * 查询服务详情选项卡获取html片段
     * @param itemId
     * @return
     */
    String getServeDetailItemContent(Integer itemId);

    /**
     * 查询服务销售计划
     * @param id
     * @return
     */
    List<SalePlanVo> selectSalePlans(Integer id);

    /**
     * 查询服务某一天价格
     * @return
     */
    Map<String,Object> getPriceByIdAndTime(Integer id, String time) throws Exception;


//	List<ProdServe> listServeByCond(ProdServeCond cond);

    /**
     * 查询海钓服务钓点
     * @param serveId
     * @return
     */
    List<FishingPoint> selectServeFishingPoint(Integer serveId);

    /**
     * 列举目的地
     * @return
     */
    WebResponse listDestination();
}
