package com.hyhl.gotosea.app;

import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * @author guan.sj
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, MybatisAutoConfiguration.class})
public class AppApplication extends SpringBootServletInitializer{

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }
    
    public static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
        return builder.sources(AppApplication.class);
    }

}