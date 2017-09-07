package com.hyhl.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target(java.lang.annotation.ElementType.METHOD )    
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)    
@Documented
public @interface Login {
	/**商家认证权限
	 * @return
	 */
	boolean merchantAuth() default false;
}
