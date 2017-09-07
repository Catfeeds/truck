package com.hyhl.gotosea.core.order.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-08-23 16:24
**/
public class ComOrderDto {

    @NotNull(message = "线路id不能为空")
    private Integer id;//线路id

    @NotBlank(message = "出发时间不能为空")
    private String departure;//出发时间

    @NotNull(message = "预定人姓名不能为空")
    private String contacter;//预定人姓名

    @NotNull(message = "预定人手机不能为空")
    private String contacterPhone;//预定人手机

    private String contacterRemark;//预定人备注信息

    private Integer coupon;//优惠券id

    private Integer voucher;//代金券id

    @Valid
    @NotNull
    private List<Integer> togethers;//出行人员

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
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

    public List<Integer> getTogethers() {
        return togethers;
    }

    public void setTogethers(List<Integer> togethers) {
        this.togethers = togethers;
    }
}
