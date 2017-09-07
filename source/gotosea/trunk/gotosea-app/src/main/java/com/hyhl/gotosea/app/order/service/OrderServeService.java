package com.hyhl.gotosea.app.order.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.order.dto.EvaluationDto;

public interface OrderServeService {
    /**
     * 对订单服务添加评价
     * @param evaluationDto
     */
    public WebResponse evaluateOrderService(EvaluationDto evaluationDto) throws Exception;

    /**
     * 回复订单服务评价
     * @param orderServiceEvaId
     * @param replyContent
     */
    public WebResponse replyEva(Long orderServiceEvaId, String replyContent);
}
