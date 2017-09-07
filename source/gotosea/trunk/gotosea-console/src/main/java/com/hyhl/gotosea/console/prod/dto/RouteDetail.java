package com.hyhl.gotosea.console.prod.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hyhl.gotosea.core.common.annotation.Split;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
* 
* @author Leslie.Lam
* @create 2017-08-18 14:55
**/
public class RouteDetail extends ServeDto {

    @NotNull(message = "生效时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date beginDate;//生效时间

    @NotNull(message = "失效时间不能为空")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;//失效时间

    @NotNull(message = "目的地不能为空")
    private Integer destination;//目的地

    @NotNull(message = "出行周期不能为空")
    private Integer duration;//出行周期，单位为天

    @NotBlank(message = "小约推荐不能为空")
    @Split("#")
    private String recommend;//小约推荐

    public String getRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getDestination() {
        return destination;
    }

    public void setDestination(Integer destination) {
        this.destination = destination;
    }
}
