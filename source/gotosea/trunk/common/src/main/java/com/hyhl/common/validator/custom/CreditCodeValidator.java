package com.hyhl.common.validator.custom;

import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CreditCodeValidator implements ConstraintValidator<CreditCode, String> {
	
	private String message;
	

	@Override
	public void initialize(CreditCode paramA) {
		this.message = paramA.message();
	}

	@Override
	public boolean isValid(String creditCode,ConstraintValidatorContext paramConstraintValidatorContext) {
		if(creditCode==null || creditCode.trim().equals("")){
			message = "社会统一信用代码不能为空";
		}else{
			if(isCreditCode(creditCode)){
				return true;
			}else{
				message = "社会统一信用代码格式不正确";
			}
		}
		paramConstraintValidatorContext.disableDefaultConstraintViolation();
		paramConstraintValidatorContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
		return false;
	}
	
	
    static int[] power = {1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28};  
    // 社会统一信用代码不含（I、O、S、V、Z） 等字母  
    static char[] code = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','T','U','W','X','Y'};  
  
    /** 
     * 判断是否是一个有效的社会信用代码 
     * @param creditCode 
     * @return 
     */  
    static boolean isCreditCode(String creditCode){  
        if("".equals(creditCode)||" ".equals(creditCode)){  
            return false;  
        }else if(creditCode.length()<18){  
            return  false;  
        }else if(creditCode.length()>18){  
            return  false;  
        }else{  
        	Map<String,Integer> datas = new HashMap<>();  
            for(int i=0;i<code.length;i++){  
                datas.put(code[i]+"",i);  
            }  
            char[] pre17s;
            String pre17 = creditCode.substring(0,17);  
            pre17s = pre17.toCharArray();  
            int sum =  sum(pre17s,datas);  
            int temp = sum%31;  
            temp = temp==0?31:temp;
            return creditCode.substring(17,18).equals(code[31-temp]+"")?true:false;  
        }  
    }  
  
    /** 
     * @param chars 
     * @return 
     */  
    private static int sum(char[] chars ,Map<String,Integer> datas){  
        int sum = 0;  
        for(int i=0;i<chars.length;i++){  
            int code = datas.get(chars[i]+"");  
            sum+=power[i]*code;  
        }  
        return sum;  
  
    }  
  
}