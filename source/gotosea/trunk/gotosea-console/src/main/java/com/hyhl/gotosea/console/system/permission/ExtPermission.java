package com.hyhl.gotosea.console.system.permission;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.hfocean.common.auth.system.user.eumn.UserType;

@Documented
@Retention(RUNTIME)
@Target(METHOD)
public @interface ExtPermission {
	ExtPermissionEumn[] values() default {};
	UserType[] userTypes() default {};
}
