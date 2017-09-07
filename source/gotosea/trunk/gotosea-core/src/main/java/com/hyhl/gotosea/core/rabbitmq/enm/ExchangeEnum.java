package com.hyhl.gotosea.core.rabbitmq.enm;

/**交换机枚举
 * @author guan.sj
 */
public enum ExchangeEnum {
	
	/**	默认交换机key */
	DEFAULT_EXCHANGE("gotosea.topic"),
	
	;
	
	String key;
	
	ExchangeEnum(String key){
		this.key = key;
	}
	
	public String getKey(){
		return this.key;
	}
	
}
