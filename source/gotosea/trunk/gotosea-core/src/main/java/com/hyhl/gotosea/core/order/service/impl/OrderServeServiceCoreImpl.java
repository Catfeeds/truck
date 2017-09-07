package com.hyhl.gotosea.core.order.service.impl;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.OrderServeError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.comm.service.CustCommServiceCore;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.comm.vo.CustCommVo;
import com.hyhl.gotosea.core.order.mapper.*;
import com.hyhl.gotosea.core.order.po.*;
import com.hyhl.gotosea.core.order.service.OrderServeServiceCore;
import com.hyhl.gotosea.core.order.vo.EvaluationAttachmentVo;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaReplyVo;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaluationVo;
import com.hyhl.gotosea.core.prod.po.ProdServe;
import com.hyhl.gotosea.core.prod.service.ProdServeService;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(transactionManager = "orderTransationManager",readOnly = true)
public class OrderServeServiceCoreImpl extends BaseServiceImpl<OrderServeEvaluation> implements OrderServeServiceCore{

    @Resource
    private ProdServeService prodServeService;
    @Resource
    private OrderServeEvaluationMapper orderServeEvaluationMapper;
    @Resource
    private EvaluationAttachmentMapper evaluationAttachmentMapper;
    @Resource
    private OrderServeEvaReplyMapper orderServeEvaReplyMapper;
    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private ICustTagServiceCore custTagServiceCore;
    @Resource
    private CustCommServiceCore custCommServiceCore;
    @Resource
    private EvaluationThumbMapper evaThumbMapper;

    /**
     * 通过服务id获取服务评论列表信息
     * @param serviceId 服务id
     * @return
     */
    @Override
    public WebResponse listOrderServeEvals(Integer serviceId) throws Exception {
        Pager<OrderServeEvaluation> pager = getOrderServeEvaByServeId(serviceId);
        pager.setContent(serveEvaluationToVo(pager.getContent()));
        return new WebResponse("success","",pager);
    }

    private Pager<OrderServeEvaluation> getOrderServeEvaByServeId(Integer serviceId){
        Pager<OrderServeEvaluation> pager = selectByPage(new PageExcute<OrderServeEvaluation>() {
            @Override
            public List<OrderServeEvaluation> excute() {
                return orderServeEvaluationMapper.listEvaByServeId(serviceId);
            }
        });
        return pager;
    }

    /**
     * 获取 订单服务 评价 回复信息
     * @param serveEvaId
     * @return
     * @throws Exception
     */
    @Override
    public List<OrderServeEvaReplyVo> listEvaReply(Long serveEvaId) throws Exception {
        OrderServiceEvaReply serviceEvaReply = new OrderServiceEvaReply();
        serviceEvaReply.setOrderServiceEvaId(serveEvaId);
        List<OrderServiceEvaReply> orderServiceEvaReplies = orderServeEvaReplyMapper.select(serviceEvaReply);
        return evaReplyToVo(orderServiceEvaReplies);
    }

    /**
     * 获取 订单服务 评价详情
     * @param serveEvaId
     * @return
     * @throws Exception
     */
    @Override
    public OrderServeEvaluationVo getOrderServe(Long serveEvaId) throws Exception {
        List<OrderServeEvaluation> orderServeEvaluations = new ArrayList<>();
        OrderServeEvaluation orderServeEvaluation = orderServeEvaluationMapper.selectByPrimaryKey(serveEvaId);
        if (orderServeEvaluation == null)
            return null;
        orderServeEvaluations.add(orderServeEvaluation);
        List<OrderServeEvaluationVo> orderServeEvaluationVos = serveEvaluationToVo(orderServeEvaluations);
        return orderServeEvaluationVos.get(0);
    }

    /**
     * 返回商家 所有服务的 评价信息
     * @param merchantId
     * @return
     */
    @Override
    public WebResponse listMerchantServeEvas(String merchantId) throws Exception {

        if(custServiceCore.selectByPrimaryKey(merchantId)==null)
            throw new BaseBusinessException("200","找不到该商家信息");

        //获取商家所有服务
        ProdServe prodServe = new ProdServe();
        prodServe.setCustId(merchantId);
        List<ProdServe> serves = prodServeService.select(prodServe);
        if (serves.size()<=0)
            return new WebResponse("success","");

        //构建pager
        Pager pager = new Pager();
        Integer totalElements =0;
        Integer totalPages=0;
        HttpServletRequest request = AppContextHelper.getRequest();
        String page = request.getParameter("page");
        String size = request.getParameter("size");
        pager.setPageNumber(Integer.valueOf(page==null?"1":page));
        pager.setPageSize(Integer.valueOf(size==null?"10":size));

        List <OrderServeEvaluation> contents = new ArrayList();
        for (ProdServe prodServeTmp:serves){

            //获取服务的评价总数
            totalElements+=orderServeEvaluationMapper.selectCountByServeId(prodServeTmp.getId());

            //够数了就不继续
            if (contents.size()>=pager.getPageSize())
                continue;

            //拼凑数据
            Pager<OrderServeEvaluation> pagerTmp = getOrderServeEvaByServeId(prodServeTmp.getId());
            for (Object serveEva:pagerTmp.getContent()){
                if (contents.size()>=pager.getPageSize()) break;
                contents.add((OrderServeEvaluation)serveEva);
            }
        }
        pager.setTotalElements(totalElements);
        pager.setNumberOfElements(contents.size());
        totalPages = totalElements/pager.getPageSize();
        pager.setTotalPages(totalElements%pager.getPageSize()==0?totalPages:totalPages+1);

        pager.setContent(serveEvaluationToVo(contents));
        return new WebResponse("success","",pager);
    }

    /**
     * 为评价点赞
     * @param evaId
     * @return
     */
    @Override
    public WebResponse thumbOrderServeEva(Long evaId) {
        BaseSessionUser user = AppContextHelper.getCurrentUser();

        OrderServeEvaluation orderServeEvaluation = orderServeEvaluationMapper.selectByPrimaryKey(evaId);
        if (orderServeEvaluation==null)
            throw new BaseBusinessException(OrderServeError.ORDER_EVA_NOT_EXIST);

        //先判断数据库是否存在
        EvaluationThumb evaluationThumb = new EvaluationThumb();
        evaluationThumb.setEvaluationId(evaId);
        evaluationThumb.setCustId(user.getId());
        evaluationThumb = evaThumbMapper.selectOne(evaluationThumb);
        //说明数据库已经存在记录
        if(evaluationThumb!=null){
            evaluationThumb.setStatus(evaluationThumb.getStatus()==1?0:1);
            evaThumbMapper.updateByPrimaryKey(evaluationThumb);
        }
        else {
            evaluationThumb = new EvaluationThumb();
            evaluationThumb.setEvaluationId(evaId);
            evaluationThumb.setCustId(user.getId());
            evaluationThumb.setStatus(1);
            evaluationThumb.setThumbTime(new Date());
            evaThumbMapper.insert(evaluationThumb);
        }

        return new WebResponse("success","");
    }

    private List<OrderServeEvaReplyVo> evaReplyToVo(List<OrderServiceEvaReply> orderServiceEvaReplies) throws Exception {
        List<OrderServeEvaReplyVo> orderServeEvaReplyVos = new ArrayList<>();
        for (OrderServiceEvaReply serviceEvaReply:orderServiceEvaReplies){
            OrderServeEvaReplyVo orderServeEvaReplyVo = new OrderServeEvaReplyVo();
            BeanUtils.copyProperties(serviceEvaReply,orderServeEvaReplyVo);

            CustCommVo custCommVo = new CustCommVo();
            Cust cust = custServiceCore.selectByPrimaryKey(serviceEvaReply.getCustId());
            BeanUtils.copyProperties(cust, custCommVo);
            //->取标签信息
            custCommVo.setCustTagVos(custTagServiceCore.findCustTravelerTag(cust.getId()));
            orderServeEvaReplyVo.setCustCommVo(custCommVo);

            orderServeEvaReplyVos.add(orderServeEvaReplyVo);
        }
        return orderServeEvaReplyVos;
    }

    private List<OrderServeEvaluationVo> serveEvaluationToVo(List<OrderServeEvaluation> orderServeEvaluations) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        List<OrderServeEvaluationVo> serveEvaluationVos = new ArrayList<>();
        for (OrderServeEvaluation serveEvaluation:orderServeEvaluations){
            OrderServeEvaluationVo serveEvaluationVo = new OrderServeEvaluationVo();
            BeanUtils.copyProperties(serveEvaluation,serveEvaluationVo);
            //获取订单服务评论附件
            EvaluationAttachment evaluationAttachment = new EvaluationAttachment();
            evaluationAttachment.setOrderServiceEvaId(serveEvaluation.getId());
            List<EvaluationAttachment> evaluationAttachments = evaluationAttachmentMapper.select(evaluationAttachment);
            if (evaluationAttachments ==null || evaluationAttachments.size()<=0)
                serveEvaluationVo.setImgs(null);
            else
                serveEvaluationVo.setImgs(evaluationAttachmentToArr(evaluationAttachments));
            //获取用户信息
            serveEvaluationVo.setCustEvaVo(custCommServiceCore.getCustEvaVo(serveEvaluation.getCustId()));
            //点赞数量
            Example example = new Example(EvaluationThumb.class);
            Example.Criteria criteria= example.createCriteria().andEqualTo("evaluationId",serveEvaluation.getId()).andEqualTo("status",1);
            serveEvaluationVo.setThumbNum(evaThumbMapper.selectCountByExample(example));

            //判断用户是否点赞过
            if (user==null){
                serveEvaluationVo.setIsThumb(false);
            }else {
                criteria.andEqualTo("custId",user.getId());
                serveEvaluationVo.setIsThumb(evaThumbMapper.selectCountByExample(example)>0?true:false);
            }
            serveEvaluationVos.add(serveEvaluationVo);
        }
        return serveEvaluationVos;
    }

    //评论附件转Arr
    private String[] evaluationAttachmentToArr(List<EvaluationAttachment> evaluationAttachments) {
        StringBuilder sb = new StringBuilder();
        for (EvaluationAttachment tmp:evaluationAttachments){
            sb.append(tmp.getThumbnail()+",");
        }
        return sb.substring(0,sb.length()-1).split(",");
    }


    /**
     * 评论附件ToVo
     * @param evaluationAttachments
     * @return
     */
    private List<EvaluationAttachmentVo> evaluationAttachmentToVo(List<EvaluationAttachment> evaluationAttachments){
        List<EvaluationAttachmentVo> evaluationAttachmentVos = new ArrayList<>();
        for (EvaluationAttachment evaluationAttachment:evaluationAttachments){
            EvaluationAttachmentVo evaluationAttachmentVo = new EvaluationAttachmentVo();
            BeanUtils.copyProperties(evaluationAttachment,evaluationAttachmentVo);
            evaluationAttachmentVos.add(evaluationAttachmentVo);
        }
        return evaluationAttachmentVos;
    }
}
