package com.hyhl.gotosea.core.cust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.po.WithdrawRequest;
import com.hyhl.gotosea.core.cust.vo.WithdrawRequestPagerVO;

public interface WithdrawRequestMapper extends MyMapper<WithdrawRequest> {
	/**后台管理-查询提现申请列表
	 * @param status
	 * @return
	 */
	List<WithdrawRequestPagerVO> findWithdrawRequests(@Param("list")List<Integer> statusList, @Param("phone")String phone, @Param("cardNo")String cardNo, @Param("status")Integer status);
}