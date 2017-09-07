package com.hyhl.gotosea.core.ref.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.ref.po.BusinessUnit;

public interface BusinessUnitMapper extends MyMapper<BusinessUnit>{
    public BusinessUnit getBizById(Integer id);
}
