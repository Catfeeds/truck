package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.annotation.Split;
import com.hyhl.gotosea.core.local.util.LocalHelper;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-10 14:54
**/
public class SplitSerializer extends BaseSerializer<String,String[]> {

    @Override
    public String[] beginYourShow(String str, Field field) throws Exception {
        Split annotation = field.getAnnotation(Split.class);
        return null==annotation?null: str.split(annotation.value());
    }
}
