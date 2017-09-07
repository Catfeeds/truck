package com.hyhl.gotosea.app.cust.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.validator.custom.IdCardValidator;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.cust.service.MerchantService;
import com.hyhl.gotosea.app.local.service.AreaService;
import com.hyhl.gotosea.app.prod.service.MercResoService;
import com.hyhl.gotosea.core.cust.dto.MerchantApplyDto;
import com.hyhl.gotosea.core.cust.dto.MerchantUpdateDto;
import com.hyhl.gotosea.core.cust.dto.SelectMerchant;
import com.hyhl.gotosea.core.cust.enm.MerchantEnum;
import com.hyhl.gotosea.core.cust.service.IMerchantServiceCore;
import com.hyhl.gotosea.core.cust.vo.MerchantDetailVO;
import com.hyhl.gotosea.core.prod.vo.MerchantDetail;
import com.hyhl.gotosea.session.util.AppContextHelper;

@RestController
public class MerchantController {

	@Resource
	private MercResoService mercResoService;

	@Resource
	private MerchantService merchantService;

	@Autowired
	private IMerchantServiceCore iMerchantServiceCore;

	@Resource
	private AreaService areaService;
	
	/**客户商家-提交商家信息申请
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/merchant", method = RequestMethod.POST)
	@Login
	public WebResponse insertMerchantApply(@RequestBody @Valid MerchantApplyDto param)throws Exception {
		//证书类型1
		param.setIdType(MerchantEnum.证件类型_身份证.getCode());
		//验证身份证类型是否符合
		if(param.getIdType().equals(MerchantEnum.证件类型_身份证.getCode())){
			if(!IdCardValidator.isIdCard(param.getIdNum()))
				throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(), "身份证格式错误");
		}
		iMerchantServiceCore.insertMerchantApply(AppContextHelper.getCurrentUser().getId(),param);
		return new WebResponse();
	}
	
	/**客户商家-修改商家店铺信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/merchant", method = RequestMethod.PUT)
	@Login
	public WebResponse updateMerchant(@RequestBody @Valid MerchantUpdateDto param)throws Exception {
		iMerchantServiceCore.updateMerchant(AppContextHelper.getCurrentUser().getId(), param);
		return new WebResponse();
	}
	
	/**客户商家-获取商家信息
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rest/merchant", method = RequestMethod.GET)
	@Login
	public WebResponse findMerchant()throws Exception {
		return new WebResponse(iMerchantServiceCore.findMerchant(AppContextHelper.getCurrentUser().getId()));
	}

	/**
	 * 查询商家详情
	 * @param id 商家id
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/rest/merchant/detail/{merchantId}",method = RequestMethod.GET)
	public WebResponse selectMerchantDetail(@PathVariable("merchantId") String id) throws Exception{
		MerchantDetailVO merchant = iMerchantServiceCore.findMerchant(id);
		if(null==merchant)throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
		MerchantDetail detail = mercResoService.selectMercResoDetail(id);
		if (null==detail)detail=new MerchantDetail();
		BeanUtils.copyProperties(merchant,detail);
		return new WebResponse(detail);
	}

	/**
	 * 分页查询商家列表
	 * @return
	 */
	@RequestMapping(value = "/rest/merchant/list",method = RequestMethod.GET)
	public WebResponse selectMerchantList(SelectMerchant param){
		Integer[] city = param.getCity();
		if (null!=city&&city.length>0){
			List<Integer> list = areaService.selectAreaIdsByPAreaId(city);
			if(null!=list&&list.size()>0){
				param.setAreaStr(StringUtils.join(list,","));
			}
		}
        Integer type = param.getType();
        if(null!=type){
            List<Integer> list = mercResoService.selectCustIdsByResourceType(type);
            if(null!=list&&list.size()>0){
                param.setCustIds(StringUtils.join(list,","));
            }
        }
        return new WebResponse(merchantService.selectMerchantByPage(param));
	}
	
	
}
