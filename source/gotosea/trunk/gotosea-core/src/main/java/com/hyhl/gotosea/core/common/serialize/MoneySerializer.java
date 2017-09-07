package com.hyhl.gotosea.core.common.serialize;

import java.lang.reflect.Field;
import java.math.BigDecimal;

import com.hyhl.gotosea.core.common.annotation.Money;

/**金钱转换
 * 分-->元
 * @author guan.sj
 */
public class MoneySerializer extends BaseSerializer<Integer,String> {
	
	@Override
	public String beginYourShow(Integer t, Field field) throws Exception {
		Money annotation = field.getAnnotation(Money.class);
		return null!=annotation?doMoney(t, annotation):null;
	}
    
    private String doMoney(Integer vv, Money money)
			throws IllegalAccessException {
		if(money!=null){
			String suffixed = money.suffixed();
			int moveLeftInt = money.moveLeftInt();
			if(vv!=null){
				return new BigDecimal(vv).movePointLeft(moveLeftInt).toString()+suffixed;
			}
		}
		return null;
	}

}
