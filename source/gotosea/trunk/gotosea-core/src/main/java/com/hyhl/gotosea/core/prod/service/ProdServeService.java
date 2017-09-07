package com.hyhl.gotosea.core.prod.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.dto.PriceDto;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.SalesPlan;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-07-27 16:21
 **/
public interface ProdServeService extends BaseService<ProdServe> {

    PriceDto getSalePlanPrice(Integer serveId, String time,Integer num) throws Exception;

    PriceDto getPubResoPrice(Integer serveId, String time,Integer point) throws Exception;

    List<ServiePubReso> selectServiePubReso(Integer serveId);
}
