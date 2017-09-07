package com.hyhl.gotosea.core.common.oss;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-07-28 16:25
**/
public class PathHandler {

    public static String getStorePath(PathEnum pathEnum,String fileName){
        String path=null;
        switch (pathEnum){
            case ARTICLE_HEML:
            case ARTICLE_IMAGE:
            case ARTICLE_ATTACHMENT:
            case CUST:
            case SYS_ADVERT:
            case SYS_TAG:
            case PROD_IMAGE:
            case SOCIAL:
                path=new StringBuffer(pathEnum.path()).append(new SimpleDateFormat("yyyy/MMdd/").format(new Date())).append(fileName).toString();
                break;
            case PROD_HTML:
            case RELEASE_ANDROID:
                path=new StringBuffer(pathEnum.path()).append(fileName).toString();
                break;
            case RELEASE_IOS:
                break;
            default: break;
        }

        return path;
    }

    /**
     * 获取文件后缀
     */
    public static String suffix(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".")).trim();
    }
}
