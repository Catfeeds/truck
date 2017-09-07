package com.hyhl.gotosea.core.atomikos;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.transaction.TransactionManager;
import javax.transaction.UserTransaction;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.jta.atomikos.AtomikosProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import com.atomikos.icatch.config.UserTransactionService;
import com.atomikos.icatch.config.UserTransactionServiceImp;
import com.atomikos.icatch.jta.UserTransactionImp;
import com.atomikos.icatch.jta.UserTransactionManager;

/**
 * Atomikos 配置
 * 由于Spring boot原来的AtomikosJtaConfiguration仅支持单个事务处理器，因此需在这里另外配置Atomikos
 * 此配置类引用了Spring Boot的AtomikosProperties类
 * https://www.atomikos.com/bin/view/Documentation/SpringIntegration
 * @author Gene
 *
 */
@Configuration
@EnableConfigurationProperties(AtomikosProperties.class)
public class AtomikosJtaConfiguration {
	
	/**
	 * The Advanced Case (As of 3.3)
	 * */
    @Bean(initMethod = "init", destroyMethod = "shutdownForce")
    public UserTransactionService userTransactionService(AtomikosProperties properties) throws Throwable {
    	//将实例IP地址拼接到配置好的TransactionManagerUniqueName前面，如果TransactionManagerUniqueName为null，不进行拼接
    	if(properties.getTransactionManagerUniqueName() != null){
            try {
                InetAddress address = InetAddress.getLocalHost();
                String ip = address.getHostAddress();
                properties.setTransactionManagerUniqueName(ip + "_" +properties.getTransactionManagerUniqueName());
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
    	}

        UserTransactionServiceImp service = new UserTransactionServiceImp(properties.asProperties());
        return service;
    }
    
    
    @Bean(initMethod = "init", destroyMethod = "close")
    @DependsOn("userTransactionService")
    public TransactionManager transactionManager() throws Throwable {
        UserTransactionManager userTransactionManager = new UserTransactionManager();
        userTransactionManager.setForceShutdown(false);
        userTransactionManager.setStartupTransactionService(false);
        return userTransactionManager;
    }
	
    @Bean
    public UserTransaction userTransaction() throws Throwable {
        UserTransactionImp userTransactionImp = new UserTransactionImp();
        userTransactionImp.setTransactionTimeout(1000);
        return userTransactionImp;
    }
	
	
	/**
	 * The Basic Case (Pre-3.3)
	 * 
    @Bean
    public UserTransaction userTransaction() throws Throwable {
        UserTransactionImp userTransactionImp = new UserTransactionImp();
        return userTransactionImp;
    }

    @Bean(initMethod = "init", destroyMethod = "close")
    public TransactionManager transactionManager() throws Throwable {
        UserTransactionManager userTransactionManager = new UserTransactionManager();
        userTransactionManager.setForceShutdown(false);
        return userTransactionManager;
    }
    
    */
}