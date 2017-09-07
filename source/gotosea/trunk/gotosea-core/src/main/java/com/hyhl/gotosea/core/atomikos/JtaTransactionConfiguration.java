package com.hyhl.gotosea.core.atomikos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.jta.JtaTransactionManager;

/**
 * JTA 分布式事务配置类
 * @author Gene
 *
 */
@EnableTransactionManagement
@Configuration
public class JtaTransactionConfiguration  {
	
    @Autowired
    private AtomikosJtaConfiguration jtaConfiguration;

    @Bean
    @DependsOn("userTransactionService")
    @Primary
    public PlatformTransactionManager platformTransactionManager()  throws Throwable {
        return new JtaTransactionManager(jtaConfiguration.userTransaction(), jtaConfiguration.transactionManager());
    }
}