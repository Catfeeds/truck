package com.hyhl.gotosea.core.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.MoneySerializer;


/**金钱转换
 * 分-->元+"元"
 * 100-->1.00元
 * @author guan.sj
 */
@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)    
@JacksonAnnotationsInside
@JsonSerialize(using = MoneySerializer.class)
@Documented
public @interface Money {
	//后缀
	String suffixed() default "";
	//左移位数 
	int moveLeftInt() default 2;
}
