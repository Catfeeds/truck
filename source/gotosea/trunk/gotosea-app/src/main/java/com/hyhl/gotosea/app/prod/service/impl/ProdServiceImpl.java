package com.hyhl.gotosea.app.prod.service.impl;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.prod.service.ProdService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.dto.AppSelectServe;
import com.hyhl.gotosea.core.prod.enm.ResourceEnum;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;
import com.hyhl.gotosea.core.prod.mapper.PubResourceMapper;
import com.hyhl.gotosea.core.prod.mapper.SalesPlanMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiceInfoMapper;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.po.SalesPlan;
import com.hyhl.gotosea.core.prod.po.ServiceInfo;
import com.hyhl.gotosea.core.prod.vo.*;
import com.hyhl.gotosea.core.util.DateUtil;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
* 
* @author Leslie.Lam
* @create 2017-07-27 16:22
**/
@Service
@Transactional(transactionManager = "prodTransationManager",readOnly = true)
public class ProdServiceImpl extends BaseServiceImpl<ProdServe> implements ProdService {

    @Resource
    private ProdServeMapper prodServeMapper;

    @Resource
    private ServiceInfoMapper serviceInfoMapper;

    @Resource
    private SalesPlanMapper salesPlanMapper;

    @Resource
    private PubResourceMapper pubResourceMapper;

    @Override
    public Pager<AppServesList> selectServesByPage(AppSelectServe param) {
        return selectByPage(()->prodServeMapper.selectServes(param));
    }

    @Override
    public Pager<AppThemeServes> selectServesByTheme(Integer themeId) {
        return selectByPage(()->prodServeMapper.selectServesByThemeId(themeId));
    }

    @Override
    public IslandDetail getIslandDetail(Integer id) throws Exception {
        return prodServeMapper.getIslandDetail(id);
    }

    @Override
    public CharterDetail getCharterDetail(Integer id) throws Exception {
        return prodServeMapper.getCharterDetail(id);
    }

    @Override
    public List<ServiceInfo> getServeInfo(Integer serveId) {
        List<ServiceInfo> infos = serviceInfoMapper.select(new ServiceInfo(serveId));
        return infos;
    }

    @Override
    public String getServeDetailItemContents(Integer serveId) {
        StringBuilder builder = new StringBuilder("<html><head></head><body>");
        List<ServiceInfo> infos = serviceInfoMapper.select(new ServiceInfo(serveId));
        if(null!=infos&&infos.size()>0){
            for (ServiceInfo info:infos){
                builder.append(info.getItemContent());
            }
        }
        builder.append("</body></html>");
        return builder.toString();
    }

    @Override
    public String getServeDetailItemContent(Integer itemId) {
        ServiceInfo info = serviceInfoMapper.selectByPrimaryKey(itemId);
        if(null==info) throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        return info.getItemContent();
    }

    @Override
    public List<SalePlanVo> selectSalePlans(Integer id) {
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.MONTH,2);
        instance.set(Calendar.DAY_OF_MONTH,0);
        return prodServeMapper.selectSalePlans(id,instance.getTime());
    }

    @Override
    public Map<String,Object> getPriceByIdAndTime(Integer id, String time) throws Exception {
        Map<String,Object> map=null;
        SalesPlan salePlan = new SalesPlan();
        salePlan.setServiceId(id);
        salePlan.setOfferDate(DateUtil.parse(time,"yyyy-MM-dd"));
        salePlan = salesPlanMapper.selectOne(salePlan);
        if(null!=salePlan){
            map=new HashedMap(1);
            map.put("price",null==salePlan?0:salePlan.getPreferPrice()/100);
        }
        return map;
    }

    @Override
    public List<FishingPoint> selectServeFishingPoint(Integer serveId) {
        return prodServeMapper.selectServeFishingPoint(serveId);
    }

    @Override
    public WebResponse listDestination() {

        Example example = new Example(PubResource.class);
        example.createCriteria().andEqualTo("pubResourceTypeId", ResourceEnum.目的地.code());

        return new WebResponse("success","",pubResourceMapper.selectByExample(example));
    }
}
