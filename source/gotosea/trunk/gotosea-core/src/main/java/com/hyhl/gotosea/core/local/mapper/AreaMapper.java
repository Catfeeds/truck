package com.hyhl.gotosea.core.local.mapper;

import java.util.List;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.local.po.Area;
import com.hyhl.gotosea.core.local.vo.AreaVo;

/**
 * @author Leslie.Lam
 * @create 2017-08-02 14:27
 **/
public interface AreaMapper extends MyMapper<Area> {

    /**
     * 查询省市区联动
     * @return
     */
    List<AreaVo> selectLinkageArea();

    /**
     * 查询区域列表，level=3
     * @return
     */
    List<AreaVo> selectAreaLevelIn3();
    
    /**查询所有联动区域
     * @return
     */
    List<AreaVo> selectAreaAll();

    /**
     * @param areaStr 区域id组成的字符串，以逗号隔开
     * @return
     */
    List<AreaVo> selectAreas(String areaStr);

    /**
     * 根据父id找子id集合
     * @param pAreaStr
     * @return
     */
    List<Integer> selectAreaIdsByPAreaId(String pAreaStr);
    
    /**查询用户区域位置信息
     * @return
     */
    String findCustAreaByAreaId(int areaId);
}
