package com.hyhl.gotosea.core.common.service.impl;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.session.util.AppContextHelper;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;

public abstract  class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    protected Mapper<T> mapper;
    
    @Override
    public T selectByPrimaryKey(Object key) {
        return mapper.selectByPrimaryKey(key);
    }

    @Override
    public T selectOne(T t) {
        return mapper.selectOne(t);
    }

    @Override
    public List<T> selectAll() {
        return mapper.selectAll();
    }

    @Override
    public int selectCount(T t) {
        return mapper.selectCount(t);
    }

    @Override
    public List<T> select(T t) {
        return mapper.select(t);
    }

    @Override
    public int insert(T t) {
        return mapper.insert(t);
    }

    @Override
    public int insertSelective(T t) {
        return mapper.insertSelective(t);
    }

    @Override
    public int updateByPrimaryKey(T t) {
        return mapper.updateByPrimaryKey(t);
    }

    @Override
    public int updateByPrimaryKeySelective(T t) {
        return mapper.updateByPrimaryKeySelective(t);
    }

    @Override
    public int delete(T t) {
        return mapper.delete(t);
    }

    @Override
    public int deleteByPrimaryKey(Object key) {
        return mapper.deleteByPrimaryKey(key);
    }

    @Override
    public int selectCountByExample(Example example) {
        return mapper.selectCountByExample(example);
    }

    @Override
    public List<T> selectByExample(Example example) {
        return mapper.selectByExample(example);
    }

    @Override
    public int deleteByExample(Example example) {
        return mapper.deleteByExample(example);
    }

    @Override
    public int updateByExample(T t, Example example) {
        return mapper.updateByExample(t,example);
    }

    @Override
    public int updateByExampleSelective(T t, Example example) {
        return mapper.updateByExampleSelective(t,example);
    }

    @Override
    public int batchUpdateSelective(T t,Object[] ids) {
        if(null==ids||0==ids.length) throw new RuntimeException("请选择要操作的目标！");
        int result=0;
        if(null!=ids&&ids.length>0){
            Example example = new Example(t.getClass());
            example.createCriteria().andIn("id",Arrays.asList(ids));
            result= mapper.updateByExampleSelective(t, example);
            if(result!=ids.length)throw new RuntimeException("操作失败！");
        }
        return result;
    }

    @SuppressWarnings("rawtypes")
	@Override
    public int batchDelete(Class clazz,Object[] ids) {
        if(null==ids||0==ids.length) throw new RuntimeException("请选择要删除的目标！");
        Example example = new Example(clazz);
        example.createCriteria().andIn("id",Arrays.asList(ids));
        return mapper.deleteByExample(example);
    }

    @Override
    public <F> Pager<F> selectByPage(PageExcute<F> pageExcute) {
        HttpServletRequest request = AppContextHelper.getRequest();
        String pn = request.getParameter("page");
        int pageNumber = (null==pn||"".equals(pn)||Integer.parseInt(pn)<0)?1:Integer.parseInt(pn);
        String ps = request.getParameter("size");
        int pageSize = (null==ps||"".equals(ps)||Integer.parseInt(ps)<0)?10:Integer.parseInt(ps);
        PageHelper.startPage(pageNumber,pageSize,true);
        PageInfo<F> pageInfo = new PageInfo(pageExcute.excute());
        Pager<F> pager = new Pager<>();
        pager.setContent(pageInfo.getList());
        pager.setPageNumber(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setTotalElements(pageInfo.getTotal());
        pager.setTotalPages(pageInfo.getPages());
        return pager;
    }
}
