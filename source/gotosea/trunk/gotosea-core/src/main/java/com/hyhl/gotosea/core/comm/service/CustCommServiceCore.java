package com.hyhl.gotosea.core.comm.service;

import com.hyhl.gotosea.core.comm.vo.CustCommVo;
import com.hyhl.gotosea.core.comm.vo.CustEvaVo;
import com.hyhl.gotosea.core.common.service.BaseService;

public interface CustCommServiceCore{
    public CustCommVo getCommVo(String custId) throws Exception;
    CustEvaVo getCustEvaVo(String custId) throws Exception;
}
