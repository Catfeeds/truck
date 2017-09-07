package com.hyhl.gotosea.core.comm.service.impl;

import com.hyhl.gotosea.core.comm.service.CustCommServiceCore;
import com.hyhl.gotosea.core.comm.vo.CustCommVo;
import com.hyhl.gotosea.core.comm.vo.CustEvaVo;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustTagVO;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
import com.hyhl.gotosea.core.ref.service.ITagServiceCore;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustCommServiceCoreImpl implements CustCommServiceCore {

    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private ICustTagServiceCore custTagServiceCore;


    @Override
    public CustCommVo getCommVo(String custId) throws Exception {
        CustCommVo custCommVo = new CustCommVo();
        Cust cust = custServiceCore.selectByPrimaryKey(custId);
        if (cust == null)
            return null;
        BeanUtils.copyProperties(cust, custCommVo);
        //->取标签信息
        custCommVo.setCustTagVos(custTagServiceCore.findCustTravelerTag(custId));
        return custCommVo;
    }

    @Override
    public CustEvaVo getCustEvaVo(String custId) throws Exception {
        CustEvaVo custEvaVo = new CustEvaVo();
        Cust cust = custServiceCore.selectByPrimaryKey(custId);
        if (cust == null)
            return null;
        BeanUtils.copyProperties(cust, custEvaVo);
        List<CustTagVO> custTagVOs = custTagServiceCore.findCustTravelerTag(custId);

        if (custTagVOs!=null){
        List<Integer> ids = new ArrayList<Integer>(custTagVOs.size());
            for (CustTagVO custTagVO:custTagVOs){;
                ids.add(custTagVO.getTagId());
            }
            custEvaVo.setTags(ids);
        }
        return custEvaVo;
    }
}
