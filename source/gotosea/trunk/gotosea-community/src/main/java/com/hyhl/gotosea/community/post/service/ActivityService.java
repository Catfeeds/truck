package com.hyhl.gotosea.community.post.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.comm.dto.ActivityDto;
import com.hyhl.gotosea.core.comm.po.TActivityCust;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.service.BaseService;

public interface ActivityService extends BaseService<TActivityCust>{
    WebResponse listActivityCust(Long actId);
    WebResponse activityformed(Long actId) throws Exception;
    WebResponse joinAct(Long actId);
    WebResponse quitActivity(Long actId);
    WebResponse createAct(ActivityDto actDto) throws JsonProcessingException;

    WebResponse activityCancle(Long actId) throws Exception;

    ActivityVo getActivityById(Long actId) throws Exception;
}
