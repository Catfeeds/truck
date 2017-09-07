package com.hyhl.gotosea.core.comm;

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
public class CommAutoConfiguration {
    @Bean
    @ConfigurationProperties("gotosea.datasource.comm")
    public DataSourceProperties commeDataSourceProperties(){
        return new DataSourceProperties();
    }

    @Bean
    public DataSource commDataSource(@Qualifier("commeDataSourceProperties")DataSourceProperties commDataSourceProperties){
        AtomikosNonXADataSourceBean atomikosDataSource = new AtomikosNonXADataSourceBean ();
        atomikosDataSource.setUniqueResourceName("commDataSource");
        atomikosDataSource.setDriverClassName(commDataSourceProperties.getDriverClassName());
        atomikosDataSource.setUrl(commDataSourceProperties.getUrl());
        atomikosDataSource.setUser(commDataSourceProperties.getUsername());
        atomikosDataSource.setPassword(commDataSourceProperties.getPassword());
        atomikosDataSource.setMinPoolSize(5);
        atomikosDataSource.setMaxPoolSize(20);
        atomikosDataSource.setTestQuery("SELECT 1");
        return atomikosDataSource;
    }


    @Bean
    public SqlSessionFactory commSqlSessionFactory(@Qualifier("commDataSource") DataSource datasource) throws Exception{
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(datasource);
        bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        bean.setMapperLocations(resolver.getResources("classpath*:/com/hyhl/gotosea/dao/mybatis/comm/*Mapper.xml"));
        bean.setTypeAliasesPackage("com.hyhl.gotosea.core.comm.po,com.hyhl.gotosea.core.comm.dto");

        return bean.getObject();
    }

    @Bean(name="commTransactionManager")
    public DataSourceTransactionManager dataSoureTransactionManager(@Qualifier("commDataSource") DataSource datasource){
        DataSourceTransactionManager tm = new DataSourceTransactionManager();
        tm.setDataSource(datasource);
        return tm;
    }
}
