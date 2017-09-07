package com.hyhl.gotosea.app.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.ref.service.ITagServiceCore;

@RestController
public class TagController {

	@Autowired
	private ITagServiceCore iTagServiceCore;
	
    /**获取玩家兴趣标签
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/travelertags",method = RequestMethod.GET)
    public WebResponse findTravelerTags() throws Exception {
        return new WebResponse(iTagServiceCore.findTravelerTags());
    }
    
    /**获取商家资源标签
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/rest/tag/merchanttags",method = RequestMethod.GET)
    public WebResponse findMerchantTags() throws Exception {
        return new WebResponse(iTagServiceCore.findMerchantTags());
    }
}
