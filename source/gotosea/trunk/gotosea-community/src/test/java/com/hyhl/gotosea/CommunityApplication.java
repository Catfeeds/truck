package com.hyhl.gotosea;

import com.hyhl.gotosea.core.comm.CommAutoConfiguration;
import com.hyhl.gotosea.core.common.AutoConfiguration;
import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.local.LocalAutoConfiguration;
import com.hyhl.gotosea.core.order.OrderAutoConfiguration;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import com.hyhl.gotosea.core.rabbitmq.MQAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;
import com.hyhl.gotosea.core.sms.AlidayuAutoConfiguration;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Import;

/**
 * @author guan.sj
 */

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class,MybatisAutoConfiguration.class})
@Import({CommAutoConfiguration.class,
    AutoConfiguration.class,
    RefAutoConfiguration.class,
    ProdAutoConfiguration.class,
    RefAutoConfiguration.class,
    CustAutoConfiguration.class,
    LocalAutoConfiguration.class,
    OrderAutoConfiguration.class,
    MQAutoConfiguration.class,
    OrderAutoConfiguration.class,
    AlidayuAutoConfiguration.class
    })
public class CommunityApplication{

    public static void main(String[] args) {
        SpringApplication.run(CommunityApplication.class, args);
    }

}