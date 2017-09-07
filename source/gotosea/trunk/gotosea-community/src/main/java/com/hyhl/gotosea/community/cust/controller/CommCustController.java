package com.hyhl.gotosea.community.cust.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.cust.service.CommCustService;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/rest")
public class CommCustController {

    @Resource
    private CommCustService custService;


    /**
     * 关注用户
     * @param starId    被关注用户id
     * @return
     */
    @Login
    @RequestMapping(value = "/contact/{starId}",method = RequestMethod.POST)
    public WebResponse custContact(@PathVariable("starId") String starId){
        return custService.custContact(starId);
    }

    /**
     * 个人中心信息(粉丝数量，关注数量，帖子数量，活动数量)
     * @return
     */
    @Login
    @RequestMapping(value = "/cust/center/num",method = RequestMethod.GET)
    public WebResponse custCenter(){
        return custService.custCenter();
    }


    /**
     * 根据用户id 获取其粉丝列表
     * @return
     */
    @RequestMapping(value = "/contact/list/{custId}")
    public WebResponse custContactList(@PathVariable("custId") String custId){
        return custService.custContactList(custId);
    }

    /**
     *  获取用户信息（个人首页）
     * @param custId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/cust/info/{custId}")
    public WebResponse custInfo(@PathVariable(value = "custId",required = true) String custId) throws Exception {
        return custService.custInfo(custId);
    }
}
