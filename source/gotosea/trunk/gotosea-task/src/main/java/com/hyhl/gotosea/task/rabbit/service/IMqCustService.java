package com.hyhl.gotosea.task.rabbit.service;

import com.hyhl.gotosea.core.rabbitmq.bean.MqCustLogin;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustRegister;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantSuccess;

public interface IMqCustService {
	int login(MqCustLogin param)throws Exception;
	int register(MqCustRegister param)throws Exception;
	int merchantSuccess(MqMerchantSuccess param)throws Exception;
	int merchantFail(MqMerchantFail param)throws Exception;
}
