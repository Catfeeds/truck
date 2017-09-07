package com.hyhl.gotosea.task.rabbit.service;

import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantStatistics;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawApply;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawSuccess;

public interface IMqMerchantService {
	int withdrawApply(MqWithdrawApply param)throws Exception;
	int withdrawSuccess(MqWithdrawSuccess param)throws Exception;
	int withdrawFail(MqWithdrawFail param)throws Exception;
	int updateMerchantStatistics(MqMerchantStatistics param)throws Exception;
}
