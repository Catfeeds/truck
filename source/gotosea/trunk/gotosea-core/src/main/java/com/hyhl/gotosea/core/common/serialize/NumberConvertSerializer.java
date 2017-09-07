package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.annotation.NumberConvert;

import java.lang.reflect.Field;

/**
 *
 */
public class NumberConvertSerializer extends BaseSerializer<Integer,Integer> {
	
	@Override
	public Integer beginYourShow(Integer t, Field field) throws Exception {
		NumberConvert annotation = field.getAnnotation(NumberConvert.class);
        return null!=annotation?(t*annotation.multiple())/annotation.divide():null;
	}
    
}
