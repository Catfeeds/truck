package com.hyhl.gotosea.core.order.dto;

import com.hyhl.gotosea.core.comm.dto.ActivityServiceDto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class OrderActDto {
    @NotNull(message = "活动id不能为空")
    private Long activityId;    //活动id
    private Integer coupon;//优惠券id
    private Integer voucher;//代金券id
    @NotNull(message = "预定人姓名不能为空")
    private String contacter;//预定人姓名

    @NotNull(message = "预定人手机不能为空")
    private String contacterPhone;//预定人手机

    private String contacterRemark;//预定人备注信息

    private List<ActivityServiceDto> activityServiceDtos;

    public List<ActivityServiceDto> getActivityServiceDtos() {
        return activityServiceDtos;
    }

    public void setActivityServiceDtos(List<ActivityServiceDto> activityServiceDtos) {
        this.activityServiceDtos = activityServiceDtos;
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

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public Integer getCoupon() {
        return coupon;
    }

    public void setCoupon(Integer coupon) {
        this.coupon = coupon;
    }

    public Integer getVoucher() {
        return voucher;
    }

    public void setVoucher(Integer voucher) {
        this.voucher = voucher;
    }

//    public OrderActServeDetailDto getOrderActServeDetailDto() {
//        return orderActServeDetailDto;
//    }
//
//    public void setOrderActServeDetailDto(OrderActServeDetailDto orderActServeDetailDto) {
//        this.orderActServeDetailDto = orderActServeDetailDto;
//    }
}
