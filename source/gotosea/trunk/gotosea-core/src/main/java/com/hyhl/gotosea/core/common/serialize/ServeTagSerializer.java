package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

/**
*
* @author Leslie.Lam
* @create 2017-08-01 9:15
**/
public class ServeTagSerializer extends BaseSerializer<List<Integer>,List<Object>> {

    private RedisService redisService= AppContextHelper.getBean(RedisService.class);

    @Override
    public List<Object> beginYourShow(List<Integer> list, Field field) throws Exception {
        return null!=list&&list.size()>0?list.stream().map(e->redisService.hget(RefHelper.FEATURE_TAG,e.toString())).collect(Collectors.toList()):null;
    }

}
