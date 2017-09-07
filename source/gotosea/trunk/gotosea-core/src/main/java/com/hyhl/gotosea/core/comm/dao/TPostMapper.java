package com.hyhl.gotosea.core.comm.dao;

import com.hyhl.gotosea.core.comm.dto.PostDto;
import com.hyhl.gotosea.core.comm.po.PostCond;
import com.hyhl.gotosea.core.comm.po.TPost;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface TPostMapper extends MyMapper<TPost> {
//    public void insertPost(PostDto postDto);
    public List<TPost> listPostByCond(PostCond cond);

    List<TPost> listPostByActCust(String custId);
}