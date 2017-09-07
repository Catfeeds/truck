package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.common.annotation.OssPattern;
import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Field;

/**
* 
* @author Leslie.Lam
* @create 2017-08-10 14:54
**/
public class OssPatternSerializer extends BaseSerializer<String,String> {

    @Override
    public String beginYourShow(String url, Field field) throws Exception {
        OssPattern annotation = field.getAnnotation(OssPattern.class);
        if(null!=annotation){
            String[] value = annotation.value();
            if(null!=value&&value.length>0){
                if(!url.contains("?")){
                    url=url+"?"+StringUtils.join(value,"&");
                }else {
                    if(url.endsWith("?")||url.endsWith("&")){
                        url+=StringUtils.join(value,"&");
                    }else {
                        url=url+"&"+StringUtils.join(value,"&");
                    }
                }
            }
        }
        return url;
    }

}
