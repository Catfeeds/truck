package com.hyhl.gotosea.core.ref.vo;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 14:13
**/
public class DictionaryVo {

    private Integer id;

    @NotBlank(message = "字典名不能为空")
    private String name;

    private Integer code;

    @NotNull(message = "parentCode不能为空")
    private Integer parentCode;

    private Integer isParent;

    @NotBlank(message = "字典备注不能为空")
    private String remark;

    private List<DictionaryVo> childs;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getParentCode() {
        return parentCode;
    }

    public void setParentCode(Integer parentCode) {
        this.parentCode = parentCode;
    }

    public Integer getIsParent() {
        return isParent;
    }

    public void setIsParent(Integer isParent) {
        this.isParent = isParent;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<DictionaryVo> getChilds() {
        return childs;
    }

    public void setChilds(List<DictionaryVo> childs) {
        this.childs = childs;
    }
}
