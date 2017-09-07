package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.po.DetailSalesPlan;

import java.util.Date;

public interface DetailSalesPlanMapper extends MyMapper<DetailSalesPlan> {
//    DetailSalesPlan getPlanByDate(String date);
    DetailSalesPlan selectOneMy(DetailSalesPlan detailSalesPlan);
}
