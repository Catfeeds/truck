package com.hyhl.gotosea.task.rabbit.service.impl;

import org.igniterealtime.restclient.entity.MsgSendType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.gotosea.core.cust.service.IMerchantStatisticsServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantStatistics;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawApply;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawSuccess;
import com.hyhl.gotosea.task.im.producer.ImProducer;
import com.hyhl.gotosea.task.rabbit.service.IMqMerchantService;

@Service
public class MqMerchantServiceImpl implements IMqMerchantService {
	
	@Autowired
	private ImProducer imProducer;
	
	@Autowired
	private IMerchantStatisticsServiceCore iMerchantStatisticsServiceCore;

	@Override
	public int withdrawApply(MqWithdrawApply param) throws Exception {
		int result = 0;
		
		return result;
	}

	@Override
	public int withdrawSuccess(MqWithdrawSuccess param) throws Exception {
		int result = 0;
		//推送客户
		imProducer.send(param.getPhone(), null, param.getImMsg(), MsgSendType.msg_system, null, "提现成功");
		return result;
	}

	@Override
	public int withdrawFail(MqWithdrawFail param) throws Exception {
		int result = 0;
		//推送客户
		imProducer.send(param.getPhone(), null, param.getImMsg(), MsgSendType.msg_system, null, "提现失败");
		return result;
	}

	@Override
	@Transactional
	public int updateMerchantStatistics(MqMerchantStatistics param) throws Exception {
		int result = 0;
		String custId = param.getCustId();
		switch (param.getType()) {
		case 更新_统计商家好评率:
			result = iMerchantStatisticsServiceCore.updateMerchantGradeCount(custId, param.getGrade());
			break;
		case 更新_增加商家订单数量:
			result = iMerchantStatisticsServiceCore.updateMerchantOrderCount(custId);
			break;
		case 更新_更新商家服务数量:
			result = iMerchantStatisticsServiceCore.updateMerchantServiceCount(custId);
			break;
		default:
			break;
		}
		return result;
	}
	
}
