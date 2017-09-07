package com.hyhl.common.util;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.groups.Default;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;

/**
 * Created by lin.bc on 2017/1/9.
 */
public class ValidateUtil {

    static {
        ValidatorFactory vf = Validation.buildDefaultValidatorFactory();
         validator = vf.getValidator();
    }

    private static Validator validator;

    public static <T> void validate(T obj){
        Set<ConstraintViolation<T>> set = validator.validate(obj,Default.class);
        if(null!=set&&set.size()>0){
            for(ConstraintViolation<T> cv : set){
                throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),cv.getMessage());
            }
        }
    }

    public static <T> void validateProperty(T obj,String propertyName){
        Set<ConstraintViolation<T>> set = validator.validateProperty(obj,propertyName,Default.class);
        if(null!=set&&set.size()>0){
            for(ConstraintViolation<T> cv : set){
                throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),cv.getMessage());
            }
        }
    }

    public static <T> void validateGroup(T obj,Class group){
        Set<ConstraintViolation<T>> set = validator.validate(obj,group);
        if(null!=set&&set.size()>0){
            for(ConstraintViolation<T> cv : set){
                throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),cv.getMessage());
            }
        }
    }

}
