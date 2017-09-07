package com.hyhl.gotosea.community.cust.service.impl;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.cust.service.CommCustService;
import com.hyhl.gotosea.core.comm.dao.*;
import com.hyhl.gotosea.core.comm.enm.PostEnum;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.vo.CustCommCenterVo;
import com.hyhl.gotosea.core.comm.vo.CustInfo;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.po.Cust;
import com.hyhl.gotosea.core.cust.service.ICustServiceCore;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustDetailVO;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional(transactionManager = "commTransactionManager",readOnly = true)
public class CommCustServiceImpl extends BaseServiceImpl<Cust> implements CommCustService {

    @Resource
    private TCustContactMapper custContactMapper;
    @Resource
    private TCustContactInfoMapper custContactInfoMapper;
    @Resource
    private TPostMapper postMapper;
    @Resource
    private TActivityCustMapper activityCustMapper;
    @Resource
    private ICustServiceCore custServiceCore;
    @Resource
    private ICustTagServiceCore custTagServiceCore;

    /**
     * 关注/取消关注用户
     * @param starId
     * @return
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse custContact(String starId) {
        BaseSessionUser user= AppContextHelper.getCurrentUser();

        if (user.getId().equals(starId))
            throw new BaseBusinessException(CommError.CONTACT_SELF);

        if (custServiceCore.selectByPrimaryKey(starId)==null)
            throw new BaseBusinessException(CommError.CONTACT_CUST_NOT_EXIST);


        //判断数据库是否存在该条数据
        TCustContact custContact = new TCustContact();
        custContact.setFans(user.getId());
        custContact.setStar(starId);

        TCustContact custContactTmp = new TCustContact();
        custContactTmp.setFans(starId);
        custContactTmp.setStar(user.getId());
        if (custContactMapper.select(custContact).size()>0){    //数据库已存在该数据
            custContact = custContactMapper.selectOne(custContact);
            custContact.setStatus(custContact.getStatus()==0?1:0);
            custContactMapper.updateByPrimaryKey(custContact);

            //取消关注需要判断是否撤销互相关注
            if (custContact.getStatus()==0 && custContact.getMutualFans()==1){  //说明以前互相关注
                custContactTmp = custContactMapper.selectOne(custContactTmp);
                custContactTmp.setMutualFans(0);
                custContact.setMutualFans(0);
                custContactMapper.updateByPrimaryKey(custContactTmp);
                custContactMapper.updateByPrimaryKey(custContact);
            }
        }else {
            custContact.setStatus(1);
            custContactMapper.insert(custContact);
        }

        //关注要判断是否形成互相关注
        if (custContact.getStatus()==1){    //如果关注,那么判断否是互相关注
            custContactTmp.setStatus(1);
            custContactTmp = custContactMapper.selectOne(custContactTmp);
            if (custContactTmp!=null){
                custContact.setMutualFans(1);

                custContactTmp.setMutualFans(1);
                custContactMapper.updateByPrimaryKey(custContactTmp);
            }else {
                custContact.setMutualFans(0);
            }
            custContactMapper.updateByPrimaryKey(custContact);
            return new WebResponse().returnMsg("关注成功");
        }else
            return new WebResponse().returnMsg("取消关注成功");

    }

    /**
     * 获取个人中心 社区项目的数量（点赞 关注 粉丝 收藏）
     * @return
     */
    @Override
    public WebResponse custCenter() {
        BaseSessionUser user = AppContextHelper.getCurrentUser();
//        if (user == null){
//            user = new BaseSessionUser();
//            user.setId("21312");
//        }

        CustCommCenterVo custCenterVo = new CustCommCenterVo();
        TCustContactInfo custContactInfo = custContactInfoMapper.selectByPrimaryKey(user.getId());
        if (custContactInfo==null){
            custCenterVo.setFansNum(0);
            custCenterVo.setContactNum(0);
        }else {
            custCenterVo.setFansNum(custContactInfo.getFansNum());
            custCenterVo.setContactNum(custContactInfo.getConcernNum());
        }

        TPost post = new TPost();
        post.setCustId(user.getId());
        post.setSectionId(PostEnum.动态分享.getCode());
        custCenterVo.setPostNum(postMapper.selectCount(post));

        TActivityCust activityCust = new TActivityCust();
        activityCust.setCustId(user.getId());
        Integer activityCustNum = activityCustMapper.selectCount(activityCust);
        post.setSectionId(PostEnum.活动约伴.getCode());
        Integer activityNum = postMapper.selectCount(post);
        custCenterVo.setActivityNum(activityCustNum+activityNum);
        return new WebResponse(custCenterVo);
    }

    @Override
    public WebResponse custInfo(String custId) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        CustInfo custInfo =new CustInfo();
        CustDetailVO custDetailVO = custServiceCore.findCust(custId);
        BeanUtils.copyProperties(custDetailVO,custInfo);
        custInfo.setCustTagVos(custTagServiceCore.findCustTravelerTag(custId));

        TCustContact custContact = new TCustContact();
        if (user == null){
            custInfo.setIsContact(false);
            custInfo.setIsSelf(false);
            custInfo.setId(custId);
        }
        else {
            //判断是否关注过
            custContact.setFans(user.getId());
            custContact.setStar(custId);
            List<TCustContact> custContactList =custContactMapper.select(custContact);
            if(custContactList!=null &&custContactList.size()>0)
                custInfo.setIsContact(true);
            else
                custInfo.setIsContact(false);
            //判断是否是自己
            custInfo.setIsSelf(user.getId().equals(custId)?true:false);
            custInfo.setId(user.getId().equals(custId)?user.getId():custId);
        }
        return new WebResponse(custInfo);
    }

    @Override
    public WebResponse custContactList(String custId) {
        return null;
    }
}
