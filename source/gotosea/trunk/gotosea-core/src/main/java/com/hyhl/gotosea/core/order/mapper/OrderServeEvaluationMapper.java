package com.hyhl.gotosea.core.order.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.po.OrderServeEvaluation;

import java.util.List;

public interface OrderServeEvaluationMapper extends MyMapper<OrderServeEvaluation> {

    /**
     * 查询服务评论
     * @param serveId
     * @return
     */
    int selectServeEvaluates(Integer serveId);

    List<OrderServeEvaluation> listEvaByServeId(Integer serviceId);

    Integer selectCountByServeId(Integer id);
}
