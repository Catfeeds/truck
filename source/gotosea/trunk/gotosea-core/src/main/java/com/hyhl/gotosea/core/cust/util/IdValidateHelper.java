package com.hyhl.gotosea.core.cust.util;

import org.springframework.stereotype.Component;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.validator.custom.IdCardValidator;
import com.hyhl.gotosea.core.cust.enm.MerchantEnum;
import com.hyhl.gotosea.core.cust.enm.TravelerEnum;

/**根据证件类型，验证证件的格式
 * @author guan.sj
 */
@Component
public class IdValidateHelper {
	
	/**验证商家证件类型格式
	 * @param idCard
	 * @param Type
	 */
	public void validMerchantIdByType(String idCard, MerchantEnum Type){
		switch (Type) {
		case 证件类型_身份证:
			if(!IdCardValidator.isIdCard(idCard))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "证件格式错误");
			break;
		default:
			throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		}
	}
	
	/**验证出行人证件类型格式
	 * @param idCard
	 * @param type
	 */
	public void validateTravelerIdCardByType(String idCard, TravelerEnum type) {
		switch (type) {
		case 身份证://身份证
			if(!IdCardValidator.isIdCard(idCard))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "证件格式错误");
			break;
		case 港澳居民身份证://港澳居民身份证
			if(!IdCardValidator.validateIdCard(idCard,1))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "证件格式错误");
			break;
		case 回乡证://回乡证
			if(!IdCardValidator.validateReturnPermitIdCard(idCard))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "证件格式错误");
			break;
		case 台胞证://台胞证
			if(!IdCardValidator.validateIdCard(idCard,2))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "证件格式错误");
			break;
		case 护照://护照
			break;
		default:
			throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
		}
	}
	
}
