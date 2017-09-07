package com.hyhl.common.validator.custom;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * 身份证号
 */
@Constraint(validatedBy = IdCardValidator.class)
@Target(java.lang.annotation.ElementType.FIELD)
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Documented
public @interface IdCard {
	String message() default "身份证号码格式不正确";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
