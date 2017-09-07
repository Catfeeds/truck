package com.hyhl.gotosea.console.ref.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alipay.api.internal.util.StringUtils;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.ref.dto.FeatureTagDTO;
import com.hyhl.gotosea.console.ref.service.ITagService;

@RestController
public class TagController {

	@Autowired
	private ITagService iTagService;
	
	 /**获取所有标签类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/types",method = RequestMethod.GET)
    public WebResponse findTagTypes() throws Exception {
        return new WebResponse(iTagService.findTagTypes());
    }
    
    /**获取所有特征标签标签-树形
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/feature",method = RequestMethod.GET)
    public WebResponse findFeatureTagsTree(Integer type) throws Exception {
        return new WebResponse(iTagService.findFeatureTagsTree(type));
    }
    
    /**获取所有评价标签
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/evaluates",method = RequestMethod.GET)
    public WebResponse findEvaluateTags() throws Exception {
        return new WebResponse(iTagService.findEvaluateTags());
    }
    
    /**特征标签-新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/feature",method = RequestMethod.POST)
    public WebResponse insertFeatureTag(@RequestBody @Valid FeatureTagDTO param) throws Exception {
    	iTagService.insertFeatureTag(param);
        return new WebResponse().returnMsg("新增成功");
    }
    
    /**特征标签-修改
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/feature/{id}",method = RequestMethod.PUT)
    public WebResponse updateFeatureTag(@PathVariable("id")Integer id, @RequestBody FeatureTagDTO param) throws Exception {
    	String name = param.getName();
    	if(StringUtils.isEmpty(name))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
    	iTagService.updateFeatureTag(id, name);
        return new WebResponse().returnMsg("修改成功");
    }
	
//    /**获取玩家兴趣标签
//     * @return
//     * @throws Exception
//     */
//    @RequestMapping(value = "/rest/tag/travelers",method = RequestMethod.GET)
//    public WebResponse findTravelerTags() throws Exception {
//        return new WebResponse(iTagServiceCore.findTravelerTags());
//    }
    
   
    
//    /**获取商家资源标签
//     * @return
//     * @throws Exception
//     */
//    @RequestMapping(value = "/rest/tag/merchants",method = RequestMethod.GET)
//    public WebResponse findMerchantTags() throws Exception {
//        return new WebResponse(iTagServiceCore.findMerchantTags());
//    }
    
//    /**获取所有特征标签标签-列表
//     * @return
//     * @throws Exception
//     */
//    @RequestMapping(value = "/rest/tag/features",method = RequestMethod.GET)
//    public WebResponse findFeatureTags() throws Exception {
//        return new WebResponse(iTagService.findFeatureTags());
//    }
    
    
   
    
    
    
    
}
