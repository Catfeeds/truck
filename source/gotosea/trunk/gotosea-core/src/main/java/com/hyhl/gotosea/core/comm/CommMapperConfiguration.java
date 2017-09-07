package com.hyhl.gotosea.core.comm;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

@Configuration
@AutoConfigureAfter(CommAutoConfiguration.class)
@MapperScan(sqlSessionFactoryRef="commSqlSessionFactory",basePackages="com.hyhl.gotosea.core.comm.dao")
public class CommMapperConfiguration {
    @Bean
    public MapperScannerConfigurer commMapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("commSqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.hyhl.gotosea.core.comm.dao");
        Properties properties = new Properties();
        properties.setProperty("mappers", MyMapper.class.getName());
        properties.setProperty("notEmpty", "false");
        properties.setProperty("IDENTITY", "MYSQL");
        mapperScannerConfigurer.setProperties(properties);
        return mapperScannerConfigurer;
    }
}
