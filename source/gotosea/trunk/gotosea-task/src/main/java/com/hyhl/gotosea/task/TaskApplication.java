package com.hyhl.gotosea.task;


import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;


@SpringBootApplication(exclude = {
		SessionAutoConfiguration.class,
		XADataSourceAutoConfiguration.class,DataSourceAutoConfiguration.class, MybatisAutoConfiguration.class})
public class TaskApplication{
	
    public static void main(String[] args) {
        SpringApplication.run(TaskApplication.class, args);
    }

}