package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.local.util.LocalHelper;
import com.hyhl.gotosea.core.prod.util.ProdHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;

/**定位点id-名称
 * @author guan.sj
 */
public class PubResourceSerializer extends BaseSerializer<Integer,String> {

    private static RedisService redisService= AppContextHelper.getBean(RedisService.class);

	@Override
	public String beginYourShow(Integer integer, Field field) throws Exception {
		return redisService.hget(ProdHelper.PUB_RESOURCE_NAME, integer.toString()).toString();
	}

}
