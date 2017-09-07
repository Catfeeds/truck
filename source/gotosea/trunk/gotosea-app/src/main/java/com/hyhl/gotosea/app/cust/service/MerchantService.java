package com.hyhl.gotosea.app.cust.service;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.SelectMerchant;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.vo.MerchantsVo;

/**
 * @author Leslie.Lam
 * @create 2017-08-05 17:01
 **/
public interface MerchantService extends BaseService<Merchant> {

    /**
     * 分页查询商家信息
     * @param param
     * @return
     */
    Pager<MerchantsVo> selectMerchantByPage(SelectMerchant param);

}
