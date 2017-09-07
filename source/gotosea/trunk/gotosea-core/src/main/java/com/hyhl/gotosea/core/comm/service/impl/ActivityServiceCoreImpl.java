package com.hyhl.gotosea.core.comm.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.exception.type.ProdError;
import com.hyhl.gotosea.core.comm.dao.*;
import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;
import com.hyhl.gotosea.core.comm.enm.ActivityRuleEnum;
import com.hyhl.gotosea.core.comm.enm.ActivityServeEnum;
import com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.service.ActivityServeServiceCore;
import com.hyhl.gotosea.core.comm.service.ActivityServiceCore;
import com.hyhl.gotosea.core.comm.service.CustCommServiceCore;
import com.hyhl.gotosea.core.comm.vo.ActivityServiceVo;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.prod.dto.PriceDto;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.service.ProdServeService;
import com.hyhl.gotosea.core.prod.service.PubResServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActStatusChange;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.DateUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(transactionManager = "commTransactionManager",readOnly = true)
public class ActivityServiceCoreImpl extends BaseServiceImpl<TActivity> implements ActivityServiceCore{

    @Resource
    private TActivityMapper activityMapper;
    @Resource
    private TActivityServiceMapper activityServiceMapper;
    @Resource
    private TPostMapper postMapper;
    @Resource
    private CustCommServiceCore custCommServiceCore;
    @Resource
    private TActivityServiceResourceMapper actServiceResourceMapper;
    @Resource
    private ProdServeService prodServeService;
    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private MqProducer mqProducer;
    @Resource
    private PubResServiceCore pubResServiceCore;
    @Resource
    private ActOptServeMapper actOptServeMapper;

    /**
     * 判断活动日期是否结束
     */
    @Override
    @Transactional(transactionManager = "commTransactionManager")
    public void activityTime() throws JsonProcessingException {
        Date today = DateUtil.dateTimeToDate(new Date());

        //自动处理活动结束状态
        //->列举所有没有结束和撤消的活动
        List<Integer> activityStatus = new ArrayList<>();
        activityStatus.add(ActivityStatusEnum.已发布.getCode());
        activityStatus.add(ActivityStatusEnum.已确认.getCode());
        activityStatus.add(ActivityStatusEnum.已下订待出行.getCode());
        activityStatus.add(ActivityStatusEnum.行程中.getCode());

        Example example = new Example(TActivity.class);
        example.createCriteria().andIn("status",activityStatus);
        List<TActivity> activitys = activityMapper.selectByExample(example);
        for (TActivity activity:activitys){
            //->如果今天日期大于活动结束日期，那么自动改为结束状态
            if (activity.getEndDate().before(today)){
                activity.setStatus(ActivityStatusEnum.已结束.getCode());
            }
            //->如果活动开始时间大于今天且没有成行，自动取消
            if (activity.getBeginDate().after(today)){

                //->如果活动开始时间大于今天且付款没有到位，自动取消
                if ((activity.getStatus() == ActivityStatusEnum.已确认.getCode()
                        && activity.getPayCostomers()<activity.getCurCustomers())
                        || activity.getStatus() == ActivityStatusEnum.已发布.getCode()){

                    activity.setStatus(ActivityStatusEnum.已撤销.getCode());
                }else {
                    activity.setStatus(ActivityStatusEnum.行程中.getCode());

                    TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
                    if (post==null)
                        throw new BaseBusinessException(CommError.POST_NOT_EXIST);
                    Cust cust = custServiceCore.selectByPrimaryKey(post.getCustId());
                    MqCreditsNew creditsNew = new MqCreditsNew(cust.getId(), cust.getPhone(), CreditsRuleEnum.发布活动成功付款);
                    mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_new, creditsNew));
                }
            }
            activityMapper.updateByPrimaryKey(activity);
        }
    }


    /**
     * MQ更改活动状态
     * @param mqActStatusChange
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public void actStatusChange(MqActStatusChange mqActStatusChange) {
        switch (mqActStatusChange.getActivityRuleEnum()){
            case 订单已付款:
            case 订单撤销申请退款:
                changeActStatus(mqActStatusChange.getActId(),1);
                break;
            case 订单申请退款:
                changeActStatus(mqActStatusChange.getActId(),0);
                break;
        }
    }

    /**
     * 更改活动状态
     * @param actId
     * @param customers
     */
    private void changeActStatus(Long actId,Integer customers){

        //如果当前活动状态是已撤销，那么不做任何操作

        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        if (activity == null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_EXIST);
        if (activity.getStatus() == ActivityStatusEnum.已撤销.getCode())
            return;

        //当前付款人数
        Integer curPayNum = activity.getPayCostomers();
        activity.setPayCostomers(customers==1?curPayNum+1:curPayNum-1);

        //判断付款人数是否已经满了
        if (activity.getPayCostomers() == activity.getCurCustomers()){
            activity.setStatus(ActivityStatusEnum.已下订待出行.getCode());
            activity.setRefreshTime(new Date());
        }

        //判断是否付款人数从满的状态到不满状态
        if(curPayNum == activity.getCurCustomers() && customers == 0){
            activity.setStatus(ActivityStatusEnum.已确认.getCode());
        }

        activityMapper.updateByPrimaryKey(activity);
    }


    /**
     * 获取活动详情
     * @param actId
     * @return
     * @throws Exception
     */
    @Override
    public ActivityVo getActivityById(Long actId) throws Exception {
        //
        ActivityVo activityVo = new ActivityVo();
        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        if (activity == null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_FOUND);
        TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
        activityVo.setCustCommVo(custCommServiceCore.getCommVo(post.getCustId()));
        if (post == null)
            throw new BaseBusinessException(CommError.POST_NOT_EXIST);
        BeanUtils.copyProperties(post,activityVo);
        BeanUtils.copyProperties(activity,activityVo);

        //创建activityVo
        //设置活动服项目
        TActivityService activityService = new TActivityService();
        activityService.setActivityId(actId);
        List<TActivityService> activityServices = activityServiceMapper.select(activityService);
        activityVo.setActivityServiceVos(actServiceToVo(activityServices));

        return activityVo;
    }

    /**
     *
     * @param mqActService
     */
    @Override
    @Transactional(transactionManager = "commTransactionManager")
    public void actOptService(MqActService mqActService) {
        List<ActivityServiceDto> actServeDtos = mqActService.getActivityServiceDtos();
        //补充活动服务表
        List<TActOptService> optServices = new ArrayList<>();
        for(ActivityServiceDto actServeDto:actServeDtos){
            TActOptService optService = new TActOptService();
            optService.setActivityId(mqActService.getActId());
            optService.setServiceId(actServeDto.getServiceId());
            optService.setServiceTime(actServeDto.getServiceTime());
            optService.setServiceNum(actServeDto.getServiceNum());

            optServices.add(optService);
        }
        actOptServeMapper.insertList(optServices);
    }

    /**
     * actServiceToVo 活动服务转Vo
     * @param activityServices
     * @return
     */
    private List<ActivityServiceVo> actServiceToVo(List<TActivityService> activityServices) throws Exception {
        List<ActivityServiceVo> activityServiceVos = new ArrayList<>();

        for (TActivityService activityService:activityServices){
            ActivityServiceVo actServiceVo =new ActivityServiceVo();

            //获取ProdServe
            ProdServe serve = prodServeService.selectByPrimaryKey(activityService.getServiceId());
            if (serve==null) {
                throw new BaseBusinessException(ProdError.SERVICE_NOTFOUNT);
            }
            actServiceVo.setServiceName(serve.getName());
            actServiceVo.setPicture(serve.getPicture());
            BeanUtils.copyProperties(activityService,actServiceVo);

            //取服务公共资源
            TActivityServiceResource actServiceRes = new TActivityServiceResource();
            actServiceRes.setActivityServiceId(activityService.getId());
            List<TActivityServiceResource> actServiceResList= actServiceResourceMapper.select(actServiceRes);  //按照目前只能有一个服务只能选一个公共资源来算
            if (actServiceResList != null && actServiceResList.size()>0){
                actServiceRes = actServiceResList.get(0);

                if (activityService.getActivityServiceType()== ActivityServeEnum.AA项目.getCode()){
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    String serviceTime = sdf.format(DateUtil.dateTimeToDate(activityService.getServiceTime()));
                    PriceDto priceDto = prodServeService.getPubResoPrice(activityService.getServiceId(),serviceTime,actServiceRes.getPubResourceId());
                    actServiceVo.setPayFee(priceDto.getPreferPrice());
                }

                PubResource pubRes = pubResServiceCore.selectByPrimaryKey(actServiceRes.getPubResourceId());
                actServiceVo.setPubResourceId(pubRes.getId());
                actServiceVo.setPubResourceName(pubRes.getName());
            }
            activityServiceVos.add(actServiceVo);

        }
        return activityServiceVos;
    }
}
