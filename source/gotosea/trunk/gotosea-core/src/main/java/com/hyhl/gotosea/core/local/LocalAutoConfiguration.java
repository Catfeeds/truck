package com.hyhl.gotosea.core.local;

import com.atomikos.jdbc.nonxa.AtomikosNonXADataSourceBean;
import com.hyhl.gotosea.core.common.config.DataSourceProperties;
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

import javax.sql.DataSource;

@Configuration
@ComponentScan
public class LocalAutoConfiguration {

	@Bean
	@ConfigurationProperties("gotosea.datasource.local")
	public DataSourceProperties localDataSourceProperties(){
		return new DataSourceProperties();
	}

	@Bean
	public DataSource localDataSource(@Qualifier("localDataSourceProperties")DataSourceProperties dataSourceProperties){
		AtomikosNonXADataSourceBean  atomikosDataSource = new AtomikosNonXADataSourceBean ();
		atomikosDataSource.setUniqueResourceName("localDataSource");
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
	public SqlSessionFactory localSqlSessionFactory(@Qualifier("localDataSource") DataSource datasource) throws Exception{
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(datasource);
		bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		bean.setMapperLocations(resolver.getResources("classpath*:/**/local/*Mapper.xml"));
		bean.setTypeAliasesPackage("com.hyhl.gotosea.core.local.po");
		return bean.getObject();
	}
	
	@Bean(name="localTransationManager")
	public DataSourceTransactionManager dataSoureTransactionManager(@Qualifier("localDataSource") DataSource datasource){
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(datasource);
		return tm;
	}
	
}
