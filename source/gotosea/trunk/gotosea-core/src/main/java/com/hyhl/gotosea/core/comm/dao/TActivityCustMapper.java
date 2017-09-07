package com.hyhl.gotosea.core.comm.dao;

import com.hyhl.gotosea.core.comm.po.TActivityCust;
import com.hyhl.gotosea.core.comm.po.TPost;
import com.hyhl.gotosea.core.common.mapper.MyMapper;

import java.util.List;

public interface TActivityCustMapper extends MyMapper<TActivityCust> {
    public List<TPost> listPostByCustId(String custId);
}
