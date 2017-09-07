package com.hyhl.gotosea.console.prod.service.impl;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.prod.dto.ThemeDto;
import com.hyhl.gotosea.console.prod.dto.ThemeServeDto;
import com.hyhl.gotosea.console.prod.service.ThemeService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.mapper.ServiceThemeMapper;
import com.hyhl.gotosea.core.prod.po.ServiceTheme;
import com.hyhl.gotosea.core.prod.po.Theme;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

/**
* 
* @author Leslie.Lam
* @create 2017-09-06 18:16
**/
@Service
@Transactional(transactionManager = "prodTransationManager",readOnly = true)
public class ThemeServiceImpl extends BaseServiceImpl<Theme> implements ThemeService {

    @Resource
    private ServiceThemeMapper serviceThemeMapper;

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void addTheme(ThemeDto param) {
        Theme theme = new Theme(param.getName());
        Assert.isNull(selectOne(theme),"主题名已被使用");
        theme.setPicture(param.getPicture());
        insert(theme);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void updateTheme(ThemeDto param) {
        Theme theme = selectByPrimaryKey(param.getId());
        Assert.notNull(theme,"主题不存在");
        Theme one = selectOne(new Theme(param.getName()));
        if (null!=one&&!Objects.equals(one.getId(),param.getId()))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR,"主题名已被使用");
        theme.setName(param.getName());
        theme.setPicture(param.getPicture());
        updateByPrimaryKey(theme);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void delTheme(Integer id) {
        List<ServiceTheme> list = serviceThemeMapper.select(new ServiceTheme(id));
        if (null!=list&&list.size()>0)throw new BaseBusinessException("FAIL","该主题使用中");
        deleteByPrimaryKey(id);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void addThemeServe(ThemeServeDto param) {
        ServiceTheme st = new ServiceTheme();
        BeanUtils.copyProperties(param,st);
        serviceThemeMapper.insert(st);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void delThemeServe(Integer id) {
        serviceThemeMapper.deleteByPrimaryKey(id);
    }
}
