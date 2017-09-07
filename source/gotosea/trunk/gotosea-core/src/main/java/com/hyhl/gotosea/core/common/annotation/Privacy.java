package com.hyhl.gotosea.core.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.PrivacySerializer;


/**关键信息隐藏
 * @author guan.sj
 */
@Target(java.lang.annotation.ElementType.FIELD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)    
@JacksonAnnotationsInside
@JsonSerialize(using = PrivacySerializer.class)
@Documented
public @interface Privacy {

	//显示
	String display() default "*";
	//开始位置 
	int beginIndex() default 1;//第二位开始
	//结束位置
	int endIndex() default -1;
	
}
