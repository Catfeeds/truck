package com.hyhl.gotosea.core.prod.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;
import com.hyhl.gotosea.core.prod.vo.ServiePubResoVo;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-08-14 16:07
 **/
public interface ServiePubResoMapper extends MyMapper<ServiePubReso> {

    List<ServiePubResoVo> selectServiePubResoByServeId(Integer serveId);
}
