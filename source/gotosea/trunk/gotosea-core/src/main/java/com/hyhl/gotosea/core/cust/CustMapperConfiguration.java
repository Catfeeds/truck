package com.hyhl.gotosea.core.cust;

import java.util.Properties;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hyhl.gotosea.core.common.mapper.MyMapper;

import tk.mybatis.spring.mapper.MapperScannerConfigurer;

/**
 * 通用mapper配置
 * @author guan.sj
 */
@Configuration
@AutoConfigureAfter(CustAutoConfiguration.class)
public class CustMapperConfiguration {
	@Bean
	public MapperScannerConfigurer custMapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("custSqlSessionFactory");
		mapperScannerConfigurer.setBasePackage("com.hyhl.gotosea.core.cust.mapper");
		Properties properties = new Properties();
		properties.setProperty("mappers", MyMapper.class.getName());
		properties.setProperty("notEmpty", "false");
		properties.setProperty("IDENTITY", "MYSQL");
		mapperScannerConfigurer.setProperties(properties);
		return mapperScannerConfigurer;
	}
}
