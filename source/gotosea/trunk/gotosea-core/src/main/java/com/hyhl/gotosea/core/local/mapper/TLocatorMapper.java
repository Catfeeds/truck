package com.hyhl.gotosea.core.local.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.local.po.TLocator;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface TLocatorMapper extends MyMapper<TLocator> {
    public List<TLocator> listLocatorByIds(@Param("ids") List<Integer> ids);
    public List<TLocator>listLocatorByCond(TLocator locator);
}