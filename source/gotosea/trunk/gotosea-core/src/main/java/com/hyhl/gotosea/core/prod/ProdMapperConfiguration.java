package com.hyhl.gotosea.core.prod;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import java.util.Properties;

@Configuration
@AutoConfigureAfter(ProdAutoConfiguration.class)
public class ProdMapperConfiguration {
	@Bean
	public MapperScannerConfigurer prodMapperScannerConfigurer() {
		MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("prodSqlSessionFactory");
		mapperScannerConfigurer.setBasePackage("com.hyhl.gotosea.core.prod.mapper");
		Properties properties = new Properties();
		properties.setProperty("mappers", MyMapper.class.getName());
		properties.setProperty("notEmpty", "false");
		properties.setProperty("IDENTITY", "MYSQL");
		mapperScannerConfigurer.setProperties(properties);
		return mapperScannerConfigurer;
	}
}
