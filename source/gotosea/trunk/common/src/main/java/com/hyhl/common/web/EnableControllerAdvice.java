package com.hyhl.common.web;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

import org.springframework.context.annotation.ComponentScan;

import com.hyhl.common.web.controller.CustomErrorController;

/**
 * 用于启用默认错误控制器的注释
 * @author Gene
 *
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@ComponentScan(basePackageClasses=CustomErrorController.class)
public @interface EnableControllerAdvice {

}
