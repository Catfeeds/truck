package com.hyhl.gotosea.core.ref.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.ref.mapper.BusinessUnitMapper;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
import com.hyhl.gotosea.core.ref.po.BusinessUnit;
import com.hyhl.gotosea.core.ref.po.FeatureTag;
import com.hyhl.gotosea.core.ref.service.DictionaryService;
import com.hyhl.gotosea.core.ref.vo.DictionaryVo;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 15:00
**/
@Component
public class RefHelper {

    @Resource
    private DictionaryService dictionaryService;

    @Resource
    private RedisService redisService;

    @Resource
    private FeatureTagMapper featureTagMapper;

    @Resource
    private BusinessUnitMapper businessUnitMapper;

    public final static String DIRECTORY="_ref:dictionary:";

    public final static String FEATURE_TAG="_ref:feature_tag";

    public final static String BUSINESS_UNIT="_ref:business_unit";

    private final static ObjectMapper objectMapper=new ObjectMapper();

    @PostConstruct
    public void init() throws Exception {
        //初始化数据字典
        List<DictionaryVo> vos = dictionaryService.selectAllWithChildren();
        if(Objects.nonNull(vos)&& !vos.isEmpty()){
            for (DictionaryVo vo:vos){
                if(null==redisService.get(DIRECTORY+vo.getName())){
                    redisService.set(DIRECTORY+vo.getName(), objectMapper.writeValueAsString(vo));
                }
            }
        }

        //初始化业务类型
        String s = redisService.get(BUSINESS_UNIT);
        if(null==s){
            List<BusinessUnit> units = businessUnitMapper.selectAll();
            if(Objects.nonNull(units)&& !units.isEmpty()){
                redisService.set(BUSINESS_UNIT,objectMapper.writeValueAsString(units));
            }
        }

        //初始化特征标签
        Map<Object, Object> tagMap = redisService.hgetAll(FEATURE_TAG);
        if(null==tagMap||tagMap.size()==0){
            List<FeatureTag> tags = featureTagMapper.selectAll();
            if(Objects.nonNull(tags)&& !tags.isEmpty()){
                for (FeatureTag tag:tags){
                    redisService.hset(FEATURE_TAG,tag.getId().toString(),tag.getName());
                }
            }
        }

    }

    public List<BusinessUnit> getBusinessUnit()throws Exception {
        List<BusinessUnit> units;
        String s = redisService.get(BUSINESS_UNIT);
        if(null==s){
            units = businessUnitMapper.selectAll();
            if(Objects.nonNull(units)&& !units.isEmpty()){
                redisService.set(BUSINESS_UNIT,objectMapper.writeValueAsString(units));
            }
        }else {
            units=objectMapper.readValue(s, new TypeReference<List<BusinessUnit>>() {});
        }
        return units;
    }
}
