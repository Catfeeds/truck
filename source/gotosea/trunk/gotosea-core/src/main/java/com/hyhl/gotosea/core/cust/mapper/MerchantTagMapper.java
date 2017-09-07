package com.hyhl.gotosea.core.cust.mapper;

import com.hyhl.gotosea.core.cust.po.MerchantTag;
import com.hyhl.gotosea.core.common.mapper.MyMapper;

import java.util.List;

public interface MerchantTagMapper extends MyMapper<MerchantTag> {
    public List<Integer> getTagsByCId(String custId);
}