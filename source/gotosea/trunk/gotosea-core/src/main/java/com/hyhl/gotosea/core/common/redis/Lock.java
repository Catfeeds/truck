package com.hyhl.gotosea.core.common.redis;

public class Lock {
	private String name;
	private String value;
	
	public Lock(String name) {
		this.name = name;
		this.value = "lock";
	}

	public Lock(String name,String value) {
		this.name = name;
		this.value = value;
	}
	

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}
}
