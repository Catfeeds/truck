package com.hyhl.gotosea.task.rabbit.service.impl;

import java.util.Date;

import javax.transaction.Transactional;

import org.igniterealtime.restclient.entity.MsgSendType;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.redis.DistributedLockHandler;
import com.hyhl.gotosea.core.common.redis.Lock;
import com.hyhl.gotosea.core.cust.dto.CreditsNewDto;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.po.CustCreditsChangeLog;
import com.hyhl.gotosea.core.cust.service.ICreditServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsExchange;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.task.im.producer.ImProducer;
import com.hyhl.gotosea.task.rabbit.service.IMqCreditsService;

@Service
public class MqCreditsServiceImpl implements IMqCreditsService {
	
	@Autowired
	private ICreditServiceCore iCreditServiceCore;
	
	@Autowired
	private ImProducer imProducer;
	
	@Autowired
	private DistributedLockHandler distributedLockHandler;
	
	private final static String lock_key = "_lock:credits:new:%s";
	
	@Override
	@Transactional
	public int creditsNew(MqCreditsNew param) throws Exception {
		int result = 0;
		String custId = param.getCustId();
		CreditsRuleEnum type = param.getType();
		String phone = param.getCustPhone();
		Lock lock = new Lock(String.format(lock_key, custId));
		if(distributedLockHandler.tryLock(lock)){
			try {
				int money = 0;
				String invite = null;
				if(type==null)throw new AmqpRejectAndDontRequeueException("新增积分枚举类型错误"+param.toString());
				CreditsNewDto creditParam = new CreditsNewDto();
				switch (type) {
				case 平台消费:
					money = param.getMoney();
					creditParam.setMoney(money);
					break;
				case 邀请好友成为会员:
					invite = param.getInvitePhone();
					creditParam.setInvitedPhone(invite);
					break;
				default:
					break;
				}
				//新增积分
				String[] pushImResult = iCreditServiceCore.updateCustCreditNew(custId, type, creditParam);
				if(pushImResult!=null){
					if(type!=CreditsRuleEnum.评论动态&&type!=CreditsRuleEnum.评论活动){
						//推送IM
						imProducer.send(phone, null, pushImResult[1], MsgSendType.msg_system, null, pushImResult[0]);
					}
				}
			}finally{
				distributedLockHandler.releaseLock(lock);
			}
		}
		return result;
	}
	
	@Override
	@Transactional
	public int exchange(MqCreditsExchange param) throws Exception {
		int result = 0;
		String custId = param.getCustId();
		int before = param.getBefore();
		int changed = param.getChanged();
		int decrease = param.getDecrease();
		String phone = param.getPhone();
		String pushMessage = param.getPushImMsg();
		//新增--积分变更记录
		CustCreditsChangeLog custCreditsChangeLog = new CustCreditsChangeLog();
		custCreditsChangeLog.setBalanceBefore(before);
		custCreditsChangeLog.setBalanceChanged(changed);
		custCreditsChangeLog.setDecrease(decrease);
		custCreditsChangeLog.setChangeTime(new Date(System.currentTimeMillis()));
		custCreditsChangeLog.setChangeReason(pushMessage);
		result = iCreditServiceCore.insertCustCreditsChangeLog(custId, custCreditsChangeLog);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//推送IM
		imProducer.send(phone, null ,pushMessage, MsgSendType.msg_system, null, "积分兑换");
		return result;
	}
	
}
