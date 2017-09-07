package com.hyhl.gotosea.core.util;

import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.net.URL;

public class URLUtil {
    public static String urlToString(String strUrl){
        String result = null;
        try {
            URL url = new URL(strUrl);
            InputStream in =url.openStream();
            result = IOUtils.toString(in, "UTF-8");
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
