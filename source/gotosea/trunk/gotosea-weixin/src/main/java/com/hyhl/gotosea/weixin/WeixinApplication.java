package com.hyhl.gotosea.weixin;

import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * @author guan.sj
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, MybatisAutoConfiguration.class})
public class WeixinApplication{

    public static void main(String[] args) {
        SpringApplication.run(WeixinApplication.class, args);
    }

}