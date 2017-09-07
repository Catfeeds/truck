package com.hyhl.gotosea.app.prod.service.impl;

import com.hyhl.gotosea.app.prod.service.FishCaseService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.mapper.FishCaseMapper;
import com.hyhl.gotosea.core.prod.po.FishCase;
import com.hyhl.gotosea.core.prod.vo.FishCaseVo;
import com.hyhl.gotosea.core.util.DateUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@Transactional(transactionManager = "prodTransationManager",readOnly = true)
public class FishCaseServiceImpl extends BaseServiceImpl<FishCase> implements FishCaseService{
    @Resource
    private FishCaseMapper fishCaseMapper;

    @Override
    public FishCaseVo getFishCase() throws ParseException {
        List<FishCase> fishCaseList = fishCaseMapper.selectAll();
        if (fishCaseList==null || fishCaseList.size()<=0)
            return null;
        FishCase fishCase = fishCaseList.get(0);
        FishCaseVo fishCaseVo = new FishCaseVo();
        BeanUtils.copyProperties(fishCase,fishCaseVo);

        Date fishDate = DateUtil.dateTimeToDate(fishCase.getRefreshTime());
        Date today = DateUtil.dateTimeToDate(new Date());
        Integer days = DateUtil.daysBetween(today,fishDate);
        if (fishDate.equals(today))
            fishCaseVo.setShowTime("今天");
        else if (days==1)
            fishCaseVo.setShowTime("昨天");
        else if (days==2)
            fishCaseVo.setShowTime("前天");
        else{
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            fishCaseVo.setShowTime(sdf.format(fishCase.getRefreshTime()));
        }
        return fishCaseVo;
    }
}
