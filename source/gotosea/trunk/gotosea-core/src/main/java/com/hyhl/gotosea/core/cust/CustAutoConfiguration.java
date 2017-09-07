package com.hyhl.gotosea.core.cust;

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
 * 客户类数据源配置
 * @author guan.sj
 */
@Configuration
@ComponentScan
public class CustAutoConfiguration {

	@Bean
	@ConfigurationProperties("gotosea.datasource.cust")
	public DataSourceProperties custDataSourceProperties(){
		return new DataSourceProperties();
	}

	@Bean
	public DataSource custDataSource(@Qualifier("custDataSourceProperties")DataSourceProperties custDataSourceProperties){
		AtomikosNonXADataSourceBean  atomikosDataSource = new AtomikosNonXADataSourceBean ();
		atomikosDataSource.setUniqueResourceName("custDataSource");
		atomikosDataSource.setDriverClassName(custDataSourceProperties.getDriverClassName());
		atomikosDataSource.setUrl(custDataSourceProperties.getUrl());
		atomikosDataSource.setUser(custDataSourceProperties.getUsername());
		atomikosDataSource.setPassword(custDataSourceProperties.getPassword());
		atomikosDataSource.setMinPoolSize(5);
		atomikosDataSource.setMaxPoolSize(20);
		atomikosDataSource.setTestQuery("SELECT 1");
		return atomikosDataSource;
	}


	@Bean
	public SqlSessionFactory custSqlSessionFactory(@Qualifier("custDataSource") DataSource datasource) throws Exception{
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(datasource);
		bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		bean.setMapperLocations(resolver.getResources("classpath*:/com/hyhl/gotosea/dao/mybatis/cust/*Mapper.xml"));
		bean.setTypeAliasesPackage("com.hyhl.gotosea.core.cust.po");
		return bean.getObject();
	}
	
	@Bean(name="custTransationManager")
	public DataSourceTransactionManager dataSoureTransactionManager(@Qualifier("custDataSource") DataSource datasource){
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(datasource);
		return tm;
	}
	
}
