package com.hyhl.gotosea.community.post.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.post.service.ActivityService;
import com.hyhl.gotosea.community.post.service.PostService;
import com.hyhl.gotosea.core.comm.dto.ActivityDto;
import com.hyhl.gotosea.core.comm.service.ActivityServiceCore;
import com.hyhl.gotosea.core.comm.vo.ActivityCustVo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rest")
public class ActivityController {
    @Resource
    private PostService postService;
    @Resource
    private ActivityServiceCore activityServiceCore;
    @Resource
    private ActivityService activityService;

    /**
     *  发布活动
     */
    @Login
    @RequestMapping(value = "/act",method = RequestMethod.POST)
    public WebResponse createAct(@Valid @RequestBody ActivityDto activityDto) throws JsonProcessingException {
        return activityService.createAct(activityDto);
    }

    /**
     * 加入活动
     */
    @Login
    @RequestMapping(value = "/act/join/{actId}",method = RequestMethod.POST)
    public WebResponse joinActivity(@PathVariable("actId") Long actId){
        return activityService.joinAct(actId);
    }

    /**
     * 获取活动详情
     * @param actId 活动id
     * @return
     */
    @RequestMapping(value = "/act/{actId}",method = RequestMethod.GET)
    public WebResponse getActivityById(@PathVariable("actId") Long actId) throws Exception {
        return new WebResponse("success","",activityService.getActivityById(actId));
    }

    /**
     * 获取加入行程的用户
     * @param actId
     * @return
     */
    @RequestMapping(value = "/act/actCust/{actId}",method = RequestMethod.GET)
    public WebResponse listActivityCust( @PathVariable("actId") Long actId){
        return activityService.listActivityCust(actId);
    }


    /**
     * 活动成行
     * @param actId
     * @return
     */
    @Login
    @RequestMapping(value = "/act/formed/{actId}",method = RequestMethod.POST)
    public WebResponse activityformed(@PathVariable("actId") Long actId) throws Exception {
        return activityService.activityformed(actId);
    }

    /**
     * 取消活动
     * @param actId
     * @return
     * @throws Exception
     */
    @Login
    @PostMapping(value = "/act/cancle/{actId}")
    public WebResponse activityCancle(@PathVariable("actId") Long actId) throws Exception {
        return activityService.activityCancle(actId);
    }

    /**
     * 列举我的活动 (个人中心)
     * @param type
     * @return
     */
    @Login
    @RequestMapping(value = "/act/my/list",method = RequestMethod.GET)
    public WebResponse listMyAct(@RequestParam("type") Integer type) throws Exception {
        return postService.listMyAct(type);
    }


    /**
     * 退出活动
     * @param actId
     * @return
     */
    @Login
    @RequestMapping(value = "/act/quit/{actId}",method = RequestMethod.DELETE)
    public WebResponse quitActivity(@PathVariable("actId") Long actId){
        return activityService.quitActivity(actId);
    }

}
