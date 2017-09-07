package com.hyhl.gotosea.community;


import com.hfocean.common.alipay.config.AlipayConfig;
import com.hyhl.gotosea.core.article.ArticleAutoConfiguration;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.comm.CommAutoConfiguration;
import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.local.LocalAutoConfiguration;
//import com.hyhl.gotosea.core.log.LogAutoConfiguration;
import com.hyhl.gotosea.core.order.OrderAutoConfiguration;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import com.hyhl.gotosea.core.rabbitmq.MQAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;
import com.hyhl.gotosea.core.sms.AlidayuAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan
@Import({
        CommAutoConfiguration.class,
        AlidayuAutoConfiguration.class,
        ProdAutoConfiguration.class,
        RefAutoConfiguration.class,
        CustAutoConfiguration.class,
        LocalAutoConfiguration.class,
        OrderAutoConfiguration.class,
        MQAutoConfiguration.class,
        AlipayConfig.class,
        CommAutoConfiguration.class,
        ArticleAutoConfiguration.class
})
public class CommunityAutoConfiguration {
}
