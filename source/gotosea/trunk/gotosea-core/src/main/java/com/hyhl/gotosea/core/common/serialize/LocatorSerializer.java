package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.local.util.LocalHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;

/**定位点id-名称
 * @author guan.sj
 */
public class LocatorSerializer extends BaseSerializer<Integer,String> {

    private static RedisService redisService= AppContextHelper.getBean(RedisService.class);

	@Override
	public String beginYourShow(Integer integer, Field field) throws Exception {
		return redisService.hget(LocalHelper.AllLocator, integer.toString()).toString();
	}

}
