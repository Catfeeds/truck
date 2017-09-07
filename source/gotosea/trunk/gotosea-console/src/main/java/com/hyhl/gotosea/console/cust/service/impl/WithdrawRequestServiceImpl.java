package com.hyhl.gotosea.console.cust.service.impl;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hfocean.common.auth.base.utils.AuthAppContextHelper;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.console.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.console.cust.service.IWithdrawRequestService;
import com.hyhl.gotosea.core.common.constant.Constant;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.WithdrawRequestEnum;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.mapper.WithdrawRequestLogMapper;
import com.hyhl.gotosea.core.cust.mapper.WithdrawRequestMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.WithdrawRequest;
import com.hyhl.gotosea.core.cust.po.WithdrawRequestLog;
import com.hyhl.gotosea.core.cust.service.IWalletServiceCore;
import com.hyhl.gotosea.core.cust.vo.WithdrawRequestPagerVO;
import com.hyhl.gotosea.core.im.enm.ImMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawFail;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawSuccess;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.DateUtil;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class WithdrawRequestServiceImpl extends BaseServiceImpl<WithdrawRequest> implements IWithdrawRequestService {
	
	@Autowired
	private WithdrawRequestMapper  withdrawRequestMapper;
	
	@Autowired
	private WithdrawRequestLogMapper withdrawRequestLogMapper;
	
	@Autowired
	private IWalletServiceCore iWalletServiceCore;
	
	@Autowired
	private CustMapper custMapper;
	
	@Autowired
	private MqProducer mqProducer;

	@Override
	public Pager<WithdrawRequestPagerVO> findWithdrawRequests(WithdrawRequestDto param) throws Exception {
		return selectByPage( () -> {
			String phone = null;
			String cardNo = null;
			Integer status = null;
			if(param!=null){
				phone = param.getPhone();
				cardNo = param.getCardNo();
				status = param.getStatus();
			}
			return withdrawRequestMapper.findWithdrawRequests(WithdrawRequestEnum.可查询_提现申请状态.getCodeArr(), phone, cardNo, status);
		});
	}

	@Override
	public WithdrawRequest findWithdrawRequest(int id) throws Exception {
		return mapper.selectByPrimaryKey(id);
	}

	@Override
	@Transactional
	public int updateWithdrawRequestStatus(int id, WithdrawRequestEnum enm, String remark) throws Exception {
		int result = 0;
		WithdrawRequest withdrawRequest = mapper.selectByPrimaryKey(id);
		if(withdrawRequest!=null){
			String custId = withdrawRequest.getCustId();
			Integer status = withdrawRequest.getStatus();
			Integer reqMoney = withdrawRequest.getReqMoney();
			Date reqTime = withdrawRequest.getReqTime();
			switch (enm) {
			case 状态_已审核待处理:
				//更新提现申请单状态和变更记录
				if(status!=WithdrawRequestEnum.状态_已提交待审核.getCode())throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR, "必须是已提交状态才能待处理");
				result = updateWithdrawRequestAndLog(enm, withdrawRequest, status, remark);
				break;
			case 状态_成功已关闭:
				//更新提现申请单状态和变更记录
				if(status!=WithdrawRequestEnum.状态_已审核待处理.getCode())throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR, "必须是待处理状态才能处理");
				result = updateWithdrawRequestAndLog(enm, withdrawRequest, status, remark);
				if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
				//更新客户钱包金额和变更记录
				result = iWalletServiceCore.updateWalletWithdrawSuccess(custId, reqMoney, null);
				if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
				//推送rabbit
				pushRabbitByWithdrawSuccess(custId, reqMoney, reqTime);
				break;
			case 状态_失败已关闭:
				//更新提现申请单状态和变更记录
				if(status!=WithdrawRequestEnum.状态_已审核待处理.getCode())throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR, "必须是已提交状态才能处理");
				result = updateWithdrawRequestAndLog(enm, withdrawRequest, status, remark);
				if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
				//更新客户钱包和变更记录
				result = iWalletServiceCore.updateWalletWithdrawFail(custId, reqMoney, null);
				if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
				//推送rabbit
				pushRabbitByWithdrawFail(custId, reqMoney, reqTime);
				break;
			default:
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			}
		}
		return result;
	}

	private void pushRabbitByWithdrawSuccess(String custId, Integer reqMoney, Date reqTime)
			throws JsonProcessingException {
		Cust cust = custMapper.selectByPrimaryKey(custId);
		if(cust!=null){
			MqWithdrawSuccess withdrawSuccess = new MqWithdrawSuccess();
			withdrawSuccess.setCustId(custId);
			withdrawSuccess.setPhone(cust.getPhone());
			//处理时间和金额
			String dateToString = DateUtil.dateToString(reqTime, "yyyy-MM-dd");
			String moneyToString = new BigDecimal(reqMoney).movePointLeft(2).toString();
			String pushMsg = String.format(ImMessageEnum.Withdraw_Success.getMsg(), dateToString, moneyToString, Constant.HYHL_HOTLINE);
			withdrawSuccess.setImMsg(pushMsg);
			withdrawSuccess.setMoney(reqMoney);
			mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.withdraw_success, withdrawSuccess));
		}
	}

	private void pushRabbitByWithdrawFail(String custId, Integer reqMoney, Date reqTime) 
			throws JsonProcessingException {
		Cust cust = custMapper.selectByPrimaryKey(custId);
		if(cust!=null){
			MqWithdrawFail withdrawFail = new MqWithdrawFail();
			withdrawFail.setCustId(custId);
			withdrawFail.setPhone(cust.getPhone());
			//处理时间和金额
			String dateToString = DateUtil.dateToString(reqTime, "yyyy-MM-dd");
			String moneyToString = new BigDecimal(reqMoney).movePointLeft(2).toString();
			String pushMsg = String.format(ImMessageEnum.Withdraw_Fail.getMsg(), dateToString, moneyToString, Constant.HYHL_HOTLINE);
			withdrawFail.setImMsg(pushMsg);
			withdrawFail.setMoney(reqMoney);
			mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.withdraw_fail, withdrawFail));
		}
	}
	
	private int updateWithdrawRequestAndLog(WithdrawRequestEnum enm, WithdrawRequest withdrawRequest, Integer status, String remark) {
		int result;
		//更新提现申请单状态
		withdrawRequest.setStatus(enm.getCode());
		result = mapper.updateByPrimaryKey(withdrawRequest);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		
		//插入提现审核变更记录
		WithdrawRequestLog log = new WithdrawRequestLog();
		log.setWithdrawRequestId(withdrawRequest.getId());
		log.setStatusBefore(status);
		log.setStatusAfter(enm.getCode());
		log.setUserId(AuthAppContextHelper.getSysUserName());
		log.setProcessTime(new Date());
		log.setRemark(remark);
		result = withdrawRequestLogMapper.insert(log);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}
	
}
