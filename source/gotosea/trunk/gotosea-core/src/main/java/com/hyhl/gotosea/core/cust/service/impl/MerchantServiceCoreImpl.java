package com.hyhl.gotosea.core.cust.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CustError;
import com.hyhl.common.exception.type.LoginError;
import com.hyhl.gotosea.core.common.constant.Constant;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.dto.CustTagUpdateDto;
import com.hyhl.gotosea.core.cust.dto.MerchantApplyDto;
import com.hyhl.gotosea.core.cust.dto.MerchantUpdateDto;
import com.hyhl.gotosea.core.cust.enm.AuditLogEnum;
import com.hyhl.gotosea.core.cust.enm.CustEnum;
import com.hyhl.gotosea.core.cust.mapper.AuditLogMapper;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.cust.mapper.MerchantStatisticsMapper;
import com.hyhl.gotosea.core.cust.mapper.WalletMapper;
import com.hyhl.gotosea.core.cust.po.AuditLog;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.po.MerchantStatistics;
import com.hyhl.gotosea.core.cust.po.Wallet;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.service.IMerchantServiceCore;
import com.hyhl.gotosea.core.cust.vo.MerchantDetailVO;

@Service
@Transactional(readOnly=true,transactionManager="custTransationManager")
public class MerchantServiceCoreImpl extends BaseServiceImpl<Merchant> implements IMerchantServiceCore {
	
	@Autowired
	private CustMapper custMapper;

	@Autowired
	private MerchantMapper merchantMapper;

	@Autowired
	private ICustTagServiceCore iCustTagServiceCore;
	
	@Autowired
	private AuditLogMapper auditLogMapper;
	
	@Autowired
	private WalletMapper walletMapper;
	
	@Autowired
	private MerchantStatisticsMapper merchantStatisticsMapper;
	
	@Override
	@Transactional
	public int insertMerchantApply(String custId, MerchantApplyDto param) throws Exception {
		//判断该用户是否已通过认证
		Cust cust = custMapper.selectByPrimaryKey(custId);
		if(cust==null)throw new BaseBusinessException(LoginError.NOT_EXIST);
		Integer merchantStatus = cust.getMerchantStatus();
		if(merchantStatus!=null&&ArrayUtils.contains(CustEnum.商家不能提交的认证状态.getCodeArr(), merchantStatus))
				throw new BaseBusinessException(CustError.MERCHANT_APPLY_ERROR);
		//判断用户是否存在数据商家数据
		//TODO 加锁--
		Merchant merchant = selectByPrimaryKey(custId);
		int result = 0;
		if(merchant==null){
			merchant = new Merchant();
			BeanUtils.copyProperties(param, merchant);
			merchant.setCustId(custId);
			result = insertSelective(merchant);
		}else{
			BeanUtils.copyProperties(param, merchant);
			merchant.setCustId(custId);
			result = updateByPrimaryKeySelective(merchant);
		}
		if(result==1){
			//修改客户商家标识
			Integer custMerchant = cust.getMerchant();
			if(custMerchant==null||custMerchant.equals(CustEnum.商家标记未申请商家身份.getCode())){
				cust.setMerchant(CustEnum.商家标记已申请商家身份.getCode());
			}
			//修改用户申请状态
			cust.setMerchantStatus(CustEnum.商家认证状态已申请.getCode());
			result = custMapper.updateByPrimaryKeySelective(cust);
			if(result==1){
				//插入审核记录表
				AuditLog AuditLog = new AuditLog();
				AuditLog.setAuditObjectId(cust.getId());
				AuditLog.setAuditType(AuditLogEnum.类型_商家认证审核.getCode());
				AuditLog.setStatus(AuditLogEnum.状态_已提交待审核.getCode());
				AuditLog.setApplyRemark("客户商家资料申请");
				AuditLog.setApplyTime(new Date(System.currentTimeMillis()));
				result = auditLogMapper.insertSelective(AuditLog);
			}
		}
		return result;
	}

	@Override
	@Transactional
	public int updateMerchant(String custId, MerchantUpdateDto param) throws Exception {
		//判断用户是否存在数据商家数据
		Merchant merchant = selectByPrimaryKey(custId);
		int result = 0;
		if(merchant==null){
			throw new BaseBusinessException(CustError.MERCHANT_NOT_PASS);
		}else{
			//转换BEAN
			BeanUtils.copyProperties(param, merchant);
			//处理轮播图的数组
			List<String> carouselPicsArray = param.getCarouselPicsArray();
			if(carouselPicsArray!=null&&carouselPicsArray.size()>0){
				String join = StringUtils.join(carouselPicsArray,",");
				merchant.setCarouselPics(join);
			}
			//修改商家店铺信息
			
			merchant.setCustId(custId);
			result = updateByPrimaryKeySelective(merchant);
			//修改商家服务标签
			if(param.getIds()!=null||param.getTagIds()!=null){
				CustTagUpdateDto tags = new CustTagUpdateDto();
				tags.setIds(param.getIds());
				tags.setTagIds(param.getTagIds());
				result += iCustTagServiceCore.updateCustMerchantTag(custId, tags);
			}
		}
		return result;
	}

	@Override
	public MerchantDetailVO findMerchant(String custId) throws Exception {
		//获取商家信息详情
		MerchantDetailVO result = merchantMapper.findMerchantDetails(custId);
		//处理轮播图，整理成数组
		String carouselPics = result.getCarouselPics();
		if(StringUtils.isNotBlank(carouselPics)){
			String[] split = carouselPics.split(",");
			result.setCarouselPicsArr(Arrays.asList(split));
		}
		return result;
	}

	@Override
	public Map<String, Object> selectMerchantInfo(String custId) {
		return merchantMapper.selectMerchantInfo(custId);
	}
	
	@Override
	@Transactional
	public int insertInitializeMerchantTable(String custId) throws Exception {
		int result = 0;
		//初始化钱包
		result = initializeWallet(custId);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		//初始化商家统计表
		result = initializeMerchantStatistics(custId);
		if(result!=1)throw new BaseBusinessException(BaseBusinessError.INTER_ERROR);
		return result;
	}

	private int initializeMerchantStatistics(String custId) {
		MerchantStatistics statistics = new MerchantStatistics();
		statistics.setCustId(custId);
		statistics.setGrade(Constant.DEFAULT_MERCHANT_GRADE);
		statistics.setOrderCount(Constant.DEFAULT_MERCHANT_ORDERCOUNT);
		return merchantStatisticsMapper.insertSelective(statistics);
	}

	private int initializeWallet(String custId) {
		Wallet wallet = new Wallet();
		wallet.setAccumulatedIncome(0);
		wallet.setAccumulatedRewards(0);
		wallet.setAccumulatedWithdraw(0);
		wallet.setCustId(custId);
		wallet.setPayPassword(null);//初始话支付密码
		wallet.setPrePayMoney(0);
		wallet.setTotalMoney(0);
		wallet.setUpdateTime(new Date());
		return walletMapper.insert(wallet);
	}

}
