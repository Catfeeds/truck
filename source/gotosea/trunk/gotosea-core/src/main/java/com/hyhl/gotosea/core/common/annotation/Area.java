package com.hyhl.gotosea.core.common.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.AreaSerializer;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;


@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@JsonSerialize(using = AreaSerializer.class)
@Documented
public @interface Area {


}
