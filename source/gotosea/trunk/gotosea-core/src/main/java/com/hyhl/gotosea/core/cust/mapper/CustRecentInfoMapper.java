package com.hyhl.gotosea.core.cust.mapper;

import java.util.Date;

import org.apache.ibatis.annotations.Param;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.po.CustRecentInfo;

public interface CustRecentInfoMapper extends MyMapper<CustRecentInfo> {
	
	/**更新用户最近登录信息
	 * @param custId
	 * @param ip
	 * @return
	 */
	int updateCustRecentInfo(@Param("custId")String custId,@Param("time")Date time,@Param("ip")String ip);
	
}