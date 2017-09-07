package com.hyhl.gotosea.app.order.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.hyhl.common.annotation.Login;
import com.hyhl.gotosea.core.rabbitmq.bean.MqEvaluation;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.OrderError;
import com.hyhl.common.exception.type.OrderServeError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.order.service.OrderServeService;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.order.dto.EvaluationAttachmentDto;
import com.hyhl.gotosea.core.order.dto.EvaluationDto;
import com.hyhl.gotosea.core.order.enm.OrderEnum;
import com.hyhl.gotosea.core.order.mapper.EvaluationAttachmentMapper;
import com.hyhl.gotosea.core.order.mapper.OrderMapper;
import com.hyhl.gotosea.core.order.mapper.OrderServeEvaReplyMapper;
import com.hyhl.gotosea.core.order.mapper.OrderServeEvaluationMapper;
import com.hyhl.gotosea.core.order.mapper.OrderServeMapper;
import com.hyhl.gotosea.core.order.mapper.OrderServiceTagMapper;
import com.hyhl.gotosea.core.order.po.EvaluationAttachment;
import com.hyhl.gotosea.core.order.po.Order;
import com.hyhl.gotosea.core.order.po.OrderServe;
import com.hyhl.gotosea.core.order.po.OrderServeEvaluation;
import com.hyhl.gotosea.core.order.po.OrderServiceEvaReply;
import com.hyhl.gotosea.core.order.po.OrderServiceTag;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;

@Service
@Transactional(transactionManager = "orderTransationManager",readOnly = true)
public class OrderServeServiceImpl implements OrderServeService {

    @Resource
    private EvaluationAttachmentMapper attachmentMapper;
    @Resource
    private OrderServeEvaluationMapper serveEvaluationMapper;
    @Resource
    private OrderServiceTagMapper orderServiceTagMapper;
    @Resource
    private OrderServeEvaReplyMapper serviceEvaReplyMapper;
    @Resource
    private OrderServeMapper orderServeMapper;
    @Resource
    private OrderMapper orderMapper;
    @Resource
    private MqProducer mqProducer;

    /**
     * 评价订单服务
     * @param evaluationDto
     * @return
     */
    @Login
    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public WebResponse evaluateOrderService(EvaluationDto evaluationDto) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        //判断订单是否可以评论
        //->判断评论人是否拥有该订单
        OrderServe orderServe = orderServeMapper.selectByPrimaryKey(evaluationDto.getOrderServiceId());
        if (orderServe==null){
            throw new BaseBusinessException(OrderServeError.ORDER_SERVICE_NOT_FOUND);
        }
        Order order = orderMapper.selectByPrimaryKey(orderServe.getOrderId());
        if (order == null)
            throw new BaseBusinessException(OrderError.ORDER_NOT_FOUND);
        if (!order.getCustId().equals(user.getId())){
            return new WebResponse("success","您不能评论别人的订单");
        }
        if (order.getStatus()!= OrderEnum.已出行待评价.code()){
            return new WebResponse("success","订单状态不符");
        }
        //判断是否已经评价过
        OrderServeEvaluation orderServeEvaluation = new OrderServeEvaluation();
        if(serveEvaluationMapper.selectCount(orderServeEvaluation)>0)
            throw new BaseBusinessException(OrderServeError.ORDER_SERVICE_EVA_EXIST);

        //插入评价信息
        OrderServeEvaluation serveEvaluation = new OrderServeEvaluation();
        BeanUtils.copyProperties(evaluationDto,serveEvaluation);
        serveEvaluation.setEvaluationTime(new Date());
        serveEvaluation.setCustId(user.getId());
        //插入附件信息
        List<EvaluationAttachmentDto> attachmentDtos = evaluationDto.getEvaluationAttachmentDtos();
        if (attachmentDtos != null){
            serveEvaluation.setAttachmentNum(evaluationDto.getEvaluationAttachmentDtos().size());//评论附件数量

            List<EvaluationAttachment> attachments = new ArrayList<>();
            for (EvaluationAttachmentDto attachmentDto:evaluationDto.getEvaluationAttachmentDtos()){
                EvaluationAttachment attachment = new EvaluationAttachment();
                BeanUtils.copyProperties(attachmentDto,attachment);
                attachment.setOrderServiceEvaId(evaluationDto.getOrderServiceId());
                attachments.add(attachment);
            }
            attachmentMapper.insertList(attachments);
        }else {
            serveEvaluation.setAttachmentNum(0);//评论附件数量
        }

        serveEvaluationMapper.insert(serveEvaluation);

        //插入评价标签
        List<OrderServiceTag> orderServiceTags = new ArrayList<>();
        for (Integer tagId:evaluationDto.getTagIds()){
            OrderServiceTag orderServiceTag = new OrderServiceTag();
            orderServiceTag.setTagId(tagId);
            orderServiceTag.setEvaluationTime(new Date());
            orderServiceTag.setOrderServiceId(evaluationDto.getOrderServiceId());
            orderServiceTags.add(orderServiceTag);
        }
        if (orderServiceTags.size()>0){
            orderServiceTagMapper.insertList(orderServiceTags);
        }

        //更新订单状态
        order.setStatus(OrderEnum.已评价订单关闭.code());
        orderMapper.updateByPrimaryKey(order);

        //发送rmq消息增加积分
        CreditsRuleEnum creditsNewType = null;
        if (serveEvaluation.getAttachmentNum() == 0)
        	creditsNewType = CreditsRuleEnum.无图评价;
        else
        	creditsNewType = CreditsRuleEnum.带图评价;
        MqCreditsNew creditsNew = new MqCreditsNew(user.getId(), user.getPhone(), creditsNewType);
        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_new, creditsNew));

        //计算商家平均分
        MqEvaluation mqEvaluation = new MqEvaluation(order.getCustId(),evaluationDto.getGrade());
        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.order_evaluation, mqEvaluation));
        return new WebResponse("success","");
    }

    /**
     * 回复订单服务评价
     * @param orderServiceEvaId
     * @param replyContent
     * @return
     */
    @Override
    @Transactional(transactionManager = "orderTransationManager")
    public WebResponse replyEva(Long orderServiceEvaId, String replyContent) {
        BaseSessionUser user =  AppContextHelper.getCurrentUser();
//        if (user == null){
//            user = new BaseSessionUser();
//            user.setId("21312");
//        }

        OrderServiceEvaReply serviceEvaReply = new OrderServiceEvaReply();
        serviceEvaReply.setCustId(user.getId());
        serviceEvaReply.setOrderServiceEvaId(orderServiceEvaId);
        serviceEvaReply.setReplyContent(replyContent);
        serviceEvaReply.setReplyTime(new Date());
        serviceEvaReplyMapper.insert(serviceEvaReply);

        return new WebResponse("success","");
    }
}
