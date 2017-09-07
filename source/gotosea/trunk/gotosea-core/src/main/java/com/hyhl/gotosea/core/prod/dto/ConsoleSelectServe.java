package com.hyhl.gotosea.core.prod.dto;

/**
* 接收服务列表查询参数
* @author Leslie.Lam
* @create 2017-07-31 16:34
**/
public class ConsoleSelectServe {

    private String name;//服务名

    private Integer[] type;//服务类型

    private Integer themId;//主题id

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer[] getType() {
        return type;
    }

    public void setType(Integer[] type) {
        this.type = type;
    }

    public Integer getThemId() {
        return themId;
    }

    public void setThemId(Integer themId) {
        this.themId = themId;
    }
}
