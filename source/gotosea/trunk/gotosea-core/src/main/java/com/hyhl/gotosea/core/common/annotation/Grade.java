package com.hyhl.gotosea.core.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.GradeSerializer;


/**
 * 评分转换
 */
@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)    
@JacksonAnnotationsInside
@JsonSerialize(using = GradeSerializer.class)
@Documented
public @interface Grade {

}
