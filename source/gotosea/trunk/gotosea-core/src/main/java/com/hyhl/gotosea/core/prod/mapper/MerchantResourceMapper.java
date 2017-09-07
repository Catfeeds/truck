package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.po.MerchResCond;
import com.hyhl.gotosea.core.prod.po.MerchantResource;
import com.hyhl.gotosea.core.prod.vo.MerchantDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-07-27 15:06
 **/
public interface MerchantResourceMapper extends MyMapper<MerchantResource> {
    List<Integer> listLocatorIdByType(Integer type);


    /**
     * 根据商家资源获取商家详情服务列表
     * @param id
     * @return
     */
    MerchantDetail selectMercResoDetail(String id);

    void updateStatus(@Param("ids") List<Integer> ids, @Param("status") Integer status);

    List<MerchantResource> selectByCond(MerchResCond merchResCond);

    /**
     * 根据商家资源类型查询商家id
     * @param resourceTypeId
     * @return
     */
    List<Integer> selectCustIdsByResourceType(Integer resourceTypeId);
}
