package com.hyhl.gotosea.app.prod.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.po.MerchantResource;
import com.hyhl.gotosea.core.prod.vo.MerchantDetail;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-03 14:13
 **/
public interface MercResoService extends BaseService<MerchantResource> {

    /**
     * 根据商家id获取商家资源、服务列表
     * @param id
     * @return
     */
    MerchantDetail selectMercResoDetail(String id);

    /**
     * 根据商家资源类型查询商家id
     * @param resourceTypeId
     * @return
     */
    List<Integer> selectCustIdsByResourceType(Integer resourceTypeId);
}
