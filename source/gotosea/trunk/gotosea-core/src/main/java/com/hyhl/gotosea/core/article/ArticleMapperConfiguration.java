package com.hyhl.gotosea.core.article;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

@Configuration
@AutoConfigureAfter(ArticleAutoConfiguration.class)
public class ArticleMapperConfiguration {
    @Bean
    public MapperScannerConfigurer artMapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("articleSqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.hyhl.gotosea.core.article.dao");
        Properties properties = new Properties();
        properties.setProperty("mappers", MyMapper.class.getName());
        properties.setProperty("notEmpty", "false");
        properties.setProperty("IDENTITY", "MYSQL");
        mapperScannerConfigurer.setProperties(properties);
        return mapperScannerConfigurer;
    }
}
