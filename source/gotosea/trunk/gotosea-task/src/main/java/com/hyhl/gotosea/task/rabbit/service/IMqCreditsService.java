package com.hyhl.gotosea.task.rabbit.service;

import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsExchange;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;

public interface IMqCreditsService {
	int creditsNew(MqCreditsNew param)throws Exception;
	int exchange(MqCreditsExchange param)throws Exception;
}
