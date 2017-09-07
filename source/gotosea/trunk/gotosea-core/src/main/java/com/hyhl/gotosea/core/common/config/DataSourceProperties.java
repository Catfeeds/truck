package com.hyhl.gotosea.core.common.config;

/**
 * 自定义数据源配置
 * @author Administrator
 *
 */
public class DataSourceProperties {

	String url ;
	
	String username;
	
	String password;
	
	String driverClassName;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDriverClassName() {
		return driverClassName;
	}

	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	
	
	
}
