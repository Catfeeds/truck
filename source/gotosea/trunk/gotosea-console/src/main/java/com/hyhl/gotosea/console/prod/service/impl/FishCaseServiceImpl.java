package com.hyhl.gotosea.console.prod.service.impl;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.FishCaseService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.mapper.FishCaseMapper;
import com.hyhl.gotosea.core.prod.po.FishCase;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class FishCaseServiceImpl extends BaseServiceImpl<FishCase> implements FishCaseService {
    @Resource
    private FishCaseMapper fishCaseMapper;

    @Override
    public WebResponse createFishCase(FishCase fishCase) {
        fishCase.setCreateTime(new Date());
        fishCase.setRefreshTime(new Date());
        fishCase.setStatus(1);  //可用
        fishCaseMapper.insert(fishCase);
        return new WebResponse().returnMsg("添加成功");
    }

}
