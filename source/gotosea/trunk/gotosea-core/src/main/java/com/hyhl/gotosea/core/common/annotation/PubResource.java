package com.hyhl.gotosea.core.common.annotation;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.LocatorSerializer;
import com.hyhl.gotosea.core.common.serialize.PubResourceSerializer;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;


/**公共资源id-名称
 * @author guan.sj
 */
@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@JsonSerialize(using = PubResourceSerializer.class)
@Documented
public @interface PubResource {


}
