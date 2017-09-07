package com.hyhl.gotosea.core.order.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.order.po.OrderServeEvaluation;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaReplyVo;
import com.hyhl.gotosea.core.order.vo.OrderServeEvaluationVo;

import java.util.List;

public interface OrderServeServiceCore extends BaseService<OrderServeEvaluation>{
    /**
     * 根据服务id获取评价信息
     * @param serviceId 服务id
     * @return
     */
    WebResponse listOrderServeEvals(Integer serviceId) throws Exception;
    List<OrderServeEvaReplyVo> listEvaReply(Long serveEvaId) throws Exception;
    OrderServeEvaluationVo getOrderServe(Long serveEvaId) throws Exception;

    WebResponse listMerchantServeEvas(String merchantId) throws Exception;

    WebResponse thumbOrderServeEva(Long evaId);
}
