package com.hyhl.gotosea.core.common.serialize;

import java.lang.reflect.Field;

import com.hyhl.gotosea.core.common.annotation.Privacy;

/**敏感词隐藏
 * @author guan.sj
 */
public class PrivacySerializer extends BaseSerializer<String,String> {
	
	@Override
	public String beginYourShow(String t, Field field) throws Exception {
		Privacy annotation = field.getAnnotation(Privacy.class);
		return null!=annotation?doPrivacy(t, annotation):null;
	}
    
    private String doPrivacy(String vv, Privacy privacy)
			throws IllegalAccessException {
		if(privacy!=null){
			String display = privacy.display();
			int beginIndex = privacy.beginIndex();
			int endIndex = privacy.endIndex();
			if(vv!=null){
				if(!vv.trim().equals("")){
					int len = vv.length();
					beginIndex = (beginIndex>=len || beginIndex<0)?0:beginIndex;
					endIndex = (-endIndex>len || endIndex>=0)?len:len+endIndex+1;
					StringBuilder newStr = new StringBuilder(display);
					int num = endIndex-beginIndex;
					for(int i=1;i<num;i++){
						newStr.append(display);
					}
					StringBuilder sb = new StringBuilder(vv);
					return sb.replace(beginIndex, endIndex, newStr.toString()).toString();
				}
			}
		}
		return null;
	}
}
