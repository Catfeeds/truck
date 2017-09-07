package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.local.util.LocalHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;

/**
* 
* @author Leslie.Lam
* @create 2017-08-10 14:54
**/
public class AreaSerializer extends BaseSerializer<Integer,String> {

    private static RedisService redisService= AppContextHelper.getBean(RedisService.class);

    @Override
    public String beginYourShow(Integer code, Field field) throws Exception {
    	Object hget = redisService.hget(LocalHelper.AllAreasAll,code.toString());
        return hget==null?null:hget.toString();
    }
}
