package com.hyhl.gotosea.core.cust.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CreditsError;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.CreditsNewDto;
import com.hyhl.gotosea.core.cust.enm.CreditsCoefEnum;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.mapper.CreditsCoefMapper;
import com.hyhl.gotosea.core.cust.mapper.CreditsRuleMapper;
import com.hyhl.gotosea.core.cust.mapper.CustCreditsChangeLogMapper;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.po.CreditsCoef;
import com.hyhl.gotosea.core.cust.po.CreditsRule;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.CustCreditsChangeLog;
import com.hyhl.gotosea.core.cust.service.ICreditServiceCore;
import com.hyhl.gotosea.core.cust.util.CreditsHelper;
import com.hyhl.gotosea.core.cust.vo.CreditVO;
import com.hyhl.gotosea.core.im.enm.ImMessageEnum;
import com.hyhl.gotosea.core.order.enm.CouponEnum;
import com.hyhl.gotosea.core.order.enm.CustCouponEnum;
import com.hyhl.gotosea.core.order.po.Coupon;
import com.hyhl.gotosea.core.order.service.CouponCoreService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsExchange;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;

import tk.mybatis.mapper.entity.Example;

@Service
public class CreditServiceCoreImpl extends BaseServiceImpl<CustCreditsChangeLog> implements ICreditServiceCore {
	
	@Autowired
	private CustMapper custMapper;
	
	@Autowired
	private CreditsRuleMapper creditsRuleMapper;
	
	@Autowired
	private CreditsCoefMapper creditsCoefMapper;
	
	@Autowired
	private CouponCoreService couponCoreService;
	
	@Autowired
	private MqProducer mqProducer;
	
	@Autowired
	private CustCreditsChangeLogMapper custCreditsChangeLogMapper;
	
	@Autowired
	private CreditsHelper creditsHelper;
	
	@Override
	@Transactional(readOnly=true,transactionManager="custTransationManager")
	public CreditVO findCredits(String custId) throws Exception {
		Cust cust = getCust(custId);
		CreditVO result = new CreditVO();
		result.setCredits(cust.getCredits());
		return result;
	}

	private Cust getCust(String custId) {
		Cust cust = custMapper.selectByPrimaryKey(custId);
		if(cust==null)throw new BaseBusinessException(LoginError.NOT_EXIST);
		return cust;
	}

	@Override
	@Transactional(readOnly=true,transactionManager="custTransationManager")
	public Pager<?> findCreditChangeLog(String custId) throws Exception {
		Example example = new Example(CustCreditsChangeLog.class);
		example.createCriteria()
		        .andCondition("cust_id =",custId);
		example.setOrderByClause("id DESC");
//		selectByPage(()->mapper.selectByExample(example))
		return selectByPage(new PageExcute<CustCreditsChangeLog>() {
			@Override
			public List<CustCreditsChangeLog> excute() {
				return mapper.selectByExample(example);
			}
		});
	}
	
	@Override
	@Transactional
	public String[] updateCustCreditNew(String custId, CreditsRuleEnum type, CreditsNewDto param) throws Exception {
		int result = 0;
		Integer addCredits = 0;
		Cust cust = custMapper.selectByPrimaryKey(custId);
		CreditsRule rule = null;
//		String channel = type.name();
		String[] pushImResult = null;
		String pushImTitle = null;
		String pushImMsg = null;
		switch (type) {
		case 平台消费:
			//消费金额是分--转换为元
			Integer money = param.getMoney();
			if(money==null||money<=0)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
			money = money/100;
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.平台消费.getId());
			Integer var1 = rule.getVar1();
			Integer var2 = rule.getVar2();
			addCredits = money/var1*var2;
			if(addCredits==null||addCredits<=0)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
			pushImTitle = ImMessageEnum.Credits_ServiceEnd.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_ServiceEnd.getMsg(), addCredits);
			break;
		case 带图评价:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.带图评价.getId());
			addCredits = rule.getVar1();
			pushImTitle = ImMessageEnum.Credits_Evaluate.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Evaluate.getMsg(), addCredits);
			break;
		case 无图评价:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.无图评价.getId());
			addCredits = rule.getVar2();
			pushImTitle = ImMessageEnum.Credits_Evaluate.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Evaluate.getMsg(), addCredits);
			break;
		case 发表动态:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.发表动态.getId());
			addCredits = rule.getVar1();
			pushImTitle = ImMessageEnum.Credits_Dynamic.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Dynamic.getMsg(), addCredits);
			break;
		case 评论动态:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.评论动态.getId());
			addCredits = rule.getVar2();
			pushImTitle = ImMessageEnum.Credits_Evaluate_Dynamic.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Evaluate_Dynamic.getMsg(), addCredits);
			break;
		case 发表活动:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.发表活动.getId());
			addCredits = rule.getVar1();
			pushImTitle = ImMessageEnum.Credits_Activity.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Activity.getMsg(), addCredits);
			break;
		case 评论活动:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.评论活动.getId());
			addCredits = rule.getVar2();
			pushImTitle = ImMessageEnum.Credits_Evaluate_Activity.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Evaluate_Activity.getMsg(), addCredits);
			break;
		case 发布活动成功付款:
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.发布活动成功付款.getId());
			addCredits = rule.getVar1();
			pushImTitle = ImMessageEnum.Credits_PayAll.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_PayAll.getMsg(), addCredits);
			break;
		case 邀请好友成为会员:
			String invitePhone = param.getInvitedPhone();
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.邀请好友成为会员.getId());
			addCredits = rule.getVar1();
			pushImTitle = ImMessageEnum.Credits_Invite.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Invite.getMsg(), invitePhone, addCredits);
			break;
		case 每日签到:
			//每日签到
			rule = creditsHelper.findCreditsRule(CreditsRuleEnum.每日签到.getId());
			//获取等级系数
			CreditsCoef creditsCoef = creditsHelper.findCreditsCoef(cust.getLevel());
			addCredits = rule.getVar1()*creditsCoef.getCoef();
			pushImTitle = ImMessageEnum.Credits_Checkin.getTitle();
			pushImMsg =  String.format(ImMessageEnum.Credits_Checkin.getMsg(), addCredits);
			break;
		default:
			throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		}
		Integer currentCredits = cust.getCredits();
		Example example = new Example(Cust.class);
		example.createCriteria()
				.andCondition("credits=", currentCredits);
		cust.setCredits(currentCredits+addCredits);
		result = custMapper.updateByExampleSelective(cust, example);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//获取推送msg
//		String reasonMsg = String.format(ImMessageEnum.Credits_New_Success.getMsg(), channel, addCredits);
		//添加积分增加记录
		CustCreditsChangeLog custCreditsChangeLog = new CustCreditsChangeLog();
		custCreditsChangeLog.setBalanceBefore(currentCredits);
		custCreditsChangeLog.setBalanceChanged(cust.getCredits());
		custCreditsChangeLog.setIncrease(addCredits);
		custCreditsChangeLog.setRuleId(rule.getRuleId());
		custCreditsChangeLog.setChangeTime(new Date(System.currentTimeMillis()));
		custCreditsChangeLog.setChangeReason(pushImMsg);
		result = insertCustCreditsChangeLog(cust.getId(), custCreditsChangeLog);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//推送IM消息
		if(pushImMsg!=null){
			pushImResult = new String[2];
			pushImResult[0] = pushImTitle;
			pushImResult[1] = pushImMsg;
		}
		return pushImResult;
	}

	@Override
	@Transactional
	public int insertCreditCoupon(String custId, Integer couponId, int number) throws Exception {
		int result = 0;
		//开始兑换积分
		Cust cust = custMapper.selectByPrimaryKey(custId);
		Coupon coupon = couponCoreService.selectByPrimaryKey(couponId);
		if(cust==null||coupon==null||number<=0)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		Integer status = coupon.getStatus();
		//优惠券失效
		if(status==null||status!=CouponEnum.状态_生效.getCode())throw new BaseBusinessException(CreditsError.invalid_coupon);
		Integer couponCredits = coupon.getCreditsExchange();
		//等于null属于不给兑换的优惠券
		if(couponCredits==null)throw new BaseBusinessException(CreditsError.invalid_coupon);
		int totalCouponCredits = number*couponCredits;
		int currentCredits = cust.getCredits();
		//积分不足
		if(currentCredits<totalCouponCredits)throw new BaseBusinessException(CreditsError.invalid_credits);
		//更新用户积分
		Example example = new Example(Cust.class);
		example.createCriteria()
		.andCondition("credits =", currentCredits);
		cust.setCredits(currentCredits-totalCouponCredits);
		result = custMapper.updateByExampleSelective(cust, example);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//扣除积分成功，生成优惠券
		couponCoreService.addCoupon(custId, couponId, number, CustCouponEnum.途径_积分兑换.getCode());
		//发送兑换成功
		//加入消息队列
		String pushMsg = String.format(ImMessageEnum.Credits_Exchange_Success.getMsg(), number, coupon.getName());
		MqCreditsExchange exchange = new MqCreditsExchange(cust.getId(), cust.getPhone(), currentCredits, cust.getCredits(), totalCouponCredits, pushMsg);
		mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_exchange, exchange));
		return result;
	}

	@Override
	public List<CreditsRule> findCreditsRules() throws Exception {
		return creditsRuleMapper.selectAll();
	}

	@Override
	@Transactional
	public List<CreditsCoef> findCreditsCoefs() throws Exception {
		Example example = new Example(CreditsCoef.class);
		example.createCriteria()
				.andCondition("rule_id=", CreditsRuleEnum.每日签到.getId())
				.andCondition("status=", CreditsCoefEnum.状态_生效.getCode());
		return creditsCoefMapper.selectByExample(example);
	}

	@Override
	@Transactional
	public int insertCustCreditsChangeLog(String custId, CustCreditsChangeLog log) throws Exception {
		log.setCustId(custId);
		return custCreditsChangeLogMapper.insertSelective(log);
	}

}
