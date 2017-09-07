package com.hyhl.gotosea.app.cust.service;

import com.hyhl.gotosea.app.cust.dto.LoginPwdDto;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.vo.CustVO;

public interface ICustService extends BaseService<Cust> {
	
	/**密码登录
	 * @param param
	 * @return
	 * @throws Exception
	 */
	CustVO findLoginByPwd(LoginPwdDto param)throws Exception;
	
	/**验证码登录
	 * @param phone
	 * @return
	 * @throws Exception
	 */
	CustVO findLoginByCode(String phone)throws Exception;
	
	/**首次登录注册
	 * @param phone 手机号
	 * @param invite 邀请码
	 * @return
	 * @throws Exception
	 */
	CustVO insertDefaultRegisterCust(String phone, String invite)throws Exception;
	
	
	/**APP-每日签到
	 * @param custId
	 * @return
	 * @throws Exception
	 */
	int updateCheckIn(String custId, String phone)throws Exception;
}
