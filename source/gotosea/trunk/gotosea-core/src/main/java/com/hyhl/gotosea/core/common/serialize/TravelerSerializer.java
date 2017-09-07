package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.cust.po.Traveler;
import com.hyhl.gotosea.core.cust.service.ITravelerServiceCore;
import com.hyhl.gotosea.session.util.AppContextHelper;
import tk.mybatis.mapper.entity.Example;

import java.lang.reflect.Field;
import java.util.List;

/**
*
* @author Leslie.Lam
* @create 2017-08-01 9:15
**/
public class TravelerSerializer extends BaseSerializer<List<Integer>,List<Traveler>> {

    private ITravelerServiceCore iTravelerServiceCore= AppContextHelper.getBean(ITravelerServiceCore.class);

    @Override
    public List<Traveler> beginYourShow(List<Integer> list, Field field) throws Exception {
        List<Traveler> travelers=null;
        if (null!=list&&list.size()>0){
            Example example = new Example(Traveler.class);
            example.createCriteria().andIn("id",list);
            travelers = iTravelerServiceCore.selectByExample(example);
        }
        return travelers;
    }

}
