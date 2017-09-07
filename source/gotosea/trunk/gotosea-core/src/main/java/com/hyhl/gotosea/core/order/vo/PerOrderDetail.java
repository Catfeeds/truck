package com.hyhl.gotosea.core.order.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.comm.vo.ActivityVo;
import com.hyhl.gotosea.core.common.annotation.Money;
import com.hyhl.gotosea.core.common.serialize.TravelerSerializer;

import java.util.Date;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-16 14:48
**/
public class PerOrderDetail {

    private Integer id;

    private String sign;

    private Integer serveId;//服务id

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createTime;//下单时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date departureTime;//出发时间

    private Long activityId;    //活动id

    @Money
    private Integer preferPrice;//总价

    @Money
    private Integer aaServePrice;  //AA服务总价

    @Money
    private Integer optServePrice;  //自选服务总价

    private ActivityVo activityVo;  //活动详情

    @Money
    private Integer payFee;//应付金额

    private String contacter;//联系人姓名

    private String contacterPhone;//联系人手机

    private String contacterRemark;//联系人备注信息

    private String orderNo;//订单编号

    private String remark;//订单备注即服务名称

    private Integer serviceNum;//购买数量

    private String restTime;//剩余支付时间

    @JsonSerialize(using = TravelerSerializer.class)
    private List<Integer> travelers;//出行人员

    @Money
    private Integer discount;//优惠金额

    private boolean flag;//是否能退款

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Integer getAaServePrice() {
        return aaServePrice;
    }

    public void setAaServePrice(Integer aaServePrice) {
        this.aaServePrice = aaServePrice;
    }

    public Integer getOptServePrice() {
        return optServePrice;
    }

    public void setOptServePrice(Integer optServePrice) {
        this.optServePrice = optServePrice;
    }

    public ActivityVo getActivityVo() {
        return activityVo;
    }

    public void setActivityVo(ActivityVo activityVo) {
        this.activityVo = activityVo;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getPreferPrice() {
        return preferPrice;
    }

    public void setPreferPrice(Integer preferPrice) {
        this.preferPrice = preferPrice;
    }

    public Integer getPayFee() {
        return payFee;
    }

    public void setPayFee(Integer payFee) {
        this.payFee = payFee;
    }

    public String getContacter() {
        return contacter;
    }

    public void setContacter(String contacter) {
        this.contacter = contacter;
    }

    public String getContacterPhone() {
        return contacterPhone;
    }

    public void setContacterPhone(String contacterPhone) {
        this.contacterPhone = contacterPhone;
    }

    public String getContacterRemark() {
        return contacterRemark;
    }

    public void setContacterRemark(String contacterRemark) {
        this.contacterRemark = contacterRemark;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getServiceNum() {
        return serviceNum;
    }

    public void setServiceNum(Integer serviceNum) {
        this.serviceNum = serviceNum;
    }

    public String getRestTime() {
        return restTime;
    }

    public void setRestTime(String restTime) {
        this.restTime = restTime;
    }

    public Integer getServeId() {
        return serveId;
    }

    public void setServeId(Integer serveId) {
        this.serveId = serveId;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public List<Integer> getTravelers() {
        return travelers;
    }

    public void setTravelers(List<Integer> travelers) {
        this.travelers = travelers;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }
}
