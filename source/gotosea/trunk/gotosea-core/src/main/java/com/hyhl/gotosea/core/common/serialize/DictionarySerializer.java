package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.ref.service.DictionaryService;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;

/**
* 
* @author Leslie.Lam
* @create 2017-08-10 14:54
**/
public class DictionarySerializer extends BaseSerializer<Integer,String> {

    private static DictionaryService dictionaryService= AppContextHelper.getBean(DictionaryService.class);

    @Override
    public String beginYourShow(Integer code, Field field) throws Exception {
        Dict dict = field.getAnnotation(Dict.class);
        return null!=dict?dictionaryService.getRemarkByNameAndCode(dict.name(),code):null;
    }

}
