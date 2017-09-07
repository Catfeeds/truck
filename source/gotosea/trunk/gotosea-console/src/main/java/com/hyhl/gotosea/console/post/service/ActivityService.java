package com.hyhl.gotosea.console.post.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.comm.po.TActivity;
import com.hyhl.gotosea.core.common.service.BaseService;

public interface ActivityService extends BaseService<TActivity>{
    public WebResponse listActivity(TActivity activity);
    public WebResponse getActById(Long actId);
}
