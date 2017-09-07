package com.hyhl.gotosea.core.cust.enm;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-14 9:56
 **/
public enum CustFavoriteEnum {

    动态(1),
    活动(2),
    服务(3),
    文章(4),
    天气(5)
    ;

    CustFavoriteEnum(int code) {
        this.code = code;
    }

    private int code;

    public int code() {
        return code;
    }
    
    public static List<Integer> getAllType(){
    	CustFavoriteEnum[] values = CustFavoriteEnum.values();
    	List<Integer> list = new ArrayList<Integer>(values.length);
    	for(CustFavoriteEnum enm : values){
    		list.add(enm.code());
    	}
    	return list;
    }
}
