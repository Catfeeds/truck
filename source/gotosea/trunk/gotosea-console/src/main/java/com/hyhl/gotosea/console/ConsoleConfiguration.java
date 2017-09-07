package com.hyhl.gotosea.console;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.hfocean.common.alipay.config.AlipayConfig;
import com.hfocean.common.oss.AutoConfiguration;
import com.hyhl.common.web.EnableControllerAdvice;
import com.hyhl.gotosea.console.system.resolver.AnnotationParameterResolver;
import com.hyhl.gotosea.console.web.interceptor.SecurityInterceptor;
import com.hyhl.gotosea.core.article.ArticleAutoConfiguration;
import com.hyhl.gotosea.core.comm.CommAutoConfiguration;
import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.local.LocalAutoConfiguration;
import com.hyhl.gotosea.core.order.OrderAutoConfiguration;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import com.hyhl.gotosea.core.rabbitmq.MQAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;
import com.hyhl.gotosea.core.sms.AlidayuAutoConfiguration;

/**
 * 主配置类
 * @author Administrator
 *
 */
@Configuration
@Import({AlidayuAutoConfiguration.class,
	AutoConfiguration.class,
	RefAutoConfiguration.class,
	ProdAutoConfiguration.class,
	CustAutoConfiguration.class,
	LocalAutoConfiguration.class,
	OrderAutoConfiguration.class,
	MQAutoConfiguration.class,
		CommAutoConfiguration.class,
		AlipayConfig.class,
ArticleAutoConfiguration.class})
@EnableControllerAdvice
public class ConsoleConfiguration extends WebMvcConfigurerAdapter{

	@Resource
	SecurityInterceptor securityInterceptor; 

	/**
	 * 添加拦截器
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(securityInterceptor)
		.addPathPatterns("/**")
		.excludePathPatterns("auth/login");
	}
	
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        super.addArgumentResolvers(argumentResolvers);
        argumentResolvers.add(new AnnotationParameterResolver());
    }

}
