package com.hyhl.gotosea.core.cust.util;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.cust.po.CreditsCoef;
import com.hyhl.gotosea.core.cust.po.CreditsRule;
import com.hyhl.gotosea.core.cust.service.ICreditServiceCore;

/**
 * @author guan.sj
 */
@Component
public class CreditsHelper {

	@Autowired
    private RedisService redisService;

    @Autowired
    private ICreditServiceCore iCreditServiceCore;

    public final static String CreditsRule="_credits:credits_rules";
    public final static String CreditsCoef="_credits:credits_coefs";

    private final static ObjectMapper objectMapper=new ObjectMapper();

    @PostConstruct
    public void init() throws Exception {
    	loadCreditsRules();
    	loadCreditsCoefs();
    }

    public List<CreditsRule> loadCreditsRules()throws Exception {
    	List<CreditsRule> rules = null;
    	 String s = redisService.get(CreditsRule);
        if(null!=s){
        	rules=objectMapper.readValue(s,new TypeReference<List<CreditsRule>>() {});
        }else {
        	rules = iCreditServiceCore.findCreditsRules();
            if(null!=rules&&rules.size()>0){
                redisService.set(CreditsRule,objectMapper.writeValueAsString(rules));
            }
        }
        return rules;
    }
    
    public CreditsRule findCreditsRule(int ruleId)throws Exception {
    	CreditsRule result = null;
    	List<CreditsRule> creditsRules = loadCreditsRules();
    	if(creditsRules!=null){
    		for(CreditsRule creditsRule : creditsRules){
    			if(creditsRule.getRuleId()==ruleId)result = creditsRule;
    		}
    	}
    	return result;
    }
    
	public List<CreditsCoef> loadCreditsCoefs() throws Exception {
		List<CreditsCoef> coefs = null;
		String s = redisService.get(CreditsCoef);
		if (null != s) {
			coefs = objectMapper.readValue(s, new TypeReference<List<CreditsCoef>>() {
			});
		} else {
			coefs = iCreditServiceCore.findCreditsCoefs();
			if (null != coefs && coefs.size() > 0) {
				redisService.set(CreditsCoef, objectMapper.writeValueAsString(coefs));
			}
		}
		return coefs;
	}
    
	public CreditsCoef findCreditsCoef(int level)throws Exception {
		CreditsCoef result = null;
		List<CreditsCoef> creditsCoefs = loadCreditsCoefs();
		if(creditsCoefs!=null){
			for(CreditsCoef creditsCoef : creditsCoefs){
				if(creditsCoef.getCustLevel()==level)result = creditsCoef;
			}
		}
		if(result==null)result = creditsCoefs.get(creditsCoefs.size()-1);
    	return result;
    }
   
}
