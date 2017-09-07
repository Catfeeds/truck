package com.hyhl.gotosea.community.post.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.comm.dto.*;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.vo.ActivityCustVo;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.comm.vo.PostCommentVo;
import com.hyhl.gotosea.core.comm.vo.PostVo;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface PostService extends BaseService<TPost>{
    WebResponse createPost(PostDto postDto) throws Exception;

    WebResponse listPostByCond(PostCond cond) throws Exception;

    WebResponse commentPost(PostCommentDto postCommentDto) throws Exception;

    WebResponse getPostById(Long id) throws Exception;


    public WebResponse thumbPost(Long postId);

    public WebResponse listMyPost(Integer type) throws Exception;
    public WebResponse listMyAct(Integer type) throws Exception;
    public WebResponse listPostComment(Long postId) throws Exception;
    public WebResponse listPostThumb(Long postId) throws Exception;

    public WebResponse upload(HttpServletRequest request);

    WebResponse favoritePost(Long postId, Integer sectionId);

    WebResponse searchPost(String keywords) throws Exception;
}
