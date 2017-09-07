package com.hyhl.gotosea.core.ref.serializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

/**
 * @author guan.sj
 */
public class FeatureTagsToStringSerializer extends JsonSerializer<List<Integer>> {

    private RedisService redisService= AppContextHelper.getBean(RedisService.class);

    @Override
    public void serialize(List<Integer> list, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        List<Object> tags=null;
        if(null!=list&&list.size()>0){
            tags=new ArrayList<>(list.size());
            Object temp;
            for (Integer tag:list){
                temp=redisService.hget(RefHelper.FEATURE_TAG,tag.toString());
                if (null!=temp)tags.add(temp);
            }
        }
        String result = null;
        if(tags!=null&&tags.size()>0){
        	result = StringUtils.join(tags,",");
        }
        jsonGenerator.writeObject(result);
    }
}
