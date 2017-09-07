package com.hyhl.gotosea.core.comm.dao;

import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;
import com.hyhl.gotosea.core.comm.po.TActivityService;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface TActivityServiceMapper extends MyMapper<TActivityService> {
    public void insertActService(/*@Param("activityServiceDtos") */List<ActivityServiceDto> activityServiceDtos);
}