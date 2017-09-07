package com.hyhl.gotosea.core.ref.mapper;

import com.hyhl.gotosea.core.ref.po.Dictionary;
import com.hyhl.gotosea.core.ref.vo.DictionaryVo;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 14:06
**/
public interface DictionaryMapper extends Mapper<Dictionary> {

    List<DictionaryVo> findChildren(@Param("name")String name,@Param("parentCode")Integer parentCode);

    int getMaxCode(String name);
}
