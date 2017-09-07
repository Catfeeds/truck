package com.hyhl.gotosea.app.prod.service.impl;

import com.hyhl.gotosea.app.prod.service.MercResoService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.mapper.MerchantResourceMapper;
import com.hyhl.gotosea.core.prod.po.MerchantResource;
import com.hyhl.gotosea.core.prod.vo.MerchantDetail;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-03 14:14
**/
@Service
public class MercResoServiceImpl extends BaseServiceImpl<MerchantResource> implements MercResoService {

    @Resource
    private MerchantResourceMapper mercResoMapper;

    @Override
    public MerchantDetail selectMercResoDetail(String id) {
        return mercResoMapper.selectMercResoDetail(id);
    }

    @Override
    public List<Integer> selectCustIdsByResourceType(Integer resourceTypeId) {
        return mercResoMapper.selectCustIdsByResourceType(resourceTypeId);
    }
}
