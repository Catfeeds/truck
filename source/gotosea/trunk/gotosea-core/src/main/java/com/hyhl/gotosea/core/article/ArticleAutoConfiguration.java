package com.hyhl.gotosea.core.article;

import com.atomikos.jdbc.nonxa.AtomikosNonXADataSourceBean;
import com.github.pagehelper.PageInterceptor;
import com.hyhl.gotosea.core.common.config.DataSourceProperties;
import org.apache.ibatis.plugin.Interceptor;
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
import java.util.Properties;

@Configuration
@ComponentScan
public class ArticleAutoConfiguration {
    @Bean
    @ConfigurationProperties("gotosea.datasource.article")
    public DataSourceProperties articleDataSourceProperties(){
        return new DataSourceProperties();
    }

    @Bean
    public DataSource articleDataSource(@Qualifier("articleDataSourceProperties")DataSourceProperties articleDataSourceProperties){
        AtomikosNonXADataSourceBean atomikosDataSource = new AtomikosNonXADataSourceBean ();
        atomikosDataSource.setUniqueResourceName("articleDataSource");
        atomikosDataSource.setDriverClassName(articleDataSourceProperties.getDriverClassName());
        atomikosDataSource.setUrl(articleDataSourceProperties.getUrl());
        atomikosDataSource.setUser(articleDataSourceProperties.getUsername());
        atomikosDataSource.setPassword(articleDataSourceProperties.getPassword());
        atomikosDataSource.setMinPoolSize(5);
        atomikosDataSource.setMaxPoolSize(20);
        atomikosDataSource.setTestQuery("SELECT 1");
        return atomikosDataSource;
    }

    @Bean
    public SqlSessionFactory articleSqlSessionFactory(@Qualifier("articleDataSource") DataSource datasource) throws Exception{
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(datasource);
        bean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        bean.setMapperLocations(resolver.getResources("classpath*:/com/hyhl/gotosea/dao/mybatis/article/*Mapper.xml"));
        bean.setTypeAliasesPackage("com.hyhl.gotosea.core.article.po,com.hyhl.gotosea.core.article.dto");

        return bean.getObject();
    }

    @Bean(name="articleTransationManager")
    public DataSourceTransactionManager dataSoureTransactionManager(@Qualifier("articleDataSource") DataSource datasource){
        DataSourceTransactionManager tm = new DataSourceTransactionManager();
        tm.setDataSource(datasource);
        return tm;
    }
}
