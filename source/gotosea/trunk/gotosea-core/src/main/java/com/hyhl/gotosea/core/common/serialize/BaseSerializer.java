package com.hyhl.gotosea.core.common.serialize;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonStreamContext;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.lang.reflect.Field;

/**jackson序列化
 * 继承该方法，实现doWrite方法
 * @author lin.bc
 */
public abstract class BaseSerializer<T,R> extends JsonSerializer<T> {

	@Override
	public void serialize(T t, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
			throws IOException, JsonProcessingException {
		try {
			JsonStreamContext context = jsonGenerator.getOutputContext();
            Class<?> clazz = context.getCurrentValue().getClass();
            String name = context.getCurrentName();
            Field field=null;
            for(; clazz != Object.class ; clazz = clazz.getSuperclass()) {
                try {
                    field = clazz.getDeclaredField(name) ;
                    break;
                } catch (NoSuchFieldException e) {

                }
            }
            R r = beginYourShow(t,field);
            if(null!=r){
                if(r instanceof String) jsonGenerator.writeString(r.toString());
                else  jsonGenerator.writeObject(r);
            }else {
                jsonGenerator.writeNull();
            }
        } catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public abstract R beginYourShow(T t,  Field field)throws Exception;
}
