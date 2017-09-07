package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.po.ServiceTag;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-07-27 15:09
 **/
public interface ServiceTagMapper extends MyMapper<ServiceTag> {
    public List<Integer> getTagIdByServiceId(Integer serviceId);
}
