package com.hyhl.gotosea.core.cust.service;

import java.util.Map;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.dto.CustUpdateDto;
import com.hyhl.gotosea.core.cust.dto.CustUpdatePwdDto;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.vo.CustDetailVO;

public interface ICustServiceCore extends BaseService<Cust> {
	
	/**客户-客户注册
	 * @param param
	 * @param type true则商家认证默认通过
	 * @throws Exception
	 */
	Cust insertRegisterCust(String phone, boolean type)throws Exception;
	
	/**客户-重置用户密码
	 * @param phone
	 * @param password
	 * @return
	 * @throws Exception
	 */
	int updateResetPassword(String phone, String password)throws Exception;
	
	/**客户-修改密码
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updatePassword(String id, CustUpdatePwdDto param)throws Exception;
	
	/**客户-修改客户信息
	 * @param id
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateCust(String id, CustUpdateDto param)throws Exception;
	
	/**客户-获取客户信息
	 * @param id
	 * @return
	 * @throws Exception
	 */
	CustDetailVO findCust(String id)throws Exception;

	Map<String,Object> selectCustInfo(String custId);
}
