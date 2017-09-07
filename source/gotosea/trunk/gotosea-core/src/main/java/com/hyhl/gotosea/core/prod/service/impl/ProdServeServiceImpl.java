package com.hyhl.gotosea.core.prod.service.impl;

import java.util.List;
import java.util.Objects;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.dto.PriceDto;
import com.hyhl.gotosea.core.prod.mapper.PubResoPriceMapper;
import com.hyhl.gotosea.core.prod.mapper.SalesPlanMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiePubResoMapper;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResourcePrice;
import com.hyhl.gotosea.core.prod.po.SalesPlan;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;
import com.hyhl.gotosea.core.prod.service.ProdServeService;
import com.hyhl.gotosea.core.util.DateUtil;
import org.springframework.util.Assert;

/**
* 
* @author Leslie.Lam
* @create 2017-08-23 12:31
**/
@Service
public class ProdServeServiceImpl extends BaseServiceImpl<ProdServe> implements ProdServeService {

    @Resource
    private SalesPlanMapper salesPlanMapper;

    @Resource
    private PubResoPriceMapper pubResoPriceMapper;

    @Resource
    private ServiePubResoMapper serviePubResoMapper;

    @Override
    public PriceDto getSalePlanPrice(Integer serveId, String time,Integer num) throws Exception {
        PriceDto dto = null;
        SalesPlan plan = salesPlanMapper.selectOne(new SalesPlan(serveId, DateUtil.parse(time,"yyyy-MM-dd")));
        if(null!=plan){
            dto = new PriceDto();
            dto.setMarketPrice(plan.getMarketPrice());
            dto.setPreferPrice(plan.getPreferPrice());
            dto.setCostPrice(plan.getCostPrice());
            Integer numSold = plan.getNumSold();//销售计划已售数量
//                Integer numToSale = plan.getNumToSale();//销售计划可售数量
//                if(numSold>=numToSale)throw new BaseBusinessException(SALE_OUT);
//                if(num+numSold>numToSale)throw new BaseBusinessException(PARAMETER_ERROR,"可购买数量为"+(numToSale-numSold)+"份");
            plan.setNumSold(num+numSold);
            salesPlanMapper.updateByPrimaryKey(plan);//更新已售数量
        }
        return dto;
    }

    @Override
    public PriceDto getPubResoPrice(Integer serveId, String time, Integer point) throws Exception {
        PriceDto dto = new PriceDto();
        ServiePubReso spr = serviePubResoMapper.selectOne(new ServiePubReso(point, serveId));
        Assert.notNull(spr,"无法获取该钓点价格");
        dto.setMarketPrice(spr.getMarketPrice());
        dto.setPreferPrice(spr.getPreferPrice());
        dto.setCostPrice(spr.getCostPrice());
//        SalesPlan plan = salesPlanMapper.selectOne(new SalesPlan(serveId, DateUtil.parse(time,"yyyy-MM-dd")));
//        if(null!=plan){
//            dto = new PriceDto();
//            if (Objects.equals(plan.getResourcePriceTag(),1)){
//                PubResourcePrice resourcePrice = pubResoPriceMapper.selectOne(new PubResourcePrice(plan.getId(),point));
//                if(null!=resourcePrice){
//                    dto.setMarketPrice(resourcePrice.getMarketPrice());
//                    dto.setPreferPrice(resourcePrice.getPreferPrice());
//                    dto.setCostPrice(resourcePrice.getCostPrice());
//                    Integer numSold = plan.getNumSold();//销售计划已售数量
//                    plan.setNumSold(++numSold);
//                    salesPlanMapper.updateByPrimaryKey(plan);//更新已售数量
//                }
//            }
//        }
        return dto;
    }

    @Override
    public List<ServiePubReso> selectServiePubReso(Integer serveId) {
        return serviePubResoMapper.select(new ServiePubReso(serveId));
    }
}
