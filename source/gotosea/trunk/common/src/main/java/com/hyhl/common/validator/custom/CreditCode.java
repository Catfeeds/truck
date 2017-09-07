package com.hyhl.common.validator.custom;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * 社会统一信用代码
 */
@Constraint(validatedBy = CreditCodeValidator.class)
@Target(java.lang.annotation.ElementType.FIELD)
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Documented
public @interface CreditCode {
	String message() default "社会统一信用代码格式不正确";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
