package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.comm.vo.CustCommVo;
import com.hyhl.gotosea.core.comm.vo.CustEvaVo;

import java.util.Date;
import java.util.List;

public class OrderServeEvaluationVo {

    private Long id;

    private CustEvaVo custEvaVo;

    private String evaluationContent;   //评价内容

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date evaluationTime;    //评价时间

//    List<EvaluationAttachmentVo> evaluationAttachmentVos;   //附件
    String [] imgs; //图片缩略图

    private Boolean isThumb;    //是否点赞过

    private Integer thumbNum;   //点赞数量


    public Integer getThumbNum() {
        return thumbNum;
    }

    public void setThumbNum(Integer thumbNum) {
        this.thumbNum = thumbNum;
    }

    public Boolean getIsThumb() {
        return isThumb;
    }

    public void setIsThumb(Boolean thumb) {
        isThumb = thumb;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustEvaVo getCustEvaVo() {
        return custEvaVo;
    }

    public void setCustEvaVo(CustEvaVo custEvaVo) {
        this.custEvaVo = custEvaVo;
    }

    public Boolean getThumb() {
        return isThumb;
    }

    public void setThumb(Boolean thumb) {
        isThumb = thumb;
    }

    public String[] getImgs() {
        return imgs;
    }

    public void setImgs(String[] imgs) {
        this.imgs = imgs;
    }

    public String getEvaluationContent() {
        return evaluationContent;
    }

    public void setEvaluationContent(String evaluationContent) {
        this.evaluationContent = evaluationContent;
    }

    public Date getEvaluationTime() {
        return evaluationTime;
    }

    public void setEvaluationTime(Date evaluationTime) {
        this.evaluationTime = evaluationTime;
    }
}
