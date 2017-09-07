package com.hyhl.gotosea.core.order;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.atomikos.jdbc.nonxa.AtomikosNonXADataSourceBean;
import com.hyhl.gotosea.core.common.config.DataSourceProperties;

/**
 * 订单配置类
 * @author Gene
 *
 */
@Configuration
@ComponentScan
public class OrderAutoConfiguration {

	@Bean
	@ConfigurationProperties("gotosea.datasource.order")
	public DataSourceProperties orderDataSourceProperties(){
		return new DataSourceProperties();
	}
	
	@Bean
	public DataSource orderDataSource(@Qualifier("orderDataSourceProperties")DataSourceProperties dataSourceProperties){
		AtomikosNonXADataSourceBean  atomikosDataSource = new AtomikosNonXADataSourceBean ();
	    atomikosDataSource.setUniqueResourceName("orders");
	    atomikosDataSource.setDriverClassName(dataSourceProperties.getDriverClassName());
	    atomikosDataSource.setUrl(dataSourceProperties.getUrl());
	    atomikosDataSource.setUser(dataSourceProperties.getUsername());
	    atomikosDataSource.setPassword(dataSourceProperties.getPassword());
	    atomikosDataSource.setMinPoolSize(5);
	    atomikosDataSource.setMaxPoolSize(20);
	    atomikosDataSource.setTestQuery("SELECT 1");
		return atomikosDataSource;
	}

    
    @Bean
    public SqlSessionFactory orderSqlSessionFactory(@Qualifier("orderDataSource") DataSource datasource) throws Exception{
    	SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
    	bean.setDataSource(datasource);
    	bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		bean.setMapperLocations(resolver.getResources("classpath*:/**/order/*Mapper.xml"));
		bean.setTypeAliasesPackage("com.hyhl.gotosea.core.order.po");
    	return bean.getObject();
    }

	@Bean
	public DataSourceTransactionManager orderTransationManager(@Qualifier("orderDataSource") DataSource datasource){
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(datasource);
		return tm;
	}
	
	
}