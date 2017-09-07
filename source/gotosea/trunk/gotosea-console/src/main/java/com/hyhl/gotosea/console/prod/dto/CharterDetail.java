package com.hyhl.gotosea.console.prod.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hyhl.gotosea.core.common.serialize.MercSerializer;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

/**
* 
* @author Leslie.Lam
* @create 2017-08-18 14:55
**/
public class CharterDetail extends ServeDto {

    @JsonSerialize(using = MercSerializer.class)
    @NotBlank
    private String custId;

    @NotNull(message = "人数下限不能为空")
    private Integer minPersons;    //人数下限

    @NotNull(message = "人数上限不能为空")
    @Min(value = 1,message = "人数上限必须大于1")
    private Integer maxPersons;    //人数上限

    @NotBlank(message = "钓点分布图不能为空")
    private String fishPointPic;//钓点分布图

    public Integer getMinPersons() {
        return minPersons;
    }

    public void setMinPersons(Integer minPersons) {
        this.minPersons = minPersons;
    }

    public Integer getMaxPersons() {
        return maxPersons;
    }

    public void setMaxPersons(Integer maxPersons) {
        this.maxPersons = maxPersons;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getFishPointPic() {
        return fishPointPic;
    }

    public void setFishPointPic(String fishPointPic) {
        this.fishPointPic = fishPointPic;
    }
}
