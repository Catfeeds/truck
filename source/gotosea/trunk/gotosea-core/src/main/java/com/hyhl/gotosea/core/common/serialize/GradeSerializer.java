package com.hyhl.gotosea.core.common.serialize;

import java.lang.reflect.Field;
import java.math.BigDecimal;

/**
 * 评分转换
 */
public class GradeSerializer extends BaseSerializer<Integer,String> {
	
	@Override
	public String beginYourShow(Integer grade, Field field) throws Exception {
		return new BigDecimal(grade).multiply(new BigDecimal(0.1)).setScale(1, BigDecimal.ROUND_HALF_UP).toString();
	}

}
