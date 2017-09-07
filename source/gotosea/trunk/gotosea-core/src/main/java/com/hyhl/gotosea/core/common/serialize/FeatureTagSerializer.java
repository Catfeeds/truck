package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**特征标签id-名称 
 * @author guan.sj
 */
public class FeatureTagSerializer extends BaseSerializer<Object,Object> {

    private static RedisService redisService= AppContextHelper.getBean(RedisService.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Object beginYourShow(Object integer, Field field) throws Exception {
		if(integer instanceof Integer){
			Integer id = (Integer)integer;
			return redisService.hget(RefHelper.FEATURE_TAG,id.toString()).toString();
		}else if(integer instanceof List){
			List<Integer> ids = (List)integer;
			List<String> names = new ArrayList<String>(ids.size());
			for(Integer id : ids){
				names.add(redisService.hget(RefHelper.FEATURE_TAG,id.toString()).toString());
			}
			return names;
		}
		return null;
	}

}
