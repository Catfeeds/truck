package com.hyhl.gotosea.core.order.service.impl;

import com.alipay.api.domain.AlipayTradeAppPayModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.hfocean.common.alipay.vo.AliayNotify;
import com.hfocean.common.weixin.dto.PayParam;
import com.hfocean.common.weixin.vo.WxpayNotify;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;
import com.hyhl.gotosea.core.comm.enm.ActivityRuleEnum;
import com.hyhl.gotosea.core.comm.enm.ActivityServeEnum;
import com.hyhl.gotosea.core.comm.enm.ActivityStatusEnum;
import com.hyhl.gotosea.core.comm.po.TActivity;
import com.hyhl.gotosea.core.comm.po.TActivityService;
import com.hyhl.gotosea.core.comm.po.TActivityServiceResource;
import com.hyhl.gotosea.core.comm.service.ActServeResServiceCore;
import com.hyhl.gotosea.core.comm.service.ActivityServeServiceCore;
import com.hyhl.gotosea.core.comm.service.ActivityServiceCore;
import com.hyhl.gotosea.core.common.function.Supplier;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.pay.AlipayService;
import com.hyhl.gotosea.core.common.pay.WechatPayService;
import com.hyhl.gotosea.core.common.pay.sign.RSA;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.order.dto.*;
import com.hyhl.gotosea.core.order.enm.CouponEnum;
import com.hyhl.gotosea.core.order.enm.OrderEnum;
import com.hyhl.gotosea.core.order.mapper.*;
import com.hyhl.gotosea.core.order.po.*;
import com.hyhl.gotosea.core.order.service.CouponCoreService;
import com.hyhl.gotosea.core.order.service.MercOrderService;
import com.hyhl.gotosea.core.order.service.OrderService;
import com.hyhl.gotosea.core.order.vo.*;
import com.hyhl.gotosea.core.prod.dto.PriceDto;
import com.hyhl.gotosea.core.prod.enm.ProdServeEnum;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.po.ServiePubReso;
import com.hyhl.gotosea.core.prod.service.ProdServeService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActService;
import com.hyhl.gotosea.core.rabbitmq.bean.MqActStatusChange;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.DateUtil;
import com.hyhl.gotosea.core.util.NumberGenerator;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.hyhl.common.exception.BaseBusinessError.PARAMETER_ERROR;
import static com.hyhl.common.exception.type.OrderError.*;
import static com.hyhl.gotosea.core.common.constant.Constant.ORDER_PAY_TIME;
import static com.hyhl.gotosea.core.order.enm.MercOrderEnum.撤销订单;
import static com.hyhl.gotosea.core.order.enm.OrderEnum.*;
import static com.hyhl.gotosea.core.order.enm.StatusEnum.待处理;
import static com.hyhl.gotosea.core.prod.enm.ProdServeEnum.*;
import static com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum.*;
import static com.hyhl.gotosea.core.util.DateUtil.*;
/**
* 
* @author Leslie.Lam
* @create 2017-08-10 10:11
**/
@Service
@Transactional(transactionManager = "orderTransationManager",readOnly = true)
public class OrderServiceImpl extends BaseServiceImpl<Order> implements OrderService {

    private final transient Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Resource
    private ICustServiceCore iCustServiceCore;

    @Resource
    private CouponCoreService couponCoreService;

    @Resource
    private ProdServeService prodServeService;

    @Resource
    private WechatPayService wechatPayService;

    @Resource
    private AlipayService alipayService;

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private OrderServeMapper orderServeMapper;

    @Resource
    private OrderServeResoMapper orderServeResoMapper;

    @Resource
    private OrderTravelersMapper orderTravelersMapper;

    @Resource
    private OrderServeEvaluationMapper orderServeEvaluationMapper;

    @Resource
    private OrderLogMapper orderLogMapper;

    @Resource
    private MqProducer mqProducer;

    @Resource
    private CustPayLogMapper custPayLogMapper;

    @Resource
    private MercOrderService mercOrderService;

    @Resource
    private RefundApplyMapper refundApplyMapper;

    @Resource
    private ActivityServiceCore activityServiceCore;

    @Resource
    private ActivityServeServiceCore activityServeServiceCore;
    @Resource
    private ActServeResServiceCore actServeResServiceCore;


    @Override
    public PerOrderDetail selectOrderDetail(Integer id) throws Exception {
        PerOrderDetail detail = orderMapper.selectPerOrderDetail(id);
        if(null!=detail){
            detail.setDiscount(detail.getPreferPrice()-detail.getPayFee());
            detail.setFlag(getRefundFlag(detail.getDepartureTime()));
            detail.setRestTime(getOrderRestPayTime(detail.getCreateTime()));
            Long actId = detail.getActivityId();
            if (actId!=null){
                //设置活动详情
                detail.setActivityVo(activityServiceCore.getActivityById(actId));
                //设置该活动的所有AA 自选服务市场价格
                ActivityServePrice actServePrice = getActServePriceByActId(actId,null);
                detail.setAaServePrice(actServePrice.getAaMarketPrice());
                detail.setOptServePrice(actServePrice.getOptMarketPrice());
            }
        }
        return detail;
    }

    /**
     * 判断订单是否能退款
     * @param departure
     * @return
     */
    public boolean getRefundFlag(Date departure){
        return departure.after(getDateTimePoint(addDay(new Date(),1),0,0,0));
    }

    /**
     * 根据活动活动获取服务价格
     */
    private ActivityServePrice getActServePriceByActId(Long actId,List<ActivityServiceDto> activityServiceDtos) throws Exception {

        ActivityServePrice actServePrice = new ActivityServePrice();

        //获取活动
        TActivity activity = activityServiceCore.selectByPrimaryKey(actId);
        if (activity==null){
            throw new BaseBusinessException(CommError.ACTIVITY_NOT_FOUND);
        }
        TActivityService activityService = new TActivityService();
        activityService.setActivityId(actId);
        //获取活动所选服务
        List<TActivityService> activityServices = activityServeServiceCore.select(activityService);
        if (activityServices==null || activityServices.size()<=0)
            return null;

        //遍历活动服务
        Integer aaPreferPrice = 0;    //aa总的优惠价
        Integer aaCostPrice = 0; //aa总的成本价
        Integer aaMarketPrice = 0;   //aa总的市场价

        Integer optPreferPrice = 0;
        Integer optCostPrice = 0;
        Integer optMarketPrice = 0;

        for (TActivityService actServeTmp:activityServices){
            //获取活动服务所选公共资源点
            TActivityServiceResource serviceResource = new TActivityServiceResource();
            serviceResource.setActivityServiceId(actServeTmp.getId());
            serviceResource = actServeResServiceCore.selectOne(serviceResource);
            if (serviceResource==null)
                throw new BaseBusinessException(CommError.ACTIVITY_SERVE_PUB_NOT_EXIST);
            Integer putResourceId = serviceResource.getPubResourceId();
            //->获取公共资源定价
            PriceDto priceDto = null;
            if(actServeTmp.getActivityServiceType() == ActivityServeEnum.AA项目.getCode()){
                priceDto = prodServeService.getPubResoPrice(actServeTmp.getServiceId(), dateToString(actServeTmp.getServiceTime(),"yyyy-MM-dd"),putResourceId);
                Assert.notNull(priceDto,"该资源没有定价");

                aaCostPrice = aaCostPrice + (priceDto.getCostPrice()*actServeTmp.getServiceNum()/activity.getCurCustomers());//服务价格*分数/活动当前人数
                aaMarketPrice = aaMarketPrice + (priceDto.getMarketPrice()*actServeTmp.getServiceNum()/activity.getCurCustomers());
                aaPreferPrice = aaPreferPrice + (priceDto.getPreferPrice()*actServeTmp.getServiceNum()/activity.getCurCustomers());
            }else if (actServeTmp.getActivityServiceType() == ActivityServeEnum.自选项目.getCode()){

                ActivityServiceDto activityServiceDto = getOptServe(actServeTmp.getServiceId(),actServeTmp.getSeq(),activityServiceDtos);
                if (activityServiceDto==null)
                    throw new BaseBusinessException(CommError.ACTIVITY_SERVE_OPT_NOT_EXIST);

                Date serviceTime = activityServiceDtos!=null?activityServiceDto.getServiceTime():actServeTmp.getServiceTime();
                Integer serviceNum = activityServiceDtos!=null?activityServiceDto.getServiceNum():actServeTmp.getServiceNum();

                priceDto = prodServeService.getPubResoPrice(actServeTmp.getServiceId(), dateToString(serviceTime,"yyyy-MM-dd"),putResourceId);
                Assert.notNull(priceDto,"该资源没有定价");

                optCostPrice = optCostPrice+priceDto.getCostPrice()*serviceNum;
                optMarketPrice = optMarketPrice+priceDto.getMarketPrice()*serviceNum;
                optPreferPrice = optPreferPrice+priceDto.getPreferPrice()*serviceNum;
            }
        }

        actServePrice.setAaCostPrice(aaCostPrice);
        actServePrice.setAaMarketPrice(aaMarketPrice);
        actServePrice.setAaPreferPrice(aaPreferPrice);
        actServePrice.setOptCostPrice(optCostPrice);
        actServePrice.setOptMarketPrice(optMarketPrice);
        actServePrice.setOptPreferPrice(optPreferPrice);
        return actServePrice;
    }

    private ActivityServiceDto getOptServe(Integer serviceId,Integer seq,List<ActivityServiceDto> activityServiceDtos){
        for (ActivityServiceDto activityServiceDto:activityServiceDtos){
            if (activityServiceDto.getServiceId()==serviceId && activityServiceDto.getSeq()==seq)
                return activityServiceDto;
        }
        return null;
    }

    @Override
    @Transactional
    public WebResponse orderRoute(OrderRoute param) throws Exception {
        Integer num = param.getNum();//购买数量
        if(!Objects.equals(param.getTogethers().size(),num)) throw new BaseBusinessException("400","购买数量与出行人数不一致");
        ProdServe serve = prodServeService.selectByPrimaryKey(param.getId());
        Assert.notNull(serve,"服务不存在");
        if (!(Objects.equals(serve.getServiceTypeId(),海岛游.code())||Objects.equals(serve.getServiceTypeId(),海钓.code())))
            throw new BaseBusinessException("403","错误的服务类型");
        Supplier<PriceDto> supplier= () -> prodServeService.getSalePlanPrice(param.getId(), param.getDeparture(), num);
        return new WebResponse(comOrder(param,serve,supplier,num,线路订单.code()));
    }

    public OrderResult comOrder(ComOrderDto param,ProdServe serve, Supplier<PriceDto> supplier,Integer num,Integer orderType) throws Exception {
        Date depar = parse(param.getDeparture(), "yyyy-MM-dd HH:mm");//出行时间
        Date today = new Date();
        if(depar.before(today)) throw new BaseBusinessException(TIME_INVALID);
        String custId= AppContextHelper.getCurrentUser().getId();
        if(serve.getBeginDate().after(today)) throw new BaseBusinessException(INVALID_SERVE);
        if(serve.getEndDate().before(today)) throw new BaseBusinessException(INVALID_SERVE);
        Integer advanceDays = serve.getAdvanceDays();//提前下单天数
        if(depar.before(addDay(today,advanceDays)))throw new BaseBusinessException(PARAMETER_ERROR,"所选服务提前下单时间为"+advanceDays+"天");
        Integer fullcutId = param.getCoupon();//满减券id
        Integer voucherId = param.getVoucher();//代金券id
        boolean useCoupon = null != fullcutId;
        boolean useVoucher = null != voucherId;
        if((useCoupon || useVoucher)&&!Objects.equals(serve.getCoupon(),1))throw new BaseBusinessException(UNSUPPOT_COUPON);
        Order order;
        Integer costPrice = serve.getCostPrice();
        Integer preferPrice = serve.getPreferPrice();
        Integer marketPrice = serve.getMarketPrice();
        PriceDto dto = supplier.get();
        if(null!=dto){
            costPrice = dto.getCostPrice();
            preferPrice = dto.getPreferPrice();
            marketPrice = dto.getMarketPrice();
        }
        serve.setSoldNum(num+serve.getSoldNum());
        prodServeService.updateByPrimaryKey(serve);
        Integer payFee = preferPrice*num;//下单金额
        String orderNO = NumberGenerator.getOrderNo(false);
        if(useCoupon) payFee-=couponCoreService.useCouponNum(fullcutId,CouponEnum.类型_满减券.getCode(),1,orderNO);
        if(useVoucher) payFee-=couponCoreService.useCouponNum(voucherId,CouponEnum.类型_代金券.getCode(),1,orderNO);
        List<Integer> togethers = param.getTogethers();
        //生成订单
        order = new Order();
        order.setOrderType(orderType);
        order.setStatus(已提交待付费.code());
        order.setCreateTime(today);
        order.setCustId(custId);
        order.setDepartureTime(depar);
        order.setEndTime(getOrderEndTime(serve.getDuration(), depar));
        order.setCostPrice(costPrice*num);
        order.setMarketPrice(marketPrice*num);
        order.setPreferPrice(preferPrice *num);
        order.setPayFee(payFee<=0?1:payFee);
        order.setOrderNo(orderNO);
        order.setRemark(serve.getName());
        order.setTravelersNum(togethers.size());
        order.setContacter(param.getContacter());
        order.setContacterPhone(param.getContacterPhone());
        order.setContacterRemark(param.getContacterRemark());
        order.setSign(RSA.getSign(order.getOrderNo(), custId));
        orderMapper.insert(order);

        //添加订单服务记录
        OrderServe orderServe = new OrderServe();
        orderServe.setName(serve.getName());
        orderServe.setCostPrice(costPrice);
        orderServe.setPreferPrice(preferPrice);
        orderServe.setMarketPrice(marketPrice);
        orderServe.setServiceId(serve.getId());
        orderServe.setServiceTypeId(serve.getServiceTypeId());
        orderServe.setServiceDate(depar);
        orderServe.setOrderId(order.getId());
        orderServe.setServiceNum(num);
        orderServeMapper.insert(orderServe);

        //异步添加出行人员、订单和出行人员关系
        OrderTogethers orderTogethers = new OrderTogethers();
        orderTogethers.setOrderId(order.getId());
        orderTogethers.setTogethers(togethers);
        mqProducer.send(MqMessage.newInstance().put(order_togethers, orderTogethers));

        //返回结果
        OrderResult result = new OrderResult();
        result.setOrderId(order.getId());
        result.setOrderNo(order.getOrderNo());
        result.setOrderTime(today);
        result.setPayFee(order.getPayFee());
        result.setSign(order.getSign());
        result.setRestTime(getOrderRestPayTime(order.getCreateTime()));
        result.setOrderType(orderType);
        result.setDepartureTime(depar);
        result.setRemark(order.getRemark());
        result.setTravelersNum(order.getTravelersNum());
        result.setNum(num);
        return result;
    }

    private Date getOrderEndTime(Integer duration, Date depar) {
        Calendar instance = Calendar.getInstance();
        instance.setTime(depar);
        instance.add(Calendar.DAY_OF_YEAR,duration);
        instance.set(Calendar.HOUR_OF_DAY,0);
        instance.set(Calendar.MINUTE,0);
        instance.set(Calendar.SECOND,-1);
        return instance.getTime();
    }

    @Override
    @Transactional
    public WebResponse orderCharter(OrderCharter param) throws Exception {
        Integer id = param.getId();
        ProdServe serve = prodServeService.selectByPrimaryKey(id);
        Assert.notNull(serve,"服务不存在");
        if (!Objects.equals(serve.getServiceTypeId(),租船.code()))throw new BaseBusinessException("403","错误的服务类型");
        if(param.getTogethers().size()>serve.getMaxPersons())throw new BaseBusinessException("403","最大出行人数为"+serve.getMaxPersons());
        Supplier<PriceDto> supplier= () ->prodServeService.getPubResoPrice(id, param.getDeparture(),param.getPoint());
        return new WebResponse(comOrder(param,serve,supplier,1,单品服务订单.code()));
    }

    /**
     * 活动下单（针对租船服务）
     * @param actDto
     * @return
     */
    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public OrderResult orderAct(OrderActDto actDto) throws Exception {

        Date today = new Date();

        BaseSessionUser user = AppContextHelper.getCurrentUser();
//        if (user==null){
//            user = new BaseSessionUser();
//            user.setId("221121");
//        }

        //获取活动
        TActivity activity =  activityServiceCore.selectByPrimaryKey(actDto.getActivityId());


        //->判断状态
        if (activity.getStatus()!=ActivityStatusEnum.已确认.getCode())
            throw new BaseBusinessException(CommError.ACTIVITY_STATUS_EXCEPTION);
        if (activity.getBeginDate().after(new Date()))
            throw new BaseBusinessException(CommError.ACTIVITY_STATUS_EXCEPTION);

        //获取活动中的 钓点服务（AA和自选） 价格

        TActivityService activityService = new TActivityService();
        activityService.setActivityId(actDto.getActivityId());
        //->获取活动中的所有服务
        List<TActivityService> activityServices = activityServeServiceCore.select(activityService);
        Assert.notEmpty(activityServices,"该活动没有选择服务");

        Integer preferPriceSum = 0;    //总的优惠价
        Integer costPriceSum = 0; //总的成本价
        Integer marketPriceSum = 0;   //总的市场价

        Boolean serviceCoupon = false;  //判断是否有服务支持优惠券
        for (TActivityService actServiceTmp:activityServices){
            try {
                //->获取服务
                ProdServe prodServe = prodServeService.selectByPrimaryKey(actServiceTmp.getServiceId());
                Assert.notNull(prodServe,"服务不存在");

                if (prodServe.getStatus()== ProdServeEnum.不可用.code())
                    throw new BaseBusinessException("200","服务不可用");

                //->判断提前下单天数
                if(DateUtil.addDay(DateUtil.dateTimeToDate(today),prodServe.getAdvanceDays()).after(DateUtil.dateTimeToDate(actServiceTmp.getServiceTime())))
                    throw new BaseBusinessException(PARAMETER_ERROR,"所选服务提前下单时间为"+prodServe.getAdvanceDays()+"天");

                //->更新销量（如果指定时间内没有付款，则销量撤回； 目前AA服务的销量暂时也是每人下单都+1）
                prodServe.setSoldNum(actServiceTmp.getServiceNum()+prodServe.getSoldNum());
                prodServeService.updateByPrimaryKey(prodServe);

                //->判断优惠券
                if(Objects.equals(prodServe.getCoupon(),1))
                    serviceCoupon=true;

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        //获取活动服务的价格
        ActivityServePrice actServePrice = getActServePriceByActId(actDto.getActivityId(),actDto.getActivityServiceDtos());

        //生成订单号
        String orderNO = NumberGenerator.getOrderNo(true);
        //使用优惠券
        Integer payFee = preferPriceSum; //总的该支付的费用
        boolean useCoupon = (null != actDto.getCoupon());
        boolean useVoucher = (null != actDto.getVoucher());
        if((useCoupon || useVoucher)&&!serviceCoupon) {
            throw new BaseBusinessException(UNSUPPOT_COUPON);
        }

        if(useCoupon) payFee-=couponCoreService.useCouponNum(actDto.getCoupon(),CouponEnum.类型_满减券.getCode(),1,orderNO);//暂时使用一张
        if(useVoucher) payFee-=couponCoreService.useCouponNum(actDto.getVoucher(),CouponEnum.类型_代金券.getCode(),1,orderNO);//暂时使用一张

        //构建订单
        Order order = new Order();
        order.setOrderType(活动订单.code());
        order.setStatus(已提交待付费.code());
        order.setCreateTime(new Date());
        order.setCustId(user.getId());
        order.setEndTime(activity.getEndDate());
        order.setCostPrice(actServePrice.getAaCostPrice()+actServePrice.getOptCostPrice());
        order.setMarketPrice(actServePrice.getAaMarketPrice()+actServePrice.getOptMarketPrice());
        order.setPreferPrice(actServePrice.getAaPreferPrice()+actServePrice.getOptPreferPrice());
        order.setPayFee(payFee<=0?1:payFee);
        order.setOrderNo(orderNO);
        order.setDepartureTime(activity.getBeginDate());
        order.setActivityId(actDto.getActivityId());
        order.setTravelersNum(activity.getCurCustomers());  //活动当前人数
        order.setContacter(actDto.getContacter());
        order.setContacterPhone(actDto.getContacterPhone());
        order.setContacterRemark(actDto.getContacterRemark());
        order.setSign(RSA.getSign(order.getOrderNo(), user.getId()));
        order.setRemark(activity.getActivityTitle());
        orderMapper.insert(order);

        //异步添加自选服务明细（租船没有明细）


        //异步添加订单服务记录
        addOrderService(order.getId(),actDto.getActivityId(),actDto.getActivityServiceDtos());

        //异步补充活动自选服务
        MqActService actService = new MqActService(user.getId(),activity.getId(),actDto.getActivityServiceDtos());
        mqProducer.send(MqMessage.newInstance().put(comm_act_opt_service,actService));

        //返回结果
        OrderResult result = new OrderResult();
        result.setOrderId(order.getId());
        result.setOrderNo(order.getOrderNo());
        result.setOrderTime(today);
        result.setPayFee(order.getPayFee());
        result.setSign(order.getSign());
        result.setRestTime(getOrderRestPayTime(order.getCreateTime()));
        return result;
    }

//    private void addActService(Long id, List<ActivityServiceDto> activityServiceDtos) {
//        MqEvaluation mqEvaluation = new MqEvaluation(order.getCustId(),evaluationDto.getGrade());
//        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.order_evaluation, mqEvaluation));
//    }


    /**
     * 异步添加活动订单服务（for 活动）
     * @param orderId
     * @param actId
     * @throws JsonProcessingException
     */
    private void addOrderService(Integer orderId,Long actId,List<ActivityServiceDto> activityServiceDtos) throws JsonProcessingException {
        TActivityService activityService = new TActivityService();
        activityService.setActivityId(actId);
        //->获取活动中的所有服务
        List<TActivityService> activityServices = activityServeServiceCore.select(activityService);
        int i=0;
        for (TActivityService actServiceTmp:activityServices){
            ProdServe prodServe = prodServeService.selectByPrimaryKey(actServiceTmp.getServiceId());
            OrderServe orderServe = new OrderServe();
            if (actServiceTmp.getActivityServiceType()==ActivityServeEnum.AA项目.getCode()){
                orderServe.setActivityServiceType(ActivityServeEnum.AA项目.getCode());
                orderServe.setServiceDate(actServiceTmp.getServiceTime());
                orderServe.setServiceNum(actServiceTmp.getServiceNum());
            }
            else{
                orderServe.setActivityServiceType(ActivityServeEnum.自选项目.getCode());
                orderServe.setServiceDate(activityServiceDtos.get(i).getServiceTime());
                orderServe.setServiceNum(activityServiceDtos.get(i).getServiceNum());
                i++;
            }
            orderServe.setCostPrice(prodServe.getCostPrice());
            orderServe.setPreferPrice(prodServe.getPreferPrice());
            orderServe.setMarketPrice(prodServe.getMarketPrice());
            orderServe.setServiceId(prodServe.getId());
            orderServe.setServiceTypeId(prodServe.getServiceTypeId());
            orderServe.setOrderId(orderId);
            mqProducer.send(MqMessage.newInstance().put(order_prod_info, orderServe));
        }
    }

    /**
     * 计算订单剩余付款时间
     * @param orderTime
     * @return
     */
    private String getOrderRestPayTime(Date orderTime){
        long l = (new Date().getTime() - orderTime.getTime())/1000;
        return LocalTime.ofSecondOfDay(l>ORDER_PAY_TIME?0:ORDER_PAY_TIME-l).format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    @Override
    public WebResponse orderPay(OrderPay param,HttpServletRequest request) throws Exception {
        Integer payType = param.getPayType();
        String orderNo = param.getOrderNo();
        String custId = AppContextHelper.getCurrentUser().getId();
        Cust cust = iCustServiceCore.selectByPrimaryKey(custId);
        Assert.notNull(cust,"当前用户不存在");
        Order order = orderMapper.selectOne(new Order(orderNo));
        Assert.notNull(order,"当前订单不存在");
        if (addSecond(order.getCreateTime(), ORDER_PAY_TIME).before(new Date()))throw new BaseBusinessException(ORDER_OVERTIME);
        Integer payFee = order.getPayFee();
        if(!(new BigDecimal(payFee).compareTo(new BigDecimal(param.getPayFee()).multiply(new BigDecimal(100)))==0))throw new BaseBusinessException(PAYFEE_WRONG);
        if(Objects.equals(payType,微信支付.code())){
            PayParam payParam = new PayParam();
            payParam.setUserId(custId);
            payParam.setOrderNo(orderNo);
            payParam.setPayFee(String.valueOf(payFee));//单位为分
            payParam.setOpenId(cust.getWechat());
            payParam.setOrderNa(order.getRemark());
            payParam.setTradeType("APP");
            Map<String, String> map = wechatPayService.wechatPay(payParam, request);
            map.put("orderId",order.getId().toString());
            return new WebResponse(map);
        }else if (Objects.equals(payType,支付宝.code())){
            AlipayTradeAppPayModel model = new AlipayTradeAppPayModel();
            model.setBody(custId);
            model.setOutTradeNo(orderNo);
            model.setTotalAmount(String.valueOf(payFee/100));//单位为元
            model.setSubject(order.getRemark());
            model.setTimeoutExpress("30m");
            return new WebResponse(alipayService.alipay(model));
        }
        return null;
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void wechatPayNotify(WxpayNotify param) throws Exception {
        CustPayLog payLog = new CustPayLog();
        payLog.setPayChannel(OrderEnum.微信支付.code());
        payLog.setCustId(param.getUserId());
        payLog.setPayFee(Integer.valueOf(param.getTotalFee()));
        payLog.setConfirmTime(param.getTimeEnd());
        payLog.setTradeNo(param.getOutTradeNo());
        payLog.setTradeAccount(param.getOpenId());
        payNotify(param.getOutTradeNo(),param.toString(),payLog);
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void aliPayNotify(AliayNotify param) throws Exception {
        CustPayLog payLog = new CustPayLog();
        payLog.setPayChannel(OrderEnum.支付宝.code());
        payLog.setCustId(param.getUserId());
        payLog.setPayFee(Integer.valueOf(param.getTotalFee()));
        payLog.setConfirmTime(param.getGmtPayment());
        payLog.setTradeNo(param.getOutTradeNo());
        payLog.setTradeAccount(param.getBuyerEmail());
        payNotify(param.getOutTradeNo(),param.toString(),payLog);
    }

    @Transactional(transactionManager = "orderTransationManager")
    public void payNotify(String orderNo, String info,CustPayLog payLog) throws Exception {
        Date date = new Date();
        Order order = selectOne(new Order(orderNo));
        int status = order.getStatus();
        Assert.notNull(order,"订单不存在");
        log.info("无效的订单，支付返回信息："+info);
        order.setStatus(已付费待确认.code());
        order.setStatusTime(date);
        updateByPrimaryKey(order);
        //插入订单日志
        orderLogMapper.insert(new OrderLog(order.getId(),status,order.getStatus(),订单付费.code(),date));
        //插入支付日志
        payLog.setOrderId(order.getId());
        payLog.setRemark(order.getRemark());
        custPayLogMapper.insert(payLog);
        //异步备份订单服务与资源关系
        mqProducer.send(MqMessage.newInstance().put(order_prod_pub, order.getId().toString()));
        //处理活动订单
        if (Objects.equals(order.getOrderType(),OrderEnum.活动订单.code())){
            MqActStatusChange actStatusChange = new MqActStatusChange();
            actStatusChange.setActivityRuleEnum(ActivityRuleEnum.订单已付款);
            actStatusChange.setActId(order.getActivityId());
            mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.comm_act_status_chnage, actStatusChange));
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void addOrderServe(OrderServe orderServe) throws Exception {
        if(null!=orderServe)orderServeMapper.insert(orderServe);
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void addTravelers(OrderTogethers orderTogethers) throws Exception {
        try {
            List<Integer> togethers = orderTogethers.getTogethers();
            Integer orderId = orderTogethers.getOrderId();
            if(null!=togethers&&togethers.size()>0){
                orderTravelersMapper.insertList(togethers.stream().map(t-> new OrderTravelers(orderId,t)).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            log.info("添加订单同行人员失败，原因："+e.getMessage());
            throw e;
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void addOrderServeReso(Integer orderId) throws Exception {
        List<OrderServe> orderServes = orderServeMapper.select(new OrderServe(orderId));
        if(null!=orderServes&&orderServes.size()>0){
            Integer id;
            List<OrderServeReso> orderServeResos=new ArrayList<>();
            for (OrderServe orderServe:orderServes){
                id = orderServe.getId();
                List<ServiePubReso> sprs = prodServeService.selectServiePubReso(orderServe.getServiceId());
                if(null!=sprs&&sprs.size()>0){
                    for (ServiePubReso spr:sprs){
                        orderServeResos.add(new OrderServeReso(spr.getPubResourceId(),id,spr.getMarketPrice(),spr.getPreferPrice(),spr.getCostPrice()));
                    }
                }
            }
            if(orderServeResos.size()>0)orderServeResoMapper.insertList(orderServeResos);
        }
    }

    @Override
    public void autoCloseUnpayOrder() throws Exception {
        Date date = new Date();
        Example example = new Example(Order.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andCondition("status=",已提交待付费.code()).andCondition("create_time<",addSecond(date,-ORDER_PAY_TIME));
        List<Order> orders = selectByExample(example);
        if(null!=orders&&orders.size()>0){
            for (Order order:orders){
                mqProducer.send(MqMessage.newInstance().put(order_unpay_close,order));
            }
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void handleUnpayOrder(Order order) throws IOException {
        Date date = new Date();
        int status;
        Integer orderId = order.getId();
        status=order.getStatus();
        order.setStatus(超时未支付.code());
        order.setStatusTime(date);
        int i = updateByPrimaryKey(order);
        if(i==1){
            //插入订单日志
            orderLogMapper.insert(new OrderLog(orderId,status,order.getStatus(),超时关闭.code(), date));
            //回滚已用优惠券
            couponCoreService.rollBackCoupon(order.getOrderNo());
        }
    }

    @Override
    public int selectServeEvaluates(Integer serveId) {
        return orderServeEvaluationMapper.selectServeEvaluates(serveId);
    }

    @Override
    public OrderCount selectPersonOrderCount(String custId) {
        return orderMapper.selectPersonOrderCount(custId);
    }

    @Override
        public Pager<PerOrders> selectPerOrderList(String custId,Integer[] status) {
        return selectByPage(()->orderMapper.selectPerOrderList(custId,status));
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void updateOrderBegined() throws Exception {
        Date date = new Date();
        Example example = new Example(Order.class);
        example.createCriteria().andCondition("status=",已确认待出行.code()).andCondition("end_time<=",date);
        List<Order> orders = selectByExample(example);
        if (null!=orders&&orders.size()>0){
            Order order = new Order();
            order.setStatus(已出行待评价.code());
            order.setStatusTime(date);
            Example e = new Example(Order.class);
            e.createCriteria().andIn("id",orders.stream().map(o -> o.getId()).collect(Collectors.toList()));
            updateByExampleSelective(order, e);
        }
    }

    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public void cancelPerOrder(Integer id) throws Exception {
        Date date = new Date();
        String custId = AppContextHelper.getCurrentUser().getId();
        Order order = selectByPrimaryKey(id);
        Assert.notNull(order,"订单不存在");
        if (!Objects.equals(custId,order.getCustId()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN);
        if (!getRefundFlag(order.getDepartureTime()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN,"已过可退单时间");
        Integer oldStatus = order.getStatus();
        if (!Objects.equals(oldStatus,已付费待确认.code()))throw new BaseBusinessException(BaseBusinessError.FORBIDDEN,"该状态无法退单");
        order.setStatus(已确认撤销待退款.code());
        order.setStatusTime(date);
        updateByPrimaryKey(order);
        //插入订单日志
        OrderLog ol = new OrderLog();
        ol.setStatusBefore(oldStatus);
        ol.setStatusAfter(order.getStatus());
        ol.setProcessTime(date);
        ol.setOrderId(id);
        ol.setOrderProcessType(订单撤销申请.code());
        ol.setRemark(订单撤销申请.name());
        orderLogMapper.insert(ol);
        //生成退款申请
        RefundApply apply = new RefundApply();
        apply.setCreateTime(date);
        apply.setOrderId(order.getId());
        apply.setStatus(待处理.getCode());
        apply.setAmount(order.getPayFee());
        apply.setRemark("退单");
        CustPayLog payLog = custPayLogMapper.selectOne(new CustPayLog(order.getCustId(), order.getId()));
        if (null!=payLog){
            apply.setChannel(payLog.getPayChannel());
            apply.setAccount(payLog.getTradeAccount());
        }else {
            apply.setRemark("未能找到支付记录");
        }
        refundApplyMapper.insert(apply);
        //更新商家订单状态
        mercOrderService.updateMercOrderStatus(id,date,撤销订单);
    }
}
