package com.hyhl.gotosea.core.prod.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.prod.mapper.MercResoTypeMapper;
import com.hyhl.gotosea.core.prod.mapper.PubResourceMapper;
import com.hyhl.gotosea.core.prod.mapper.PubResourceTypeMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiceTypeMapper;
import com.hyhl.gotosea.core.prod.po.MerchantResourceType;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.po.PubResourceType;
import com.hyhl.gotosea.core.prod.po.ServiceType;
import com.hyhl.gotosea.core.ref.mapper.FeatureTagMapper;
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
public class ProdHelper {

    @Resource
    private RedisService redisService;

    @Resource
    private ServiceTypeMapper serviceTypeMapper;

    @Resource
    private MercResoTypeMapper mercResoTypeMapper;

    @Resource
    private PubResourceTypeMapper pubResourceTypeMapper;

    @Resource
    private PubResourceMapper pubResourceMapper;

    public final static String SERVICE_TYPE="_prod:service_type";

    public final static String MERCHANT_RESOURCE_TYPE="_prod:merchant_resource_type";

    public final static String PUB_RESOURCE_NAME="_prod:pub_resource_name";

    public final static String PUB_RESOURCE_TYPE="_prod:pub_resource_type";

    private final static ObjectMapper objectMapper=new ObjectMapper();

    @PostConstruct
    public void init() throws Exception {

        //初始化服务类型
        String s = redisService.get(SERVICE_TYPE);
        if(null==s){
            List<ServiceType> types = serviceTypeMapper.selectAll();
            if(Objects.nonNull(types)&& !types.isEmpty()){
                redisService.set(SERVICE_TYPE,objectMapper.writeValueAsString(types));
            }
        }

        //初始商家资源类型
        String mrt = redisService.get(MERCHANT_RESOURCE_TYPE);
        if(null==mrt){
            List<MerchantResourceType> list = mercResoTypeMapper.selectAll();
            if(Objects.nonNull(list)&& !list.isEmpty()){
                redisService.set(MERCHANT_RESOURCE_TYPE,objectMapper.writeValueAsString(list));
            }
        }

        //初始化公共资源类型
        String prt = redisService.get(PUB_RESOURCE_TYPE);
        if (null==prt){
            List<PubResourceType> prts = pubResourceTypeMapper.selectAll();
            if(Objects.nonNull(prts)&& !prts.isEmpty()){
                redisService.set(PUB_RESOURCE_TYPE,objectMapper.writeValueAsString(prts));
            }
        }

        //初始化公共资源id-名称
        Map<Object, Object> pr = redisService.hgetAll(PUB_RESOURCE_NAME);
        if (null==pr){
            List<PubResource> prs = pubResourceMapper.selectAll();
            if(Objects.nonNull(prs)&& !prs.isEmpty()){
                for (PubResource p:prs){
                    redisService.hset(PUB_RESOURCE_NAME,p.getId().toString(),p.getName());
                }
            }
        }
    }

    public List<PubResourceType> getPubResourceType()throws Exception{
        List<PubResourceType> types;
        String prt = redisService.get(PUB_RESOURCE_TYPE);
        if (null==prt){
            types = pubResourceTypeMapper.selectAll();
            if(Objects.nonNull(types)&& !types.isEmpty()){
                redisService.set(PUB_RESOURCE_TYPE,objectMapper.writeValueAsString(types));
            }
        }else {
            types=objectMapper.readValue(prt, new TypeReference<List<PubResourceType>>() {});
        }
        return types;
    }

    public List<MerchantResourceType> getMerchantResourceType()throws Exception {
        List<MerchantResourceType> types;
        String s = redisService.get(MERCHANT_RESOURCE_TYPE);
        if(null==s){
            types = mercResoTypeMapper.selectAll();
            if(Objects.nonNull(types)&& !types.isEmpty()){
                redisService.set(MERCHANT_RESOURCE_TYPE,objectMapper.writeValueAsString(types));
            }
        }else {
            types=objectMapper.readValue(s, new TypeReference<List<MerchantResourceType>>() {});
        }
        return types;
    }

    public List<ServiceType> getServeType()throws Exception {
        List<ServiceType> types;
        String s = redisService.get(SERVICE_TYPE);
        if(null==s){
            types = serviceTypeMapper.selectAll();
            if(Objects.nonNull(types)&& !types.isEmpty()){
                redisService.set(SERVICE_TYPE,objectMapper.writeValueAsString(types));
            }
        }else {
            types=objectMapper.readValue(s, new TypeReference<List<ServiceType>>() {});
        }
        return types;
    }
}
