package com.hyhl.gotosea.app;

import com.hfocean.common.alipay.config.AlipayConfig;
import com.hyhl.gotosea.core.comm.CommAutoConfiguration;
import com.hyhl.gotosea.core.rabbitmq.MQAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.hfocean.common.oss.AutoConfiguration;
import com.hyhl.common.web.EnableControllerAdvice;
import com.hyhl.gotosea.app.web.interceptor.SecurityInterceptor;
import com.hyhl.gotosea.community.CommunityAutoConfiguration;
import com.hyhl.gotosea.core.article.ArticleAutoConfiguration;
import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.local.LocalAutoConfiguration;
import com.hyhl.gotosea.core.order.OrderAutoConfiguration;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;
import com.hyhl.gotosea.core.sms.AlidayuAutoConfiguration;

@Configuration
@Import({
	CustAutoConfiguration.class,
	AlidayuAutoConfiguration.class,
        ProdAutoConfiguration.class,
		RefAutoConfiguration.class,
		CustAutoConfiguration.class,
		LocalAutoConfiguration.class,
		AutoConfiguration.class,
		OrderAutoConfiguration.class,
        MQAutoConfiguration.class,
		AlipayConfig.class,
		CommAutoConfiguration.class,
		ArticleAutoConfiguration.class,
		CustAutoConfiguration.class,
		CommunityAutoConfiguration.class
	})
@EnableControllerAdvice
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 86400*3)
public class AppConfiguration extends WebMvcConfigurerAdapter{
	
	@Autowired
	SecurityInterceptor securityInterceptor; 
	
	/**
	 * 添加拦截器
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(securityInterceptor)
		.addPathPatterns("/**");
	}
	
}
