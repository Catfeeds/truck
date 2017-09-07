package com.hyhl.gotosea.core.cust.service.impl;

import java.util.Date;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CustError;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.WithdrawRequestDto;
import com.hyhl.gotosea.core.cust.enm.WalletLogEnum;
import com.hyhl.gotosea.core.cust.enm.WithdrawRequestEnum;
import com.hyhl.gotosea.core.cust.mapper.BankCardMapper;
import com.hyhl.gotosea.core.cust.mapper.WalletLogMapper;
import com.hyhl.gotosea.core.cust.mapper.WithdrawRequestMapper;
import com.hyhl.gotosea.core.cust.po.BankCard;
import com.hyhl.gotosea.core.cust.po.Wallet;
import com.hyhl.gotosea.core.cust.po.WalletLog;
import com.hyhl.gotosea.core.cust.po.WithdrawRequest;
import com.hyhl.gotosea.core.cust.service.IWalletServiceCore;
import com.hyhl.gotosea.core.cust.vo.WalletDetailVO;
import com.hyhl.gotosea.core.cust.vo.WalletLogVO;
import com.hyhl.gotosea.core.rabbitmq.bean.MqWithdrawApply;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;

import tk.mybatis.mapper.entity.Example;

@Service
@Transactional(readOnly = true, transactionManager = "custTransationManager")
public class WalletServiceCoreImpl extends BaseServiceImpl<Wallet> implements IWalletServiceCore {

	@Autowired
	private WalletLogMapper walletLogMapper;

	@Autowired
	private BankCardMapper bankCardMapper;

	@Autowired
	private WithdrawRequestMapper withdrawRequestMapper;

	@Autowired
	private MqProducer mqProducer;

	@Override
	public WalletDetailVO findCustWallet(String custId) throws Exception {
		return Optional.of(custId).map(id -> mapper.selectByPrimaryKey(id)).map(wallet -> {
			Supplier<WalletDetailVO> supplier = WalletDetailVO::new;
			WalletDetailVO vo = supplier.get();
			BeanUtils.copyProperties(wallet, vo);
			return vo;
		}).orElse(null);
	}

	@Override
	public Pager<WalletLogVO> findWalletLog(String custId) throws Exception {
		return Optional.of(custId).map(id -> selectByPage(() -> walletLogMapper.findWalletLog(custId))).orElse(null);
	}

	@Override
	@Transactional
	public int insertWithdrawRequst(String custId, WithdrawRequestDto param) throws Exception {
		int result = 0;
		// 获取参数
//		String payPassword = param.getPayPassword();
		int money = param.getMoney();
		int cardId = param.getCardId();
		// 获取钱包信息
		Wallet wallet = mapper.selectByPrimaryKey(custId);
		if (wallet != null 
//				&& !StringUtils.isEmpty(payPassword)
				) {
			// 判断提现的银行卡是否是绑定自己可用的银行卡
			BankCard bankCard = bankCardMapper.selectByPrimaryKey(cardId);
			if (bankCard == null || !bankCard.getCustId().equals(custId))
				throw new BaseBusinessException(CustError.BANKCARD_NOT_FOUND);
			// 判断支付密码
//			String custPayPassword = wallet.getPayPassword();
//			String md5PayPassword = DigestUtils.md5DigestAsHex(payPassword.getBytes());
			// 密码错误
//			if (!custPayPassword.equals(md5PayPassword))
//				throw new BaseBusinessException(CustError.PAYPWD_ERROR);
			//更新客户钱包余额
			Date date = new Date();
			result = updateWallet(custId, money, WalletLogEnum.提现申请, null, date, null);
			if (result != 1)
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			//插入提现申请表
			WithdrawRequest withdrawRequest = new WithdrawRequest();
			withdrawRequest.setCustId(custId);
			withdrawRequest.setReqMoney(money);
			withdrawRequest.setReqTime(date);
			withdrawRequest.setCardId(cardId);
			withdrawRequest.setStatus(WithdrawRequestEnum.状态_已提交待审核.getCode());
			result = withdrawRequestMapper.insert(withdrawRequest);
			if (result != 1)
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			//推送提现申请消息
			pushWalletLog(custId, money);
		}
		return result;
	}

	@Override
	@Transactional
	public int insertOrderIncome(String custId, int money, String remark, Integer orderId) throws Exception {
		return updateWallet(custId, money, WalletLogEnum.订单收入, remark, new Date(), orderId);
	}
	
	@Override
	@Transactional
	public int insertOrderCancel(String custId, int money, String remark, Integer orderId) throws Exception {
		return updateWallet(custId, money, WalletLogEnum.订单收入撤销, remark, new Date(), orderId);
	}

	private int updateWallet(String custId, int money, WalletLogEnum enm, String remark, Date date, Integer orderId) throws Exception {
		if(money<=0)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR, "金额必须大于0");
		int result = 0;
		// 获取钱包信息
		Wallet wallet = mapper.selectByPrimaryKey(custId);
		if(wallet!=null){
			//获取变更前数值
			Integer totalMoney = wallet.getTotalMoney();//钱包总金额
			Integer prePayMoney = wallet.getPrePayMoney();//冻结提现金额
			Integer accumulatedIncome = wallet.getAccumulatedIncome();//累积收入
			Integer accumulatedRewards = wallet.getAccumulatedRewards();//累积奖励
			Integer accumulatedWithdraw = wallet.getAccumulatedWithdraw();//累积提现
			//添加判断
			Example example = new Example(Wallet.class);
			example.createCriteria()
					.andEqualTo("totalMoney", totalMoney)
					.andEqualTo("prePayMoney", prePayMoney)
					.andEqualTo("accumulatedIncome", accumulatedIncome)
					.andEqualTo("accumulatedRewards", accumulatedRewards)
					.andEqualTo("accumulatedWithdraw", accumulatedWithdraw);
			wallet.setUpdateTime(date);
			//设置金额变更
			switch (enm) {
			case 订单收入:
				//判断int上限
				validateMoneyMax(totalMoney, money);
				validateMoneyMax(accumulatedIncome, money);
				wallet.setTotalMoney(totalMoney + money);
				wallet.setAccumulatedIncome(accumulatedIncome + money);
				break;
			case 订单收入撤销:
				//判断减少金额不能小于0
				validateMoneyZero(totalMoney, money);
				validateMoneyZero(accumulatedIncome, money);
				
				wallet.setTotalMoney(totalMoney - money);
				wallet.setAccumulatedIncome(accumulatedIncome - money);
				break;
			case 提现申请:
				//判断减少金额不能小于0
				validateMoneyZero(totalMoney, money);
				//判断int上限
				validateMoneyMax(prePayMoney, money);
				
				wallet.setTotalMoney(totalMoney - money);
				wallet.setPrePayMoney(prePayMoney + money);
				break;
			case 提现:
				//判断减少金额不能小于0
				validateMoneyZero(prePayMoney, money);
				//判断int上限
				validateMoneyMax(accumulatedWithdraw, money);
				
				wallet.setPrePayMoney(prePayMoney - money);
				wallet.setAccumulatedWithdraw(accumulatedWithdraw + money);
				break;
			case 提现申请撤销:
				//判断减少金额不能小于0
				validateMoneyZero(prePayMoney, money);
				//判断int上限
				validateMoneyMax(totalMoney, money);
				
				wallet.setTotalMoney(totalMoney + money);
				wallet.setPrePayMoney(prePayMoney - money);
				break;
			case 平台补贴:
				//判断int上限
				validateMoneyMax(totalMoney, money);
				validateMoneyMax(accumulatedRewards, money);
				
				wallet.setTotalMoney(totalMoney + money);
				wallet.setAccumulatedRewards(accumulatedRewards + money);
				break;
			case 平台补贴撤销:
				//判断减少金额不能小于0
				validateMoneyZero(totalMoney, money);
				validateMoneyZero(accumulatedRewards, money);
				
				wallet.setTotalMoney(totalMoney - money);
				wallet.setAccumulatedRewards(accumulatedRewards - money);
				break;
			case 其他原因收入:
				//判断int上限
				validateMoneyMax(totalMoney, money);
				validateMoneyMax(accumulatedIncome, money);
				
				wallet.setTotalMoney(totalMoney + money);
				wallet.setAccumulatedIncome(accumulatedIncome + money);
				break;
			case 其他原因扣款:
				//判断减少金额不能小于0
				validateMoneyZero(totalMoney, money);
				validateMoneyZero(accumulatedIncome, money);
				
				wallet.setTotalMoney(totalMoney - money);
				wallet.setAccumulatedIncome(accumulatedIncome - money);
				break;
			default:
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR, "钱包变更类型错误");
			}
			result = mapper.updateByExampleSelective(wallet, example);
			if (result != 1)
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
			//添加钱包变更日志
			WalletLog walletLog = new WalletLog();
			walletLog.setCustId(custId);
			walletLog.setChangeType(enm.getCode());
			walletLog.setChangeTime(new Date());
			walletLog.setChangeMoney(money);
			walletLog.setMerchantOrderId(orderId);
			walletLog.setRemark(remark);
			result = walletLogMapper.insertSelective(walletLog);
			if (result != 1)
				throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		}
		return result;
	}

	private void validateMoneyMax(int oldMoney, int money) {
		if(Integer.MAX_VALUE - oldMoney < money)
			throw new BaseBusinessException(CustError.NOT_ENOUGH_MONEY);
	}

	/**左边原旧金额必须大于等于右边即将减去金额
	 * @param oldMoney
	 * @param money
	 */
	private void validateMoneyZero(int oldMoney, int money) {
		if (oldMoney < money)
			throw new BaseBusinessException(CustError.NOT_ENOUGH_MONEY);
	}

	private void pushWalletLog(String custId, int money) throws JsonProcessingException {
		MqWithdrawApply apply = new MqWithdrawApply();
		apply.setCustId(custId);
		apply.setMoney(money);
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.withdraw_apply, apply));
	}

	@Override
	@Transactional
	public int updateWalletWithdrawSuccess(String custId, int money, String remark) throws Exception {
		return updateWallet(custId, money, WalletLogEnum.提现, remark, new Date(), null);
	}

	@Override
	@Transactional
	public int updateWalletWithdrawFail(String custId, int money, String remark) throws Exception {
		return updateWallet(custId, money, WalletLogEnum.提现申请撤销, remark, new Date(), null);
	}
}
