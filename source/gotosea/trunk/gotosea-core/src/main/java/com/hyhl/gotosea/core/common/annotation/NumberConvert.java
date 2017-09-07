package com.hyhl.gotosea.core.common.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.NumberConvertSerializer;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;


/**
 * 分/100=元
 */
@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)    
@JacksonAnnotationsInside
@JsonSerialize(using = NumberConvertSerializer.class)
@Documented
public @interface NumberConvert {

    int multiple() default 1;

    int divide() default 1;
}
