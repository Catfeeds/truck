package com.hyhl.gotosea.core.util;

import java.util.UUID;

/**
 * varchar主键生成策略
 * @author guan.sj
 */
public class PrimaryKeyGenerator {
	
	public static String generate(){
		return new ObjectId().toHexString();
	}

	public static String generateForNum(){
		int hashCodeV = UUID.randomUUID().toString().hashCode();
		if(hashCodeV < 0) {//有可能是hashCodeV = - hashCode}
			// 0 代表前面补充0
			// 4 代表长度为4
			// d 代表参数为正数型
			hashCodeV = - hashCodeV;
		}
		return String.format("%010d", hashCodeV);
	}
	
}
