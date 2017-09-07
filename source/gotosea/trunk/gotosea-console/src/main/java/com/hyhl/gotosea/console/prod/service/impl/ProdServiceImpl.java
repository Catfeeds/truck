package com.hyhl.gotosea.console.prod.service.impl;

import static com.hyhl.gotosea.core.prod.enm.ProdServeEnum.不可用;
import static com.hyhl.gotosea.core.prod.enm.ProdServeEnum.可用;
import static com.hyhl.gotosea.core.util.DateUtil.addDay;
import static com.hyhl.gotosea.core.util.DateUtil.dateTimeToDate;

import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.dto.CharterDetail;
import com.hyhl.gotosea.console.prod.dto.RouteDetail;
import com.hyhl.gotosea.console.prod.dto.ServeDto;
import com.hyhl.gotosea.console.prod.dto.ServePubReso;
import com.hyhl.gotosea.console.prod.dto.ServeSalePlan;
import com.hyhl.gotosea.console.prod.service.ProdService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.MerchantStatisticsEnum;
import com.hyhl.gotosea.core.local.mapper.TLocatorMapper;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.prod.dto.ConsoleSelectServe;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;
import com.hyhl.gotosea.core.prod.mapper.PubResourceMapper;
import com.hyhl.gotosea.core.prod.mapper.SalesPlanMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiceInfoMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiceTagMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiePubResoMapper;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.po.SalesPlan;
import com.hyhl.gotosea.core.prod.po.ServiceInfo;
import com.hyhl.gotosea.core.prod.po.ServiceTag;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;
import com.hyhl.gotosea.core.prod.vo.ConsoleServesList;
import com.hyhl.gotosea.core.prod.vo.ServiePubResoVo;
import com.hyhl.gotosea.core.rabbitmq.bean.MqMerchantStatistics;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.NumberGenerator;

import tk.mybatis.mapper.entity.Example;
/**
* 
* @author Leslie.Lam
* @create 2017-08-19 10:44
**/
@Service
@Transactional(transactionManager = "prodTransationManager",readOnly = true)
public class ProdServiceImpl extends BaseServiceImpl<ProdServe> implements ProdService {

    @Resource
    private ProdServeMapper prodServeMapper;

    @Resource
    private SalesPlanMapper salesPlanMapper;

    @Resource
    private ServiceInfoMapper serviceInfoMapper;

    @Resource
    private ServiceTagMapper serviceTagMapper;

    @Resource
    private ServiePubResoMapper serviePubResoMapper;

    @Resource
    private PubResourceMapper pubResourceMapper;

    @Resource
    private TLocatorMapper tLocatorMapper;
    
    @Autowired
    private MqProducer mqProducer;

    @Override
    public List<PubResource> selectPubResourceByPage(Integer type) {
        Example example=new Example(PubResource.class);
        example.createCriteria().andCondition("pub_resource_type_id=",type);
        return pubResourceMapper.selectByExample(example);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse addRoute(RouteDetail param) throws Exception {
        Integer destination = param.getDestination();
        PubResource pubResource = pubResourceMapper.selectByPrimaryKey(destination);
        Assert.notNull(pubResource,"公共资源不存在");
        TLocator tLocator = tLocatorMapper.selectByPrimaryKey(pubResource.getLocatorId());
        Assert.notNull(tLocator,"公共资源没有定位点");
        ProdServe s = addServe(param, () -> {
            ProdServe serve = new ProdServe();
            BeanUtils.copyProperties(param, serve);
            serve.setAreaId(tLocator.getAreaId());
            return serve;
        });
        serviePubResoMapper.insertSelective(new ServiePubReso(destination, s.getId()));
        return new WebResponse("SUCCESS","添加成功");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse addCharter(CharterDetail param) throws Exception {
        addServe(param,()->{
            ProdServe serve = new ProdServe();
            BeanUtils.copyProperties(param,serve);
            serve.setDuration(1);//出行周期默认一天
            return serve;
        });	
        MqMerchantStatistics statistics = new MqMerchantStatistics(param.getCustId(), MerchantStatisticsEnum.更新_更新商家服务数量);
        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.merchant_statistics, statistics));
        return new WebResponse("SUCCESS","添加成功");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public ProdServe addServe(ServeDto param,Supplier<ProdServe> supplier){
        ProdServe serve = supplier.get();
        serve.setCode(NumberGenerator.getServeNo());
        serve.setCreateTime(new Date());
        serve.setStatus(不可用.code());
        serve.setSoldNum(0);
        insert(serve);
        List<ServiceInfo> infos = param.getInfos();
        if(null!=infos&&infos.size()>0) {
            infos.forEach(info -> info.setServiceId(serve.getId()));
            serviceInfoMapper.insertList(infos);
        }
        List<Integer> tags = param.getTags();
        if(null!=tags&&tags.size()>0){
            serviceTagMapper.insertList(tags.stream().map(e->new ServiceTag(e,serve.getId())).collect(Collectors.toList()));
        }
        return serve;
    }

    @Override
    public Pager<ConsoleServesList> selectServeByPage(ConsoleSelectServe param) {
        return selectByPage(()->prodServeMapper.selectProdServes(param));
    }

    @Override
    public RouteDetail selectRouteDetail(Integer id) {
        RouteDetail detail = new RouteDetail();
        ProdServe serve = selectByPrimaryKey(id);
        if(null!=serve)BeanUtils.copyProperties(serve,detail);
        List<ServiePubReso> sprs = serviePubResoMapper.select(new ServiePubReso(id));
        if (null!=sprs&&sprs.size()>0)detail.setDestination(sprs.get(0).getPubResourceId());
        detail.setInfos(serviceInfoMapper.select(new ServiceInfo(id)));
        detail.setTags(serviceTagMapper.select(new ServiceTag(id)).stream().map(tag->tag.getTagId()).collect(Collectors.toList()));
        return detail;
    }

    @Override
    public CharterDetail selectCharterDetail(Integer id) {
        CharterDetail detail = new CharterDetail();
        ProdServe serve = selectByPrimaryKey(id);
        if(null!=serve)BeanUtils.copyProperties(serve,detail);
        detail.setInfos(serviceInfoMapper.select(new ServiceInfo(id)));
        detail.setTags(serviceTagMapper.select(new ServiceTag(id)).stream().map(tag->tag.getTagId()).collect(Collectors.toList()));
        return detail;
    }

    @Override
    public void updateServe(ServeDto param, Function<ProdServe, ProdServe> function) throws Exception {
        Integer id = param.getId();
        ProdServe serve = selectByPrimaryKey(id);
        Assert.notNull(serve,"服务不存在");
        if(Objects.equals(serve.getStatus(),可用.code()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN,"无法修改上架线路");
        updateByPrimaryKeySelective(function.apply(serve));
        //更新服务标签
        updateServiceTag(param.getTags(),id);
        //更新服务信息
        List<ServiceInfo> infos = param.getInfos();
        if(null!=infos&&infos.size()>0){
            infos.forEach(info -> {
                ServiceInfo serviceInfo = serviceInfoMapper.selectByPrimaryKey(info.getItemId());
                if(null!=serviceInfo){
                    BeanUtils.copyProperties(info,serviceInfo);
                    serviceInfoMapper.updateByPrimaryKeySelective(serviceInfo);
                }else {
                    info.setServiceId(id);
                    serviceInfoMapper.insert(info);
                }
            });
        }
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse updateRoute(RouteDetail param) throws Exception {
        Integer serveId = param.getId();
        Integer destination = param.getDestination();
        PubResource pubResource = pubResourceMapper.selectByPrimaryKey(destination);
        Assert.notNull(pubResource,"公共资源不存在");
        TLocator tLocator = tLocatorMapper.selectByPrimaryKey(pubResource.getLocatorId());
        Assert.notNull(tLocator,"公共资源没有定位点");
        updateServe(param,(serve)->{
            BeanUtils.copyProperties(param,serve);
            serve.setAreaId(tLocator.getAreaId());
            return serve;
        });
        List<ServiePubReso> sprs = serviePubResoMapper.select(new ServiePubReso(serveId));
        if (null!=sprs&&sprs.size()>0){
            if (sprs.size()==1){
                ServiePubReso spr = sprs.get(0);
                spr.setPubResourceId(destination);
                serviePubResoMapper.updateByPrimaryKey(spr);
            }else {
                serviePubResoMapper.delete(new ServiePubReso(serveId));
                serviePubResoMapper.insert(new ServiePubReso(destination, serveId));
            }
        }
        return new WebResponse("SUCCESS","修改成功");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse updateCharter(CharterDetail param) throws Exception {
        updateServe(param,(serve)->{
            BeanUtils.copyProperties(param,serve);
            return serve;
        });
        return new WebResponse("SUCCESS","修改成功");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void updateServiceTag(List<Integer> list,Integer serveId){
        List<ServiceTag> tags = serviceTagMapper.select(new ServiceTag(serveId));
        if(null!=list&&list.size()>0){
            List<ServiceTag> collect = list.stream().filter(integer -> {
                boolean flag = true;
                Iterator<ServiceTag> iterator = tags.iterator();
                while (iterator.hasNext()) {
                    ServiceTag tag = iterator.next();
                    if (Objects.equals(integer, tag.getTagId())) {
                        iterator.remove();
                        flag = false;
                        break;
                    }
                }
                return flag;
            }).map(e -> new ServiceTag(e, serveId)).collect(Collectors.toList());
            if(null!=collect&&collect.size()>0)serviceTagMapper.insertList(collect);
        }
        if(null!=tags&&tags.size()>0){
            Example example = new Example(ServiceTag.class);
            example.createCriteria().andIn("id",tags.stream().map(tag->tag.getId()).collect(Collectors.toList()));
            serviceTagMapper.deleteByExample(example);
        }
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse switchServe(Integer[] ids,Integer status) throws Exception {
        ProdServe serve = new ProdServe();
        serve.setStatus(status);
        batchUpdateSelective(serve,ids);
        return new WebResponse("SUCCESS","操作成功");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse addSalePlan(ServeSalePlan param) {
    	int result=0;
        Integer serviceId = param.getServiceId();
        List<SalesPlan> plans = param.getPlans().stream()
        .filter(e->0==salesPlanMapper.select(new SalesPlan(serviceId,e.getOfferDate())).size())
        .map(e->{
            e.setServiceId(serviceId);
            e.setNumSold(0);
            return e;
        }).collect(Collectors.toList());
        if(plans.size()>0)result=salesPlanMapper.insertList(plans);
        return new WebResponse(result);
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public WebResponse addPubReso(ServePubReso param) {
        int result=0;
        Integer serviceId = param.getServiceId();
        List<ServiePubReso> pubResos = param.getPubResos().stream()
        .filter(e->0==serviePubResoMapper.select(new ServiePubReso(e.getPubResourceId(),serviceId)).size())
        .map(e->{
            e.setServiceId(serviceId);
            return e;
        }).collect(Collectors.toList());
        if(pubResos.size()>0)result=serviePubResoMapper.insertList(pubResos);
        return new WebResponse(result);
    }

    @Override
    public Pager<SalesPlan> selectSalePlanByPage(Integer serveId) {
        return selectByPage(()->{
            Example example = new Example(SalesPlan.class);
            example.createCriteria().andCondition("service_id=",serveId);
            example.setOrderByClause("offer_date DESC");
            return salesPlanMapper.selectByExample(example);
        });
    }

    @Override
    public Pager<ServiePubResoVo> selectServiePubResoByPage(Integer serveId) {
        return selectByPage(()-> serviePubResoMapper.selectServiePubResoByServeId(serveId));
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void delSalePlan(Integer[] id) {
        if(null==id||0==id.length) throw new BaseBusinessException("400","请选择要删除的目标！");
        Date date = dateTimeToDate(addDay(new Date(),1));
        Arrays.asList(id).forEach(i->{
            SalesPlan plan = salesPlanMapper.selectByPrimaryKey(i);
            if(plan.getOfferDate().before(date))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN,"只能删除当天以后的定价计划");
        });
        Example example = new Example(SalesPlan.class);
        example.createCriteria().andIn("id",Arrays.asList(id));
        if(id.length!=salesPlanMapper.deleteByExample(example))throw new BaseBusinessException("400","删除失败！");
    }

    @Override
    @Transactional(transactionManager = "prodTransationManager")
    public void delServiePubReso(Integer[] id) {
        if(null==id||0==id.length) throw new BaseBusinessException("400","请选择要删除的目标！");
        Example example = new Example(ServiePubReso.class);
        example.createCriteria().andIn("id",Arrays.asList(id));
        if(id.length!=serviePubResoMapper.deleteByExample(example))throw new BaseBusinessException("400","删除失败！");
    }
}
