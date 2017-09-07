package com.hyhl.gotosea.core.cust.mapper;

import java.util.List;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.cust.po.WalletLog;
import com.hyhl.gotosea.core.cust.vo.WalletLogVO;

public interface WalletLogMapper extends MyMapper<WalletLog> {
	List<WalletLogVO> findWalletLog(String custId);
}