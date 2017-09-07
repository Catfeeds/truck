package com.hyhl.gotosea.core.prod.service.impl;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.po.DetailSalesPlan;
import com.hyhl.gotosea.core.prod.service.DetailSalesPlanServiceCore;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DetailSalesPlanServiceCoreImpl extends BaseServiceImpl<DetailSalesPlan> implements  DetailSalesPlanServiceCore{
}
