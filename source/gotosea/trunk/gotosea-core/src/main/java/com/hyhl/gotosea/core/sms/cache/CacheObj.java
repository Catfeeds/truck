package com.hyhl.gotosea.core.sms.cache;

import java.io.Serializable;

/**
 * @author guan.sj
 */
public class CacheObj implements Serializable {  
	private static final long serialVersionUID = 1100402678700791316L;
	private int frqNo = 0;// 次数
    private String phone;//手机号码
    private String verifyNo;// 手机验证码
    private boolean status;//验证成功true
    private long codeTime;//获取验证码时间
   	
    public CacheObj() {
    }
    
    public CacheObj(String phone, String verifyNo){
        this.phone = phone;  
        this.verifyNo = verifyNo;
        this.codeTime = System.currentTimeMillis();
    }

	public int getFrqNo() {
		return frqNo;
	}

	public void setFrqNo(int frqNo) {
		this.frqNo = frqNo;
	}

	public String getVerifyNo() {
		return verifyNo;
	}

	public void setVerifyNo(String verifyNo) {
		this.verifyNo = verifyNo;
	}

	public long getCodeTime() {
		return codeTime;
	}

	public void setCodeTime(long codeTime) {
		this.codeTime = codeTime;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}  
	
      
}  