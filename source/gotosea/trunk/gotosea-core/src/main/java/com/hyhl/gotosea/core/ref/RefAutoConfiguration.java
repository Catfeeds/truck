package com.hyhl.gotosea.core.ref;

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

@ComponentScan
@Configuration
public class RefAutoConfiguration {
	@Bean
	@ConfigurationProperties("gotosea.datasource.ref")
	public DataSourceProperties refDataSourceProperties(){
		return new DataSourceProperties();
	}

	@Bean
	public DataSource refDataSource(@Qualifier("refDataSourceProperties")DataSourceProperties customDataSourceProperties){
		AtomikosNonXADataSourceBean refDs = new AtomikosNonXADataSourceBean ();
		refDs.setUniqueResourceName("refDataSource");
		refDs.setDriverClassName(customDataSourceProperties.getDriverClassName());
		refDs.setUrl(customDataSourceProperties.getUrl());
		refDs.setUser(customDataSourceProperties.getUsername());
		refDs.setPassword(customDataSourceProperties.getPassword());
		refDs.setMinPoolSize(5);
		refDs.setMaxPoolSize(20);
		refDs.setTestQuery("SELECT 1");
		return refDs;
	}


	@Bean
	public SqlSessionFactory refSqlSessionFactory(@Qualifier("refDataSource")DataSource dataSource) throws Exception{
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		bean.setMapperLocations(resolver.getResources("classpath*:/com/hyhl/gotosea/dao/mybatis/ref/*Mapper.xml"));
		bean.setTypeAliasesPackage("com.hyhl.gotosea.core.ref.po");
		return bean.getObject();
	}

	@Bean(name="refTransationManager")
	public DataSourceTransactionManager dataSoureTransactionManager(@Qualifier("refDataSource") DataSource datasource){
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(datasource);
		return tm;
	}
}
