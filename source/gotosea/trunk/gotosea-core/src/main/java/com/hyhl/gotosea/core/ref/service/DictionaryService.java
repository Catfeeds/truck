package com.hyhl.gotosea.core.ref.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.ref.po.Dictionary;
import com.hyhl.gotosea.core.ref.vo.DictionaryVo;

import java.util.List;

/**
 * @author Leslie.Lam
 * @create 2017-07-25 14:12
 **/
public interface DictionaryService extends BaseService<Dictionary> {

    List<DictionaryVo> selectAllWithChildren();

    void addDictionary(DictionaryVo param);

    void updateDictionary(Integer id,String remark);

    void delDictionary(Integer id);

    List<Dictionary> listDictionary(String name);

    DictionaryVo selectChildrenByName(String name) throws Exception;

    String getRemarkByNameAndCode(String name,Integer code) throws Exception;
}
