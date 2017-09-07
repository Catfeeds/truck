package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.dto.AppSelectServe;
import com.hyhl.gotosea.core.prod.dto.ConsoleSelectServe;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.ProdServeCond;
import com.hyhl.gotosea.core.prod.vo.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-07-27 15:07
 **/
public interface ProdServeMapper extends MyMapper<ProdServe> {

    /**
     * console查询服务列表
     * @param param
     * @return
     */
    List<ConsoleServesList> selectProdServes(@Param("param") ConsoleSelectServe param);

    /**
     * 查询租船服务钓点
     * @param serveId
     * @return
     */
    List<FishingPoint> selectServeFishingPoint(Integer serveId);

    /**
     * 查询所有可用服务所用到的区域id
     * @return
     */
    List<Integer> selectAreasWithServe();

    /**
     * app查询服务列表
     * @param param
     * @return
     */
    List<AppServesList> selectServes(@Param("param") AppSelectServe param);

    /**
     * 根据主题查询服务列表
     * @param themeId
     * @return
     */
    List<AppThemeServes> selectServesByThemeId(Integer themeId);

    /**
     * 查询海岛游详情
     * @param id
     * @return
     */
    IslandDetail getIslandDetail(Integer id);

    /**
     * 查询租船服务详情
     * @param id
     * @return
     */
    CharterDetail getCharterDetail(Integer id);

    /**
     * 查询服务从当前时间+提前天数开始的时间的销售计划
     * @param future 未来时间点
     * @param id
     * @return
     */
    List<SalePlanVo> selectSalePlans(@Param("id")Integer id,@Param("future")Date future);


    /**
     * 根据条件列举service(for 活动)
     * @param cond
     * @return
     */
    List<ProdServe> listServeByCond(ProdServeCond cond);
    
    /**
     * 查询商家拥有几个服务
     * @param custId
     * @return
     */
    int findMerchantServiceCount(String custId);
}
