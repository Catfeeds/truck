package com.hyhl.gotosea.console.cust.vo;

import com.hyhl.gotosea.core.common.annotation.Area;
import com.hyhl.gotosea.core.common.annotation.Dict;
import com.hyhl.gotosea.core.common.annotation.Locator;
import com.hyhl.gotosea.core.common.annotation.Split;
import com.hyhl.gotosea.core.cust.po.Merchant;

/**
 * @author guan.sj
 */
public class MerchantDetailVO extends Merchant{
	private static final long serialVersionUID = 1L;
    
	@Split(",")
    private String carouselPicsArr;
    
    /**
     * 商家归属区域名称
     */
    @Area
    private Integer areaIdName;
    
    /**
     * 定位点名称
     */
    @Locator
    private Integer locatorIdName;
    
    @Dict(name="cust_id_type")
    private Integer idTypeName;


	public String getCarouselPicsArr() {
		return super.getCarouselPics();
	}

	public void setCarouselPicsArr(String carouselPicsArr) {
		this.carouselPicsArr = carouselPicsArr;
	}

	public Integer getAreaIdName() {
		return areaIdName;
	}

	public void setAreaIdName(Integer areaIdName) {
		this.areaIdName = areaIdName;
	}

	public Integer getLocatorIdName() {
		return locatorIdName;
	}

	public void setLocatorIdName(Integer locatorIdName) {
		this.locatorIdName = locatorIdName;
	}

	public Integer getIdTypeName() {
		return idTypeName;
	}

	public void setIdTypeName(Integer idTypeName) {
		this.idTypeName = idTypeName;
	}
}