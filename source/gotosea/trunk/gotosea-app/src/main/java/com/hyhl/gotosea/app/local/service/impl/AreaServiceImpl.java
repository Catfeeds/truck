package com.hyhl.gotosea.app.local.service.impl;

import com.hyhl.gotosea.app.local.service.AreaService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.local.mapper.AreaMapper;
import com.hyhl.gotosea.core.local.po.Area;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-05 15:20
**/
@Service
@Transactional(transactionManager = "localTransationManager",readOnly = true)
public class AreaServiceImpl extends BaseServiceImpl<Area> implements AreaService{

    @Resource
    private AreaMapper areaMapper;

    @Override
    public List<Integer> selectAreaIdsByPAreaId(Integer[] pAreaIds) {
        return areaMapper.selectAreaIdsByPAreaId(StringUtils.join(pAreaIds,","));
    }
}
