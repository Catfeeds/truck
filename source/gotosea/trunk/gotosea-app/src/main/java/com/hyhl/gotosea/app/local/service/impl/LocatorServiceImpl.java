package com.hyhl.gotosea.app.local.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.LocatorError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.local.po.Meteor;
import com.hyhl.gotosea.app.local.service.LocatorService;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.cust.mapper.MerchantTagMapper;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.cust.po.MerchantTag;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.local.mapper.AreaMapper;
import com.hyhl.gotosea.core.local.mapper.TLocatorMapper;
import com.hyhl.gotosea.core.local.mapper.TLocatorTypeMapper;
import com.hyhl.gotosea.core.local.po.Area;
import com.hyhl.gotosea.core.local.po.LocatorVo;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.local.po.TLocatorType;
import com.hyhl.gotosea.core.local.vo.BaseInfoVo;
import com.hyhl.gotosea.core.prod.mapper.PubResourceMapper;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.util.HttpClientUtil;

import net.sf.json.JSONObject;

@Service
public class LocatorServiceImpl implements LocatorService {

    @Resource
    private TLocatorMapper locatorMapper;
    @Resource
    private AreaMapper areaMapper;
    @Resource
    private FeatureTagMapper featureTagMapper;
    @Resource
    private MerchantMapper merchantMapper;
    @Resource
    private MerchantTagMapper merchantTagMapper;
    @Resource
    private PubResourceMapper pubResourceMapper;
    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private TLocatorTypeMapper locatorTypeMapper;


    @Value("${meteor.host}")
    private String meteorHosts;
//    @Override
//    public List<TLocatorVo> listLocator() {
//        List<TLocator> locators = locatorMapper.selectAll();
//
//        return poToVo(locators);
//    }

    /**
     * 根据条件列举资源点
     * @return
     */
    public List<LocatorVo> listLocatorByCond(TLocator locator){
        List<TLocator> locators = locatorMapper.listLocatorByCond(locator);
        return locatorToVo(locators);
    }

    /**
     * 获取定位点基本信息
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public WebResponse getBaseInfoByLocatorId(Integer id) throws Exception {
        BaseInfoVo baseInfoVo = new BaseInfoVo();

        Merchant merchant = new Merchant();
        merchant.setLocatorId(id);
        List<Merchant> merchants = merchantMapper.select(merchant);

        PubResource pubResource = new PubResource();
        pubResource.setLocatorId(id);
        List<PubResource> pubResources = pubResourceMapper.select(pubResource);

        if (merchants == null && pubResources ==null && merchants.size()>0 && pubResources.size()>0)
            throw new BaseBusinessException(LocatorError.RESOURCE_NOTFOUND);

        if (merchants !=null && merchants.size()>0){   //说明该定位点对应的资源是商家
            merchant=merchants.get(0);
            //资源id
            baseInfoVo.setResourceId(merchant.getCustId());
            //资源名
            baseInfoVo.setResourceName(merchant.getRealName());
            // 资源类型
            baseInfoVo.setResourceType(1);  //1 商家资源
            //获取地区
            baseInfoVo.setAddress(merchant.getAddress());
            //获取标签
            List<String> tags = getMerchTags(merchant.getCustId(),1);
            baseInfoVo.setFeatureTags(tags);
            //商家评分
            baseInfoVo.setGrade(merchantMapper.findMerchantDetails(merchant.getCustId()).getGrade());
        }
        else{  //公共资源

            pubResource = pubResources.get(0);
            //资源id
            baseInfoVo.setResourceId(pubResource.getId()+"");
            //资源类型
            baseInfoVo.setResourceType(2);  //公共资源
            //资源名称
            baseInfoVo.setResourceName(pubResource.getName());
            //资源地区
            TLocator locator =  locatorMapper.selectByPrimaryKey(id);
            Integer areaId = locator.getAreaId();
            Area area = areaMapper.selectByPrimaryKey(areaId);
            String areaName = area.getAreaName();
            baseInfoVo.setAddress(areaName);
            //天气编码
            baseInfoVo.setMeteorArea(area.getMeteorArea());

            //拼接气象查询路径
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
            String curDate=sdf.format(new Date());
            StringBuilder meteoAreaStr = new StringBuilder(meteorHosts);
            meteoAreaStr.append("/meteor/app/data/frcst?areaCode=").
            append(area.getMeteorArea()).append("&targetDay=").append(curDate);
            //气象数据
//            String meteorStr =  HttpClientUtil.sendHttpGet
//                    ("http://192.168.0.188:8181/meteor/app/data/frcst?areaCode=020&targetDay=2017-08-07");https://app.gotosea.com.cn/meteor
            String meteorStr =  HttpClientUtil.sendHttpGet(meteoAreaStr.toString());
            JSONObject jsonobject = JSONObject.fromObject(meteorStr);
            Meteor meteor =(Meteor)JSONObject.toBean(jsonobject.getJSONObject("data"),Meteor.class);
            BeanUtils.copyProperties(meteor,baseInfoVo);
            baseInfoVo.setWindDirection(meteor.getWindDireciton());
        }

        return new WebResponse("success","",baseInfoVo);
    }

    /**
     * 获取所有定位点类型
     * @return
     */
    @Override
    public List<TLocatorType> listLocatorType() {
        List<TLocatorType> locatorTypes = locatorTypeMapper.selectAll();
        if (locatorTypes == null){
            throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        }
        return locatorTypes;
    }

    /**
     * 获取商家标签
     * @param custId
     * @param level
     * @return
     */
    private List<String> getMerchTags(String custId,Integer level){
        MerchantTag merchantTag = new MerchantTag();
        merchantTag.setCustId(custId);
        List<MerchantTag> merchantTags =  merchantTagMapper.select(merchantTag);
        List<Integer> tagIds = new ArrayList<>();
        for ( MerchantTag tmp:merchantTags){
            tagIds.add(tmp.getTagId());
        }
        List<FeatureTag> featureTags = featureTagMapper.selectByIdsAndLevel(tagIds,level);
        List<String> tags = new ArrayList<>();
        for (FeatureTag featureTag:featureTags){
            tags.add(featureTag.getName());
        }
        return tags;
    }

    /**
     * poT0Vo
     * @param locators
     * @return
     */
    private List<LocatorVo> locatorToVo(List<TLocator> locators){
        List<LocatorVo> locatorVoList =new ArrayList<>();
        for (TLocator locator:locators){
            LocatorVo locatorVo = new LocatorVo();
            BeanUtils.copyProperties(locator,locatorVo);
            locatorVoList.add(locatorVo);
        }
        return locatorVoList;
    }
}
