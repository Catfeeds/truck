package com.hyhl.gotosea.core.local.util;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.local.mapper.AreaMapper;
import com.hyhl.gotosea.core.local.mapper.TLocatorMapper;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.local.vo.AreaVo;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 15:00
**/
@Component
public class LocalHelper {

    @Resource
    private RedisService redisService;

    @Resource
    private ProdServeMapper prodServeMapper;

    @Resource
    private AreaMapper areaMapper;
    
    @Autowired
    private TLocatorMapper tLocatorMapper;

    @Resource
    private MerchantMapper merchantMapper;

    public final static String LinkageArea="_local:linkage_area";

    public final static String MerchantArea="_local:merchant_area";

    public final static String RouteArea="_local:route_area";

    public final static String AllAreasIn3="_local:all_areas_in_3";
    
    public final static String AllAreasAll="_local:all_areas_all";
    
    public final static String AllLocator="_local:all_locator";

    private final static ObjectMapper objectMapper=new ObjectMapper();

    @PostConstruct
    public void init() throws Exception {
        //初始有线路的省市联动
        loadAreaWithRoute();
        //初始有商家的省市联动
        loadAreaWithMerchant();
        //加载省市区联动
        loadLinkageArea();
        //加载区域列表，level=3
//        Map<Object, Object> map = redisService.hgetAll(AllAreasIn3);
//        if(null==map||map.size()==0){
//            List<AreaVo> vos = areaMapper.selectAreaLevelIn3();
//            if(null!=vos&&vos.size()>0){
//                for (AreaVo vo:vos){
//                    redisService.hset(AllAreasIn3,vo.getAreaId().toString(),vo.getAreaName());
//                }
//            }
//        }
        //加载定位点
        loadLocators();
        
        //加载区域所有等级联动
        loadAllArea(); 
    }
    
    public void loadAllArea()throws Exception {
    	 Map<Object, Object> map = redisService.hgetAll(AllAreasAll);
         if(null==map||map.size()==0){
             List<AreaVo> vos = areaMapper.selectAreaAll();
             if(null!=vos&&vos.size()>0){
                 for (AreaVo vo:vos){
                     redisService.hset(AllAreasAll,vo.getAreaId().toString(),vo.getAreaName());
                 }
             }
         }
    }

    public List<AreaVo> loadLinkageArea()throws Exception {
        List<AreaVo> areas;
        String s = redisService.get(LinkageArea);
        if(null!=s){
            areas=objectMapper.readValue(s,new TypeReference<List<AreaVo>>() {});
        }else {
            areas = areaMapper.selectLinkageArea();
            redisService.set(LinkageArea,objectMapper.writeValueAsString(areas));
        }
        return areas;
    }

    public List<AreaVo> loadAreaWithMerchant()throws Exception {
        List<AreaVo> areas=null;
        String s = redisService.get(MerchantArea);
        if(null!=s){
            areas=objectMapper.readValue(s,new TypeReference<List<AreaVo>>() {});
        }else {
            List<Integer> areaIds = merchantMapper.selectAreasWithMerchant();
            if(null!=areaIds&&areaIds.size()>0){
                areas = areaMapper.selectAreas(StringUtils.join(areaIds,","));
                redisService.set(MerchantArea,objectMapper.writeValueAsString(areas));
            }
        }
        return areas;
    }

    public List<AreaVo> loadAreaWithRoute()throws Exception {
        List<AreaVo> areas=null;
        String s = redisService.get(RouteArea);
        if(null!=s){
            areas=objectMapper.readValue(s,new TypeReference<List<AreaVo>>() {});
        }else {
            List<Integer> areaIds = prodServeMapper.selectAreasWithServe();
            if(null!=areaIds&&areaIds.size()>0){
                areas = areaMapper.selectAreas(StringUtils.join(areaIds,","));
                redisService.set(RouteArea,objectMapper.writeValueAsString(areas));
            }
        }
        return areas;
    }
    
    public void loadLocators()throws Exception {
        Map<Object, Object> map =  redisService.hgetAll(AllLocator);
        if(null==map||map.size()==0){
            List<TLocator> locators = tLocatorMapper.selectAll();
            if(Objects.nonNull(locators)&& !locators.isEmpty()){
                for (TLocator locator : locators){
                    redisService.hset(AllLocator, locator.getId().toString(), locator.getName());
                }
            }
        }
    }
}
