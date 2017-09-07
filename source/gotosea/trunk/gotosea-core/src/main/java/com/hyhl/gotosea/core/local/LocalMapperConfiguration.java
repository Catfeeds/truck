package com.hyhl.gotosea.core.local;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

@Configuration
@AutoConfigureAfter(LocalAutoConfiguration.class)
public class LocalMapperConfiguration {
	@Bean
	public MapperScannerConfigurer localMapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("localSqlSessionFactory");
		mapperScannerConfigurer.setBasePackage("com.hyhl.gotosea.core.local.mapper");
		Properties properties = new Properties();
		properties.setProperty("mappers", MyMapper.class.getName());
		properties.setProperty("notEmpty", "false");
		properties.setProperty("IDENTITY", "MYSQL");
		mapperScannerConfigurer.setProperties(properties);
		return mapperScannerConfigurer;
	}
}
