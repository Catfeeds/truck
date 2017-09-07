package com.hyhl.gotosea.core.comm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.gotosea.core.comm.po.TActivity;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActStatusChange;

public interface ActivityServiceCore extends BaseService<TActivity> {
    public void activityTime() throws JsonProcessingException;
    public void actStatusChange(MqActStatusChange mqActStatusChange);
    ActivityVo getActivityById(Long id) throws Exception;

    void actOptService(MqActService mqActService);
}
