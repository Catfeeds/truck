package com.hyhl.gotosea.task.rabbit.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.igniterealtime.restclient.RestClientApi;
import org.igniterealtime.restclient.entity.MsgSendType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hyhl.gotosea.core.common.constant.Constant;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.mapper.CustRecentInfoMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.util.InviteCodeUtils;
import com.hyhl.gotosea.core.im.enm.ImMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustLogin;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCustRegister;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantSuccess;
import com.hyhl.gotosea.task.im.producer.ImProducer;
import com.hyhl.gotosea.task.rabbit.service.IMqCreditsService;
import com.hyhl.gotosea.task.rabbit.service.IMqCustService;
import com.hyhl.gotosea.task.sms.producer.SmsProducer;

@Service
public class MqCustServiceImpl implements IMqCustService {
	
	@Autowired
	private CustMapper custMapper;
	
	@Autowired
	private CustRecentInfoMapper custRecentInfoMapper;
	
	@Autowired
	private IMqCreditsService iMqCreditsService;
	
	@Autowired
	private InviteCodeUtils inviteCodeUtils;
	
	@Autowired
	private SmsProducer smsProducer;
	
	@Autowired
	private ImProducer imProducer;
	
	@Override
	@Transactional
	public int login(MqCustLogin param) throws Exception {
		String custId = param.getCustId();
		String ip = param.getIp();
		long time = param.getLoginTime();
		int result = 0;
		Cust cust = custMapper.selectByPrimaryKey(custId);
		if(cust!=null){
			//记录用户最近登录ip和登录时间
			result = custRecentInfoMapper.updateCustRecentInfo(custId,new Date(time), ip);
		}
		return result;
	}

	@Override
	@Transactional
	public int register(MqCustRegister param) throws Exception {
		int result = 0;
		String id = param.getCustId();
		//同步用户-IM
		Cust cust = custMapper.selectByPrimaryKey(id);
		if(cust!=null){
			//TODO 待添加重试机制
			//新增IM帐号
			RestClientApi.getInstance().createUser(cust.getPhone(),cust.getPwd());
			//同步IM资料
			RestClientApi.getInstance().setUserInfo(cust.getPhone(),cust.getName(),cust.getPicture());
		}
		//增加邀请人积分
		String invite = param.getInvite();
		if(invite!=null){
			String parseInviteCustId = inviteCodeUtils.parseInviteCode(invite);
			Cust inviteCust = custMapper.selectByPrimaryKey(parseInviteCustId);
			if(inviteCust!=null){
				MqCreditsNew creditsNew = new MqCreditsNew();
				creditsNew.setCustId(inviteCust.getId());
				creditsNew.setCustPhone(inviteCust.getPhone());
				creditsNew.setType(CreditsRuleEnum.邀请好友成为会员);
				creditsNew.setInvitePhone(cust.getPhone());
				iMqCreditsService.creditsNew(creditsNew);
			}
		}
		return result;
	}

	@Override
	public int merchantSuccess(MqMerchantSuccess param) throws Exception {
		int result = 0;
		//推送短信
		String phone = param.getPushPhone();
		String template = param.getPushSmsTemplate();
		Map<String,String> paramMap = new HashMap<String,String>();
		smsProducer.send(template, phone, paramMap);
		//推送IM
		imProducer.send(phone, null, ImMessageEnum.Merchant_Success.getMsg(), MsgSendType.msg_system, null, "商家认证");
		return result;
	}

	@Override
	public int merchantFail(MqMerchantFail param) throws Exception {
		int result = 0;
		//推送短信
		String phone = param.getPushPhone();
		String template = param.getPushSmsTemplate();
		Map<String, String> paramMap = param.getPushParam();
		smsProducer.send(template, phone, paramMap);
		//推送IM
		String pushMessage = String.format(ImMessageEnum.Merchant_Fail.getMsg(), Constant.HYHL_HOTLINE);
		imProducer.send(phone, null, pushMessage, MsgSendType.msg_system, null, "商家认证");
		return result;
	}
}
