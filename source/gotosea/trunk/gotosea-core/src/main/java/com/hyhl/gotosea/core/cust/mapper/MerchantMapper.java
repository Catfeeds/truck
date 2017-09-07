package com.hyhl.gotosea.core.cust.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.dto.SelectMerchant;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.vo.MerchantDetailVO;
import com.hyhl.gotosea.core.cust.vo.MerchantsVo;

public interface MerchantMapper extends MyMapper<Merchant> {

    Map<String,Object> selectMerchantInfo(String custId);
    
    /**查询商家详情
     * @param custId
     * @return
     */
    MerchantDetailVO findMerchantDetails(@Param("custId") String custId);

    /**
     * 查询所有已认证商家所用到的区域id
     * @return
     */
    List<Integer> selectAreasWithMerchant();

    /**
     * 查询商家列表
     * @param param
     * @return
     */
    List<MerchantsVo> selectMerchants(@Param("param") SelectMerchant param);
}