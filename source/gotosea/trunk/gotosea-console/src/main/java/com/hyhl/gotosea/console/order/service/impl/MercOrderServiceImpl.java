package com.hyhl.gotosea.console.order.service.impl;

import com.hyhl.gotosea.console.order.service.MercOrderService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.service.IWalletServiceCore;
import com.hyhl.gotosea.core.order.dto.ConsoleOrderDto;
import com.hyhl.gotosea.core.order.mapper.MercOrderLogMapper;
import com.hyhl.gotosea.core.order.mapper.MercOrderMapper;
import com.hyhl.gotosea.core.order.po.MercOrder;
import com.hyhl.gotosea.core.order.vo.AllMercOrder;
import com.hyhl.gotosea.core.order.vo.MercOrderDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-28 17:18
**/
@Service("consoleMercOrderService")
@Transactional(transactionManager = "orderTransationManager",readOnly = true)
public class MercOrderServiceImpl extends BaseServiceImpl<MercOrder> implements MercOrderService {

    @Resource
    private MercOrderMapper mercOrderMapper;

    @Resource
    private MercOrderLogMapper mercOrderLogMapper;

    @Resource
    private IWalletServiceCore iWalletServiceCore;

    @Override
    public Pager<AllMercOrder> selectAllMercOrders(ConsoleOrderDto param) {
        return selectByPage(()->mercOrderMapper.selectAllMercOrders(param));
    }

    @Override
    public MercOrderDetail selectMercOrderDetail(Integer id) {
        return mercOrderMapper.selectMercOrderDetail(id);
    }

}
