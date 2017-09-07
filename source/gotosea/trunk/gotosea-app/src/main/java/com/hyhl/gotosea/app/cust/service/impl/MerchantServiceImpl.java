package com.hyhl.gotosea.app.cust.service.impl;

import com.hyhl.gotosea.app.cust.service.MerchantService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.SelectMerchant;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.vo.MerchantsVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* 
* @author Leslie.Lam
* @create 2017-08-05 17:02
**/
@Service
public class MerchantServiceImpl extends BaseServiceImpl<Merchant> implements MerchantService {

    @Resource
    private MerchantMapper merchantMapper;

    @Override
    public Pager<MerchantsVo> selectMerchantByPage(SelectMerchant param) {
        return selectByPage(() -> merchantMapper.selectMerchants(param));
    }

}
