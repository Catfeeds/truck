package com.hyhl.gotosea.console.post.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.post.service.ActivityService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.comm.po.TActivity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/rest")
public class PostController {
    @Resource
    private ActivityService activityService;

    /**
     * 列举所有活动
     * @param activity
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.活动列表})
    @RequestMapping(value = "/act/list",method = RequestMethod.GET)
    public WebResponse listActivity(TActivity activity){
        return activityService.listActivity(activity);
    }

    /**
     * 获取活动详情
     * @param actId
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.活动详情})
    @RequestMapping(value = "/act/{actId}",method = RequestMethod.GET)
    public WebResponse getActById(@PathVariable("actId") Long actId){
        return activityService.getActById(actId);
    }
}
