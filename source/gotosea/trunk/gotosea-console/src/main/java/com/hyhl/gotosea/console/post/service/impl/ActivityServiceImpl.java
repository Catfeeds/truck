package com.hyhl.gotosea.console.post.service.impl;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.ProdError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.post.service.ActivityService;
import com.hyhl.gotosea.core.comm.dao.*;
import com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.vo.*;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.mapper.CustMapper;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.prod.mapper.ProdServeMapper;
import com.hyhl.gotosea.core.prod.mapper.PubResourceMapper;
import com.hyhl.gotosea.core.prod.mapper.ServiceDetailMapper;
import com.hyhl.gotosea.core.prod.po.ServiceDetail;
import com.hyhl.gotosea.core.ref.mapper.BusinessUnitMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

import static com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum.*;

@Service
public class ActivityServiceImpl extends BaseServiceImpl<TActivity> implements ActivityService{
    @Resource
    private TActivityMapper activityMapper;
    @Resource
    private PubResourceMapper pubResourceMapper;
    @Resource
    private TActivityCustMapper activityCustMapper;
    @Resource
    private TActivityServiceMapper activityServiceMapper;
    @Resource
    private ServiceDetailMapper serviceDetailMapper;
    @Resource
    private CustMapper custMapper;
    @Resource
    private ProdServeMapper prodServeMapper;
    @Resource
    private BusinessUnitMapper businessUnitMapper;
    /**
     * 列举活动列表
     * @param activity
     * @return
     */
    @Override
    public WebResponse listActivity(TActivity activity) {
        Pager<TActivity> pager = selectByPage(new PageExcute<TActivity>() {
            @Override
            public List<TActivity> excute() {
                return activityMapper.select(activity);
            }
        });
        pager.setContent(conActListToVo(pager.getContent()));
        return new WebResponse("success","",pager);
    }

    /**
     * 获取活动详情
     * @param actId
     * @return
     */
    @Override
    public WebResponse getActById(Long actId) {
        TActivity activity = activityMapper.selectByPrimaryKey(actId);

        //创建activityVo
        ConActVo conActVo = new ConActVo();
        BeanUtils.copyProperties(activity,conActVo);
        conActVo.setDestinationName(pubResourceMapper.selectByPrimaryKey(activity.getDestination()).getName());
        conActVo.setBusinessUnitName(businessUnitMapper.selectByPrimaryKey(activity.getBusinessUnitId()).getName());
        //->获取状态名称
        conActVo.setStatusName(getStatusName(conActVo.getStatus()));

        //设置活动服务
        TActivityService activityService = new TActivityService();
        activityService.setActivityId(activity.getId());
        //->通过活动id查找所有活动服务
        List<TActivityService> activityServices = activityServiceMapper.select(activityService);
        conActVo.setConActServeVos(actServiceToVo(activityServices));

        //加入行程的用户
        TActivityCust activityCust = new TActivityCust();
        activityCust.setActivityId(actId);
        //->通过活动id获取行程用户
        List<TActivityCust> activityCusts = activityCustMapper.select(activityCust);

        return new WebResponse("success","",conActVo);
    }


    /**
     * 获取活动状态内容
     * @param status
     * @return
     */
    private String getStatusName(Integer status){
        switch (ActivityStatusEnum.getByCode(status)){
            case 待发布:
                return 待发布.getName();
            case 已发布:
                return 已发布.getName();
            case 已确认:
                return 已确认.getName();
            case 已下订待出行:
                return 已下订待出行.getName();
            case 行程中:
                return 行程中.getName();
            case 已结束:
                return 已结束.getName();
            case 已撤销:
                return 已撤销.getName();
        }
        return "";
    }

    private List<ActivityCustVo> activityCustToVo(List<TActivityCust> activityCusts){
        List<String> custIds = new ArrayList<>();
        for (TActivityCust activityCustTmp:activityCusts){
            custIds.add(activityCustTmp.getCustId());
        }
        if (custIds.size() == 0){
            return null;
        }
        //根据ids获取所有cust
        Example example = new Example(Cust.class);
        example.createCriteria().andIn("id",custIds);
        List<Cust> custs = custMapper.selectByExample(example);

        //通过cust属性复制给vo
        List<ActivityCustVo> activityCustVos = new ArrayList<>();
        for (Cust cust:custs){
            ActivityCustVo activityCustVo = new ActivityCustVo();
            BeanUtils.copyProperties(cust,activityCustVo);
            activityCustVo.setPicture(custMapper.selectByPrimaryKey(cust.getId()).getPicture());
            activityCustVos.add(activityCustVo);
        }
        return activityCustVos;
    }

    /**
     * actServiceToVo 活动服务转Vo
     * @param activityServices
     * @return
     */
    private List<ConActServeVo> actServiceToVo(List<TActivityService> activityServices) {
        List<ConActServeVo> conActServeVos = new ArrayList<>();
        for (TActivityService activityService:activityServices){
            ConActServeVo conActServeVo = new ConActServeVo();
            BeanUtils.copyProperties(activityService,conActServeVo);
            String serviceName = prodServeMapper.selectByPrimaryKey(activityService.getServiceId()).getName();
            conActServeVo.setServiceName(serviceName);
            conActServeVos.add(conActServeVo);
        }
        return conActServeVos;
    }

    /**
     * 服务明细转Vo
     * @return
     */
    private List<ActivityServiceDetailVo> serviceDetailToVo(List<TActivityServiceDetail> serviceDetails){
        List<ActivityServiceDetailVo> serviceDetailVos = new ArrayList<>();
        for (TActivityServiceDetail activityServiceDetail:serviceDetails){
            ActivityServiceDetailVo serviceDetailVo = new ActivityServiceDetailVo();
            BeanUtils.copyProperties(activityServiceDetail,serviceDetailVo);
            ServiceDetail serviceDetail = serviceDetailMapper.selectByPrimaryKey(activityServiceDetail.getServiceDetailId());
            if (serviceDetail == null){
                throw new BaseBusinessException(ProdError.SERVICE_DETAIL_NOTFOUND);
            }
            serviceDetailVo.setServiceDetailName(serviceDetail.getName());
            serviceDetailVos.add(serviceDetailVo);
        }
        return serviceDetailVos;
    }

    private List<ConActListVo> conActListToVo(List<TActivity> activities){
        List<ConActListVo> conActListVos = new ArrayList<>();
        for (TActivity activity:activities){
            ConActListVo conActListVo = new ConActListVo();
            BeanUtils.copyProperties(activity,conActListVo);
            conActListVo.setDestination(pubResourceMapper.selectByPrimaryKey(activity.getDestination()).getName());
            conActListVo.setStatusName(getStatusName(activity.getStatus()));
            conActListVos.add(conActListVo);
        }
        return conActListVos;
    }

}
