package com.hyhl.gotosea.core.cust.mapper;

import java.util.List;
import java.util.Map;

import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.apache.ibatis.annotations.Select;

public interface CustMapper extends MyMapper<Cust>{
	List<Cust> selectAlls();
	List<Cust> selectAllByIds(List<String> custIds);

	@Select("SELECT name,phone FROM t_cust WHERE id=#{custId}")
	Map<String, Object> selectCustInfo(String custId);
}