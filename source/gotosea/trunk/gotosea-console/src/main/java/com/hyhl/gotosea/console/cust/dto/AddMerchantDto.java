package com.hyhl.gotosea.console.cust.dto;

import com.hyhl.common.validator.custom.Phone;
import com.hyhl.gotosea.core.cust.po.Merchant;

public class AddMerchantDto extends Merchant {
	private static final long serialVersionUID = 1L;
	 /**
     * 商家电话
     */
	@Phone
    private String phone;
	
}
