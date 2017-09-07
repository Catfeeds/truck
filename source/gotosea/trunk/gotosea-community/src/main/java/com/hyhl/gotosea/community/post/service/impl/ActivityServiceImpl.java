package com.hyhl.gotosea.community.post.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.exception.type.ProdError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.post.service.ActivityService;
import com.hyhl.gotosea.core.comm.dao.*;
import com.hyhl.gotosea.core.comm.dto.ActivityDto;
import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;
import com.hyhl.gotosea.core.comm.enm.ActivityServeEnum;
import com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum;
import com.hyhl.gotosea.core.comm.enm.PostEnum;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.service.CustCommServiceCore;
import com.hyhl.gotosea.core.comm.service.impl.ActivityServiceCoreImpl;
import com.hyhl.gotosea.core.comm.vo.ActivityCustVo;
import com.hyhl.gotosea.core.comm.vo.ActivityServiceVo;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.order.enm.OrderEnum;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.order.service.OrderService;
import com.hyhl.gotosea.core.prod.dto.PriceDto;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.service.ProdServeService;
import com.hyhl.gotosea.core.prod.service.PubResServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import com.hyhl.gotosea.core.sms.enm.SmsTemplate;
import com.hyhl.gotosea.core.sms.service.ISmsService;
import com.hyhl.gotosea.core.util.DateUtil;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
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
@Transactional(readOnly = true,transactionManager = "commTransactionManager")
public class ActivityServiceImpl extends BaseServiceImpl<TActivityCust> implements ActivityService{

    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private ISmsService smsService;
    @Resource
    private TActivityMapper activityMapper;
    @Resource
    private TActivityServiceMapper activityServiceMapper;
    @Resource
    private TPostMapper postMapper;
    @Resource
    private TActivityCustMapper activityCustMapper;
    @Resource
    private TActivityServiceResourceMapper serviceResourceMapper;
    @Resource
    private MqProducer mqProducer;
    @Resource
    private CustCommServiceCore custCommServiceCore;
    @Resource
    private ProdServeService prodServeService;
    @Resource
    private PubResServiceCore pubResServiceCore;
    @Resource
    private TActivityServiceResourceMapper actServiceResourceMapper;
    @Resource
    private OrderService orderService;

    /**
     * 活动成行
     * @param actId
     * @return
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse activityformed(Long actId) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
        if (activity==null || post==null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_EXIST);
        //判断当前用户是否为发起人
        if (!post.getCustId().equals(user.getId())){
            throw new BaseBusinessException(CommError.ACTIVITY_INIT_EXCEPTION);
        }

        //判断有没有活动参与用户
        TActivityCust activityCust = new TActivityCust();
        activityCust.setActivityId(actId);
        if (activityCustMapper.selectCount(activityCust)<=0)
            throw new BaseBusinessException(CommError.ACTIVITY_CUST_NOT_FOUND);

        //修改活动状态
        if (activity.getStatus()!=ActivityStatusEnum.已发布.getCode())
            throw new BaseBusinessException(CommError.ACTIVITY_STATUS_EXCEPTION);

        activity.setStatus(ActivityStatusEnum.已确认.getCode());
        activityMapper.updateByPrimaryKeySelective(activity);

        //发动短信(给加入活动的每个用户发送信息)
        smsService.sendSmsToRabbitMq(SmsTemplate._04_活动成行,getActCustPhone(actId));
        return new WebResponse("success","");
    }


    /**
     * 创建活动
     * @param actDto
     * @return
     */
    @Override
    @Transactional(transactionManager = "commTransactionManager")
    public WebResponse createAct(ActivityDto actDto) throws JsonProcessingException {
        BaseSessionUser user = AppContextHelper.getCurrentUser();


        //插入帖子
        TPost post = new TPost();
        BeanUtils.copyProperties(actDto,post);
        post.setSectionId(PostEnum.活动约伴.getCode());
        post.setPostTime(new Date());
        post.setThumbsNum(0);
        post.setCommentsNum(0);
        post.setCustId(user.getId());
        post.setFavoriteNum(0);
        post.setOnlyForMutualFans(actDto.getOnlyForMutaulFans());
        postMapper.insertUseGeneratedKeys(post);

        //插入活动
        TActivity activity = new TActivity();
        BeanUtils.copyProperties(actDto,activity);
        activity.setPostId(post.getId());
        activity.setStatus(ActivityStatusEnum.已发布.getCode());
        activity.setRefreshTime(new Date());
        activity.setCurCustomers(1);    //算上自己
        activity.setPayCostomers(0);
        //往t_activity插入数据
        activityMapper.insert(activity);

        //给post添加activityI
        post.setActivityId(activity.getId());
        postMapper.updateByPrimaryKey(post);


        //2 把服务项目/服务细节/服务活动信息取出来

        List<ActivityServiceDto> activityServiceDtos =actDto.getActivityServiceDtos();
        List<TActivityServiceResource> serviceResources = new ArrayList<>();
        if (activityServiceDtos==null || activityServiceDtos.size()<=0)
            throw new BaseBusinessException(CommError.ACTIVITY_NO_CHOOSE_SERVICE);
        for (ActivityServiceDto activityServiceDto:activityServiceDtos){    //遍历活动服务
            TActivityService activityService = new TActivityService();
            BeanUtils.copyProperties(activityServiceDto,activityService);
            //设置活动id
            activityService.setActivityId(activity.getId());

//            List<TActivityServiceDetail> serviceDetails = new ArrayList<>();
            //服务明细信息记录表
//            List<ActivityServiceDetailDto> serviceDetailDtos = activityServiceDto.getActivityServiceDetailDtos();
//            if (serviceDetailDtos!=null && serviceDetailDtos.size()>0){
//                for (ActivityServiceDetailDto serviceDetailDto:serviceDetailDtos){
//                    TActivityServiceDetail serviceDetail = new TActivityServiceDetail();
//                    BeanUtils.copyProperties(serviceDetailDto,serviceDetail);
//                    serviceDetail.setActivityServiceId(activityServiceDto.getServiceId());//设置服务id
//                    //->根据活动出发日期和服务明细项id获取价格
//                    DetailSalesPlan detailSalesPlan = new DetailSalesPlan();
//                    detailSalesPlan.setOfferDate(DateUtil.dateTimeToDate(activityServiceDto.getServiceTime()));
//                    detailSalesPlan.setServiceDetailId(serviceDetail.getServiceDetailId());
//                    detailSalesPlan = detailSalesPlanServiceCore.selectOne(detailSalesPlan);
//                    if (detailSalesPlan == null){
//                        throw new BaseBusinessException(ProdError.DETAIL_SALES_PLAN_NOTFOUND);
//                    }
//                    serviceDetail.setCostPrice(detailSalesPlan.getCostPrice());   //成本价
//                    serviceDetail.setMarketPrice(detailSalesPlan.getMarketPrice());   //市场价
//                    serviceDetail.setPreferPrice(detailSalesPlan.getPreferPrice());   //优惠价
//                    serviceDetails.add(serviceDetail);
//                }
//            }
//            //批量插入服务明细
//            activityServiceDetailMapper.insertList(serviceDetails);

            activityServiceMapper.insertUseGeneratedKeys(activityService);

            //服务公共资源信息记录表
            if(activityServiceDto.getPubResourceId()!=null){
                TActivityServiceResource serviceResource = new TActivityServiceResource();  //服务公共资源信息记录表
                serviceResource.setActivityServiceId(activityService.getId());    //服务id
                serviceResource.setPubResourceId(activityServiceDto.getPubResourceId());    //公共资源id
                serviceResources.add(serviceResource);
            }
        }
        //插入活动公共资源记录
        serviceResourceMapper.insertList(serviceResources);

        //发送rmq消息增加积分
        MqCreditsNew creditsNew = new MqCreditsNew(user.getId(), user.getPhone(), CreditsRuleEnum.发表活动);
        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_new, creditsNew));

        return new WebResponse("success","");
    }

    /**
     * 取消活动
     * @param actId
     * @return
     */
    @Override
    @Transactional(transactionManager = "commTransactionManager")
    public WebResponse activityCancle(Long actId) throws Exception {
        BaseSessionUser user = AppContextHelper.getCurrentUser();
        //判断活动是不是该用户发起
        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
        if (activity==null || post==null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_EXIST);
        if (!post.getCustId().equals(user.getId())){
            throw new BaseBusinessException(CommError.ACTIVITY_INIT_EXCEPTION);
        }


        //发送短信通知用户
        String phones = getActCustPhone(actId);
        if (!phones.equals("")){

            if (activity.getStatus()==ActivityStatusEnum.已发布.getCode()){
                smsService.sendSmsToRabbitMq(SmsTemplate._05_活动取消未成行,phones,"组织者取消活动");
            }
            else if(activity.getStatus()==ActivityStatusEnum.已确认.getCode()){
                smsService.sendSmsToRabbitMq(SmsTemplate._06_活动取消成行,phones,"组织者取消活动");
            }else {
                throw new BaseBusinessException(CommError.ACTIVITY_STATUS_EXCEPTION);
            }
        }

        //更改状态
        activity.setStatus(ActivityStatusEnum.已撤销.getCode());
        activityMapper.updateByPrimaryKey(activity);

        return new WebResponse("success","");
    }

    /**
     * 获取活动详情
     * @param actId
     * @return
     * @throws Exception
     */
    public ActivityVo getActivityById(Long actId) throws Exception {
        //
        BaseSessionUser user = AppContextHelper.getCurrentUser();

        ActivityVo activityVo = new ActivityVo();
        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        if (activity == null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_FOUND);
        TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
        activityVo.setCustCommVo(custCommServiceCore.getCommVo(post.getCustId()));
        if (post == null)
            throw new BaseBusinessException(CommError.POST_NOT_EXIST);
        BeanUtils.copyProperties(post, activityVo);
        BeanUtils.copyProperties(activity, activityVo);

        //目的地名称
        PubResource pubResource = pubResServiceCore.selectByPrimaryKey(activity.getDestination());
        if (pubResource==null)
            throw new BaseBusinessException(CommError.ACTIVITY_DES_NOT_EXIST);
        activityVo.setDestinationName(pubResource.getName());

        //是否是自己发的
        if (user==null){
            activityVo.setIsSelf(false);
            activityVo.setIsPay(false);
        }
        else {
            activityVo.setIsSelf(post.getCustId().equals(user.getId())?true:false);

            //判断是否已经付款
            List<Integer> payStatus = new ArrayList<>();
            payStatus.add(OrderEnum.已付费待确认.code());
            payStatus.add(OrderEnum.已确认待出行.code());

            Example orderExample = new Example(Order.class);
            orderExample.createCriteria().andEqualTo("custId",user.getId())
            .andEqualTo("orderType", OrderEnum.活动订单.code())
                    .andEqualTo("activityId",actId)
                    .andIn("status",payStatus);
            activityVo.setIsPay(orderService.selectCountByExample(orderExample)>0?true:false);
        }

        //创建activityVo
        //设置活动服项目
        TActivityService activityService = new TActivityService();
        activityService.setActivityId(actId);
        List<TActivityService> activityServices = activityServiceMapper.select(activityService);
        //调用coreImpl的方法
        activityVo.setActivityServiceVos(actServiceToVo(activityServices));

        return activityVo;
    }

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
                PubResource pubRes = pubResServiceCore.selectByPrimaryKey(actServiceRes.getPubResourceId());
                actServiceVo.setPubResourceId(pubRes.getId());
                actServiceVo.setPubResourceName(pubRes.getName());
            }

            //获取服务的价格
            actServiceVo.setPayFee(serve.getPreferPrice());

            activityServiceVos.add(actServiceVo);
        }
        return activityServiceVos;
    }


    /**
     * 获取加入行程的用户列表
     * @param actId 活动id
     * @return
     */
    @Override
    public WebResponse listActivityCust(Long actId) {
        TActivityCust activityCust = new TActivityCust();
        if (activityCust == null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_EXIST);

        activityCust.setActivityId(actId);
        Pager<TActivityCust>pager = selectByPage(new PageExcute<TActivityCust>() {
            @Override
            public List<TActivityCust> excute() {
                return activityCustMapper.select(activityCust);
            }
        });

        pager.setContent(activityCustToVo(pager.getContent()));
        return new WebResponse("success","",pager);
    }

    /**
     * 加入活动
     * @param actId
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse joinAct(Long actId) {

        Date today = new Date();

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        TActivity activity = activityMapper.selectByPrimaryKey(actId);
        if (activity==null)
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_EXIST);

        //判断报名时间是否已经结束
        if (today.after(activity.getApplyEndTime()))
            throw new BaseBusinessException(CommError.ACTIVITY_APPLY_EXPIRE);


        //判断活动状态是否可以加入
        if (activity.getStatus() == ActivityStatusEnum.已下订待出行.getCode()) {
            throw new BaseBusinessException(CommError.ACTIVITY_BLOCKED);
        } else if(activity.getStatus() == ActivityStatusEnum.已确认.getCode()) {
            throw new BaseBusinessException(CommError.ACTIVITY_BLOCKED);
        } else if(activity.getStatus() == ActivityStatusEnum.行程中.getCode()){
            throw new BaseBusinessException(CommError.ACTIVITY_BLOCKED);
        }else if(activity.getStatus() == ActivityStatusEnum.已结束.getCode()){
            throw new BaseBusinessException(CommError.ACTIVITY_EXPIRED);
        }

        //判断活动人数是否已经够了
        if (activity.getCurCustomers()>=activity.getMaxCustomers()-1){  //算上发帖人自己
            throw new BaseBusinessException(CommError.ACTIVITY_COSTOMERS_ENOUGH);
        }

        //判断是否已经加入活动了
        TActivityCust activityCust = new TActivityCust();
        activityCust.setActivityId(activity.getId());
        activityCust.setCustId(user.getId());
        if (activityCustMapper.selectCount(activityCust)>0)
            throw new BaseBusinessException(CommError.ACTIVITY_JOIN_EXIST);

        //插入 activity_cust表
        activityCust.setJoinTime(new Date());
        activityCustMapper.insert(activityCust);

        //判断是否是加入自己的活动
        TPost post = postMapper.selectByPrimaryKey(activity.getPostId());
        if (post.getCustId().equals(user.getId()))
            throw new BaseBusinessException(CommError.ACTIVITY_CUST_NOT_JOIN);

        //更新 活动已加入人数数量
        TActivity activityCustomers = new TActivity();
        activityCustomers.setId(actId);
        activityCustomers.setCurCustomers(activity.getCurCustomers()+1);
        activityMapper.updateByPrimaryKeySelective(activityCustomers);

        return new WebResponse("success","");
    }


    /**
     * 退出活动
     * @param actId
     * @return
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse quitActivity(Long actId) {
        BaseSessionUser user = AppContextHelper.getCurrentUser();


        //判断该用户是否已经加入了该活动
        TActivityCust activityCust = new TActivityCust();
        activityCust.setActivityId(actId);
        activityCust.setCustId(user.getId());
        if (activityCustMapper.select(activityCust).size()<=0)
            throw new BaseBusinessException(CommError.ACTIVITY_CUST_NOT_EXIST);

        //删除activity_cust表中的数据
        activityCustMapper.delete(activityCust);

        //活动人数数量-1
        TActivity activity = new TActivity();
        activity.setId(actId);
        activity.setCurCustomers(activity.getCurCustomers()-1);
        activityMapper.updateByPrimaryKeySelective(activity);
        return new WebResponse("success","");
    }


    /**
     * 获取参加活动用户的手机号(1,2,3)
     * @param actId
     * @return
     */
    private String getActCustPhone(Long actId){
        //获取活动
        TActivityCust activityCust = new TActivityCust();
        activityCust.setActivityId(actId);
        List<TActivityCust> activityCusts = activityCustMapper.select(activityCust);
        if (activityCusts!=null && activityCusts.size()>0){
            List<String> ids = new ArrayList<>();
            //获取活动用户id
            for (TActivityCust activityCustTmp:activityCusts) {
                ids.add(activityCustTmp.getCustId());
            }
            //获取活动用户
            Example custExample = new Example(Cust.class);
            custExample.createCriteria().andIn("id",ids);
            List<Cust> custs = custServiceCore.selectByExample(custExample);
            if (custs == null || custs.size()<=0)
                return null;
            //拼接手机号码
            StringBuilder sb = new StringBuilder();
            for (Cust custTmp:custs){
                sb.append(custTmp.getPhone()+',');
            }

            if (sb.toString().length()>0){
                return sb.toString().substring(0,sb.toString().length()-1);
            }
        }
        return "";
    }

    private List<ActivityCustVo> activityCustToVo(List<TActivityCust> activityCusts){
        List<String> custIds = new ArrayList<>();
        for (TActivityCust activityCustTmp:activityCusts){
            custIds.add(activityCustTmp.getCustId());
        }
        if (custIds.size() == 0){
            throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        }
        //根据ids获取所有cust
        Example example = new Example(Cust.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andIn("id",custIds);
        List<Cust> custs = custServiceCore.selectByExample(example);
        //通过cust属性复制给vo
        List<ActivityCustVo> activityCustVos = new ArrayList<>();
        for (Cust cust:custs){
            ActivityCustVo activityCustVo = new ActivityCustVo();
            BeanUtils.copyProperties(cust,activityCustVo);
            activityCustVos.add(activityCustVo);
        }
        return activityCustVos;
    }

}
