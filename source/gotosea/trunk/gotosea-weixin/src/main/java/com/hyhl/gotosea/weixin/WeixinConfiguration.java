package com.hyhl.gotosea.weixin;

import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;


/**
 * 主配置类
 * @author guan.sj
 *
 */
@Import({RefAutoConfiguration.class, CustAutoConfiguration.class, ProdAutoConfiguration.class})
@Configuration
public class WeixinConfiguration {
	
	
}
