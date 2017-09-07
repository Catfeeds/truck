package com.hyhl.gotosea.core.cust.service;

import java.util.List;

import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.CreditsNewDto;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.po.CreditsCoef;
import com.hyhl.gotosea.core.cust.po.CreditsRule;
import com.hyhl.gotosea.core.cust.po.CustCreditsChangeLog;
import com.hyhl.gotosea.core.cust.vo.CreditVO;

public interface ICreditServiceCore extends BaseService<CustCreditsChangeLog> {
	/**用户积分-获取用户积分
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	CreditVO findCredits(String custId)throws Exception;
	
	/**用户积分-获取用户积分明细
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	Pager<?> findCreditChangeLog(String custId)throws Exception;
	
	/**用户积分-新增
	 * @param custId 用户id
	 * @param custPhone 用户手机号，用于Im推送
	 * @param type 类型枚举
	 * @param param 附带参数，1-消费增加积分，需要传入money消费金额，2-邀请好友增加积分，需要传入invite好友的手机号码
	 * @return imPushMsg 推送im消息 0标题 1 内容
	 * @throws Exception
	 */
	String[] updateCustCreditNew(String custId, CreditsRuleEnum type, CreditsNewDto param)throws Exception;
	
	/**用户积分-使用积分兑换优惠券/满减券
	 * @param custId
	 * @param couponId
	 * @return
	 * @throws Exception
	 */
	int insertCreditCoupon(String custId, Integer couponId, int number)throws Exception;
	
	/**用户积分-积分变更记录
	 * @param custId
	 * @param log
	 * @return
	 * @throws Exception
	 */
	int insertCustCreditsChangeLog(String custId, CustCreditsChangeLog log)throws Exception;
	
	/**用户积分-获取积分增加规则
	 * @return
	 * @throws Exception
	 */
	List<CreditsRule> findCreditsRules()throws Exception;
	
	/**用户积分-获取每日签到积分系数表
	 * @return
	 * @throws Exception
	 */
	List<CreditsCoef> findCreditsCoefs()throws Exception;
}
