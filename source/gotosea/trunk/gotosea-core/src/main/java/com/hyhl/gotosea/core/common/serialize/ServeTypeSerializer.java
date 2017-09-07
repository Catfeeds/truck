package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.prod.po.ServiceType;
import com.hyhl.gotosea.core.prod.util.ProdHelper;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Objects;

/**
*
* @author Leslie.Lam
* @create 2017-08-01 9:15
**/
public class ServeTypeSerializer extends BaseSerializer<Integer,String> {

    private ProdHelper prodHelper= AppContextHelper.getBean(ProdHelper.class);

    @Override
    public String beginYourShow(Integer code, Field field) throws Exception {
        List<ServiceType> types = prodHelper.getServeType();
        for (ServiceType type:types){
            if(Objects.equals(code,type.getId()))return type.getName();
        }
        return null;
    }

}
