package com.hyhl.gotosea.core.comm.dao;

import com.hyhl.gotosea.core.comm.dto.ActivityDto;
import com.hyhl.gotosea.core.comm.po.TActivity;
import com.hyhl.gotosea.core.comm.po.TActivityService;
import com.hyhl.gotosea.core.comm.po.TPost;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface TActivityMapper extends MyMapper<TActivity> {
//    public void insertAct(ActivityDto activityDto);
    public List<TPost> selectByCustId(String custId);
//    public void insertAAService(List<TActivityService> tActivityList);
}