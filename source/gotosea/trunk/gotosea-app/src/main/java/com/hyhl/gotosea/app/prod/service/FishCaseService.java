package com.hyhl.gotosea.app.prod.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.po.FishCase;
import com.hyhl.gotosea.core.prod.vo.FishCaseVo;

import java.text.ParseException;

public interface FishCaseService extends BaseService<FishCase>{
    FishCaseVo getFishCase() throws ParseException;
}
