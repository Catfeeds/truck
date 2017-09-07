package com.hyhl.gotosea.community.post.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.post.service.ActivityService;
import com.hyhl.gotosea.community.post.service.PostService;
import com.hyhl.gotosea.core.comm.dto.*;
import com.hyhl.gotosea.core.comm.po.PostCond;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rest")
public class PostController {

    @Resource
    private PostService postService;
    @Resource
    private ActivityService activityService;


    /**
     * 上传图片
     * @param request
     * @return
     */
    @PostMapping(value = "/post/upload")
    public WebResponse upload(HttpServletRequest request){
        return postService.upload(request);
    }


    /**
     * 搜索帖子(for 首页)
     * @param keywords
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/post/search/{keywords}")
    public WebResponse searchPost(@PathVariable(value = "keywords") String keywords) throws Exception {
        return postService.searchPost(keywords);
    }

    /**
     *  发帖子
     * @param postDto 帖子dto
     */
    @Login
    @RequestMapping(value = "/post",method = RequestMethod.POST)
    public WebResponse createPost(@Valid @RequestBody PostDto postDto) throws Exception {
        return postService.createPost(postDto);
    }


    /**
     * 根据条件获取活动帖子列表
     * @param postCond
     * @return
     */
    @RequestMapping(value = "/post/list",method = RequestMethod.GET)
    public WebResponse listPost(PostCond postCond) throws Exception {
        return postService.listPostByCond(postCond);
    }


    /**
     * 获取帖子详情
     * @return
     */
    @RequestMapping(value = "/post/{postId}",method = RequestMethod.GET)
    public WebResponse getPostById(@PathVariable("postId") Long postId) throws Exception {
        return postService.getPostById(postId);
    }


    /**
     * 评论帖子
     * @param postCommentDto
     */
    @Login
    @RequestMapping(value="/post/comment",method = RequestMethod.POST)
    public WebResponse comment(PostCommentDto postCommentDto) throws Exception {
       return postService.commentPost(postCommentDto);
    }

    /**
     * 获取帖子回复信息
     * @param postId 帖子id
     * @return
     */
    @RequestMapping(value = "/post/comment/list/{postId}",method = RequestMethod.GET)
    public WebResponse listPostComment(@PathVariable("postId") Long postId) throws Exception {
        return postService.listPostComment(postId);
    }


    /**
     * 点赞帖子
     */
    @Login
    @RequestMapping(value = "/post/thumb/{postId}",method = RequestMethod.POST)
    public WebResponse thumbPost(@PathVariable("postId") Long postId){
        return postService.thumbPost(postId);
    }


    /**
     * 收藏帖子/活动
     * @param id    帖子或活动id
     * @return
     */
    @Login
    @PostMapping(value = "/post/favorite/{id}")
    public WebResponse favoritePost(@PathVariable("id") Long id,Integer sectionId){
        return postService.favoritePost(id,sectionId);
    }


    /**
     * 列举我的帖子 (个人中心)
     * @return
     */
    @Login
    @RequestMapping(value = "/post/my/list",method = RequestMethod.GET)
    public WebResponse listMyPost(@RequestParam("type") Integer type) throws Exception {  //type 1 我的帖子 2 我收藏的帖子
        return postService.listMyPost(type);
    }


    /**
     * 列举帖子点赞用户
     * @param postId
     * @return
     */
    @RequestMapping(value = "/post/thumb/list/{postId}")
    public WebResponse listPostThumb(@PathVariable(value = "postId") Long postId) throws Exception {
        return postService.listPostThumb(postId);
    }

}
