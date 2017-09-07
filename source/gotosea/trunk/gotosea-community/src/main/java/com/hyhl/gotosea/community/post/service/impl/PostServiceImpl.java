package com.hyhl.gotosea.community.post.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hfocean.common.oss.service.OssService;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.exception.type.ProdError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.community.post.service.PostService;
import com.hyhl.gotosea.core.comm.dao.*;
import com.hyhl.gotosea.core.comm.dto.*;
import com.hyhl.gotosea.core.comm.enm.ActivityCondEnum;
import com.hyhl.gotosea.core.comm.enm.PostCondEnum;
import com.hyhl.gotosea.core.comm.enm.PostEnum;
import com.hyhl.gotosea.core.comm.po.*;
import com.hyhl.gotosea.core.comm.service.CustCommServiceCore;
import com.hyhl.gotosea.core.comm.vo.*;
import com.hyhl.gotosea.core.common.oss.PathEnum;
import com.hyhl.gotosea.core.common.oss.PathHandler;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CreditsRuleEnum;
import com.hyhl.gotosea.core.cust.enm.CustFavoriteEnum;
import com.hyhl.gotosea.core.cust.po.CustFavorite;
import com.hyhl.gotosea.core.cust.service.ICustFavoriteServiceCore;
import com.hyhl.gotosea.core.prod.mapper.ServiceDetailMapper;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.po.ServiceDetail;
import com.hyhl.gotosea.core.prod.service.PubResServiceCore;
import com.hyhl.gotosea.core.rabbitmq.bean.MqCreditsNew;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;
import com.hyhl.gotosea.core.rabbitmq.message.MqMessage;
import com.hyhl.gotosea.core.rabbitmq.producer.MqProducer;
import com.hyhl.gotosea.core.util.PrimaryKeyGenerator;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.*;

@Service
@Transactional(readOnly = true,transactionManager = "commTransactionManager")
public class PostServiceImpl extends BaseServiceImpl<TPost> implements PostService{
    @Resource
    private TActivityMapper activityMapper;
    @Resource
    private TPostMapper postMapper;
    @Resource
    private TPostAttachmentMapper postAttachmentMapper;
    @Resource
    private PubResServiceCore pubResServiceCore;
    @Resource
    private TPostCommentMapper postCommentMapper;
    @Resource
    private TPostThumbsMapper postThumbsMapper;
    @Resource
    private ServiceDetailMapper serviceDetailMapper;
    @Resource
    private ICustFavoriteServiceCore custFavoriteServiceCore;
    @Resource
    private MqProducer mqProducer;
    @Resource
    private CustCommServiceCore custCommServiceCore;
    @Resource
    private OssService ossService;

    /**
     * 创建帖子
     * @param postDto
     * @return
     * @throws Exception
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse createPost(PostDto postDto) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        //设置客户id(who is post man)
        TPost post = new TPost();
        BeanUtils.copyProperties(postDto,post);
        post.setCommentsNum(0);
        post.setThumbsNum(0);
        post.setSectionId(PostEnum.动态分享.getCode());
        post.setFavoriteNum(0);
        post.setPostTime(new Date());
        post.setCustId(user.getId());
        post.setOnlyForMutualFans(postDto.getOnlyForMutaulFans());

        List<PostAttachmentDto> postAttachmentDtos = postDto.getAttachmentDtos();
        if (postAttachmentDtos!=null && postAttachmentDtos.size()>0){
            post.setAttachmentNum(postAttachmentDtos.size());
            postMapper.insertUseGeneratedKeys(post);
            List<TPostAttachment> postAttachments = new ArrayList<>();
            for (PostAttachmentDto postAttachmentDto:postAttachmentDtos){
                TPostAttachment postAttachment = new TPostAttachment();
                BeanUtils.copyProperties(postAttachmentDto,postAttachment);
                postAttachment.setPostId(postDto.getId());
                postAttachments.add(postAttachment);
            }
            postAttachmentMapper.insertList(postAttachments);
        }else {
            postMapper.insert(post);
        }

        return new WebResponse("success","");
    }


    /**
     * 通过条件列举帖子
     * @param cond
     * @return
     */
    @Override
    public WebResponse listPostByCond(PostCond cond) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        if (cond.getSectionId() ==null)
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);

        if (user!=null) { //说明是游客,只能看没有设置仅朋友可见的帖子和活动
            cond.setVisitorId(user.getId());
        }

        Pager<TPost> pager = selectByPage(new PageExcute<TPost>() {
            @Override
            public List<TPost> excute() {
                return postMapper.listPostByCond(cond);
            }
        });

        pager.setContent(getPostList(cond.getSectionId(),pager.getContent()));//sectionId用来判断是否是活动
        return new WebResponse(pager);
    }


    /**
     * 评论帖子
     * @param postCommentDto
     */
    @Override
    @Transactional(transactionManager = "commTransactionManager")
    public WebResponse commentPost(PostCommentDto postCommentDto) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        TPostComment postComment = new TPostComment();
        BeanUtils.copyProperties(postCommentDto,postComment);
        postComment.setCustId(user.getId());
        postComment.setCommentTime(new Date());
        postCommentMapper.insert(postComment);

        //更新帖子评论数量
        TPost post = postMapper.selectByPrimaryKey(postCommentDto.getPostId());
        post.setCommentsNum(post.getCommentsNum()+1);
        postMapper.updateByPrimaryKey(post);

        //发送rmq消息增加积分
        MqCreditsNew creditsNew = new MqCreditsNew(user.getId(), user.getPhone(), CreditsRuleEnum.评论动态);
        mqProducer.send(MqMessage.newInstance().put(MqMessageEnum.credits_new, creditsNew));
        return new WebResponse("success","");
    }

    /**
     * 获取帖子详情
     * @param postId 帖子id
     * @return
     */
    @Override
    public WebResponse getPostById(Long postId) throws Exception {
        //获取post信息
        TPost post = postMapper.selectByPrimaryKey(postId);
        if (post == null)
            throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        //创建vo
        PostVo postVo = new PostVo();
        BeanUtils.copyProperties(post,postVo);
        //获取postAttachment信息
        TPostAttachment postAttachment = new TPostAttachment();
        postAttachment.setPostId(postId);
        List<TPostAttachment> postAttachments = postAttachmentMapper.select(postAttachment);
        postVo.setPostAttachments(postAttachments);
        //
        postVo.setCustCommVo(custCommServiceCore.getCommVo(post.getCustId()));

        return new WebResponse("success","",postVo);
    }



    /**
     * 为一篇帖子点赞
     * @param postId
     */
    @Transactional(transactionManager = "commTransactionManager")
    @Override
    public WebResponse thumbPost(Long postId) {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        if(postMapper.selectByPrimaryKey(postId)==null)
            throw new BaseBusinessException(CommError.POST_NOT_EXIST);

        TPostThumbs postThumbs = new TPostThumbs();
        postThumbs.setPostId(postId);
        postThumbs.setThumbTime(new Date());
        postThumbs.setCustId(user.getId());
        postThumbsMapper.insert(postThumbs);
        //更新帖子点赞数量
        TPost post = postMapper.selectByPrimaryKey(postId);
        post.setThumbsNum(post.getThumbsNum()+1);
        postMapper.updateByPrimaryKey(post);
        return new WebResponse("success","");
    }


    /**
     * 列举我的帖子(我收藏的帖子，我的帖子)
     * @return
     * @throws Exception
     */
    @Override
    public WebResponse listMyPost(Integer type) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        Pager pager = null;

        if (type == PostCondEnum.我收藏的帖子.getCode()){

            //获取用户的所有CustFavorite
            Example CustFavoriteExample = new Example(CustFavorite.class);
            CustFavoriteExample.createCriteria().andEqualTo("custId",user.getId()).
                    andEqualTo("targetType",CustFavoriteEnum.动态.code());

            pager = selectByPage(new PageExcute<CustFavorite>() {
                @Override
                public List<CustFavorite> excute() {
                    return custFavoriteServiceCore.selectByExample(CustFavoriteExample);
                }
            });

            if (pager.getContent().size()<=0)
                return null;

            List<Long> ids = new ArrayList<>();
            List<CustFavorite> custFavorites = pager.getContent();
            for (CustFavorite custFavorite:custFavorites){
                ids.add(Long.valueOf(custFavorite.getTargetId()));
            }

            //获取所有帖子
            Example postExample = new Example(TPost.class);
            postExample.createCriteria().andIn("id",ids);
            pager.setContent(postMapper.selectByExample(postExample));

        }else if (type == PostCondEnum.我的帖子.getCode()){

            TPost post = new TPost();
            post.setCustId(user.getId());
            post.setSectionId(PostEnum.动态分享.getCode());

            pager = selectByPage(new PageExcute<TPost>() {
                @Override
                public List<TPost> excute() {
                    return postMapper.select(post);
                }
            });

        }else {
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
        }

        pager.setContent(getPostList(PostEnum.动态分享.getCode(),pager.getContent()));
        return new WebResponse("success","",pager);
    }

    /**
     * 列举我的活动列表（我收藏的活动，我的活动）
     * @param type
     * @return
     */
    @Override
    public WebResponse listMyAct(Integer type) throws Exception {
        BaseSessionUser user = AppContextHelper.getCurrentUser();

        Pager<TPost> pager = null;
        if (type == ActivityCondEnum.我的活动.getCode()){
            PostCond postCond = new PostCond();
            postCond.setPostCustId(user.getId());//通过用户id获取用户活动列表
            postCond.setSectionId(PostEnum.活动约伴.getCode());
            pager = selectByPage(new PageExcute<TPost>() {
                @Override
                public List<TPost> excute() {
                    return postMapper.listPostByCond(postCond);
                }
            });

            //我参加的活动（如果我发起的活动不够10条，那么用参加的活动补充）
            Integer count = (pager==null?10:pager.getPageSize() - pager.getContent().size());
            PageInfo<TPost> pageInfo=null;
            if (count > 0){
                PageHelper.startPage(pager.getPageNumber(),count,true);
                pageInfo = new PageInfo(new PageExcute<TPost>() {
                    @Override
                    public List<TPost> excute() {
                        return postMapper.listPostByActCust(user.getId());
                    }}.excute()
                );
                if (pageInfo.getList().size()>0 && pager == null){
                    pager = new Pager<>();
                    pager.setContent(new ArrayList());
                }
                for(TPost post:pageInfo.getList()){
                    pager.getContent().add(post);
                }
            }

            //重新配置pager参数
            pager.setNumberOfElements(pager.getContent().size());
            pager.setTotalElements(pager.getTotalElements()+pageInfo.getTotal());
            Long totolPages = pager.getTotalElements()/pager.getPageSize();
            pager.setTotalPages(pager.getTotalElements()%pager.getPageSize()==0?totolPages:totolPages+1);
        }else if(type == ActivityCondEnum.我收藏的活动.getCode()){

            CustFavorite custFavorite = new CustFavorite();
            custFavorite.setCustId(user.getId());
            custFavorite.setTargetType(CustFavoriteEnum.活动.code());

            //获取list custFavorite对象
            Pager <CustFavorite> custFavoritePager = selectByPage(new PageExcute<CustFavorite>() {
                @Override
                public List<CustFavorite> excute() {
                    return custFavoriteServiceCore.select(custFavorite);
                }
            });
            //获取帖子id
            List<CustFavorite> custFavorites = custFavoritePager.getContent();
            if (custFavorites.size()>0){
                List<Long> targetIds = new ArrayList<>();
                for(CustFavorite custFavoriteTmp:custFavorites){
                    targetIds.add(Long.valueOf(custFavoriteTmp.getTargetId()));
                }
                //通过ids获取帖子
                Example postExample = new Example(TPost.class);
                postExample.orderBy("postTime DESC");
                postExample.createCriteria().andIn("id",targetIds);

                pager = new Pager<TPost>();
                pager.setPageNumber(custFavoritePager.getPageNumber());
                pager.setPageSize(custFavoritePager.getPageSize());
                pager.setTotalElements(custFavoritePager.getTotalElements());
                pager.setNumberOfElements(custFavoritePager.getNumberOfElements());
                pager.setContent(postMapper.selectByExample(postExample));
            }
        }else {
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);
        }

        if (pager==null) {
            return new WebResponse();
        }
        List<PostListVo> postListVos = getPostList(PostEnum.活动约伴.getCode(),pager.getContent());
        pager.setContent(postListVos);
        return new WebResponse(pager);
    }

    /**
     * 列举帖子的回复信息
     * @param postId
     * @return
     */

    @Override
    public WebResponse listPostComment(Long postId) throws Exception {
        //获取评论信息
        TPostComment postComment = new TPostComment();
        postComment.setPostId(postId);  //根据帖子id获取评论

        //获取list custFavorite对象
        Pager <TPostComment> pager = selectByPage(new PageExcute<TPostComment>() {
            @Override
            public List<TPostComment> excute() {
                return postCommentMapper.select(postComment);
            }
        });

        pager.setContent(postCommentToVo(pager.getContent()));
        return new WebResponse(pager);
    }

    /**
     * 列举点赞的用户
     * @param postId
     * @return
     * @throws Exception
     */
    @Override
    public WebResponse listPostThumb(Long postId) throws Exception {

        Example thumbExample = new Example(TPostThumbs.class);
        thumbExample.orderBy("thumbTime desc");
        thumbExample.createCriteria().andEqualTo("postId",postId);

        Pager <TPostThumbs>pager = selectByPage(new PageExcute<TPostThumbs>() {
            @Override
            public List<TPostThumbs> excute() {
                return postThumbsMapper.selectByExample(thumbExample);
            }
        });

        pager.setContent(postThumbToListVo(pager.getContent()));
        return new WebResponse(pager);
    }

    /**
     * 上传图片
     * @param request
     * @return
     */
    @Override
    public WebResponse upload(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest)request).getFiles("file");
        MultipartFile file = null;
        List<Img> urlList = new ArrayList<>();
        for (int i =0; i< files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    String filePath = file.getOriginalFilename();
                    String suffix = filePath.substring(
                            filePath.indexOf('.') + 1, filePath.length());
                    InputStream inputStream = new ByteArrayInputStream(file.getBytes());
                    String path =  PathHandler.getStorePath(PathEnum.SOCIAL, PrimaryKeyGenerator.generate()+"."+suffix);
                    Map map = ossService.uploadByPath(inputStream,path);
                    String imgPattern = "png jpg gif jpeg bmp PNG JPG GIF JPEG BMP";
                    Img img = new Img();
                    img.setAttachmentType(imgPattern.contains(suffix)?1:2);
                    img.setOriginal((String) map.get("fullUrl"));
                    img.setThumbnail(img.getOriginal()+"?x-oss-process=image/resize,m_lfit,h_216,w_216/format,"+suffix);
                    urlList.add(img);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return new WebResponse(urlList);
    }


    /**
     * 收藏帖子和活动
     * @param id
     * @param sectionId
     * @return
     */
    @Override
    @Transactional(transactionManager = "custTransationManager")
    public WebResponse favoritePost(Long id, Integer sectionId) {
        BaseSessionUser user = AppContextHelper.getCurrentUser();
        CustFavorite custFavorite = new CustFavorite();
        TActivity activity =null;
        TPost post = null;
        if (sectionId == PostEnum.动态分享.getCode()){
            post = postMapper.selectByPrimaryKey(id);
            if (post==null) {
                throw new BaseBusinessException(CommError.POST_NOT_EXIST);
            }
            if (post.getCustId().equals(user.getId())) {
                throw new BaseBusinessException("200","您的活动不会跑的,不用收藏");
            }
            custFavorite.setTargetType(CustFavoriteEnum.动态.code());
        }else if (sectionId == PostEnum.活动约伴.getCode()){
            activity = activityMapper.selectByPrimaryKey(id);
            if (activity == null) throw new BaseBusinessException(CommError.ACTIVITY_NOT_FOUND);
            //判断是否是自己的活动
            String custId =postMapper.selectByPrimaryKey(activity.getPostId()).getCustId();
            if (custId.equals(user.getId())) {
                throw new BaseBusinessException("200","您的活动不会跑的,不用收藏");
            }
            custFavorite.setTargetType(CustFavoriteEnum.活动.code());
        }

        //判断是否已经收藏过
        custFavorite.setCustId(user.getId());
        custFavorite.setTargetId(String.valueOf(sectionId==PostEnum.动态分享.getCode()?id:activity.getPostId()));
        if (custFavoriteServiceCore.select(custFavorite).size()>0)
            throw new BaseBusinessException(CommError.FAVORITE_ACTIVITY_EXIST);
        //插入收藏表
        custFavoriteServiceCore.insert(custFavorite);

        //更新收藏数量
        if (post == null){
            post=postMapper.selectByPrimaryKey(activity.getPostId());
            post.setId(sectionId==PostEnum.动态分享.getCode()?id:activity.getPostId());
        }
        post.setFavoriteNum(post.getCommentsNum()+1);
        postMapper.updateByPrimaryKeySelective(post);
        return new WebResponse();
    }

    /**
     * 搜索帖子(for 首页)
     * @param keywords
     * @return
     * @throws Exception
     */
    @Override
    public WebResponse searchPost(String keywords) throws Exception {
        Example postExample = new Example(TPost.class);
        postExample.createCriteria().andEqualTo("sectionId",PostEnum.动态分享.getCode()).andLike("content","%"+keywords+"%");
        postMapper.selectByExample(postExample);
        return new WebResponse(postListToVo(postMapper.selectByExample(postExample)));
    }


    /**
     * 获取帖子/活动列表
     * @param sectionId
     * @param posts
     * @return
     * @throws Exception
     */
    private List<PostListVo> getPostList(Integer sectionId,List<TPost> posts) throws Exception {

        List<PostListVo> postListVos = postListToVo(posts);

        for (PostListVo postListVo:postListVos){

            if (sectionId == PostEnum.动态分享.getCode()){
                //获取对应帖子的附件信息
                AttachmentCond attachmentCond = new AttachmentCond();
                attachmentCond.setPostId(postListVo.getId());
                List<TPostAttachment> attachments = postAttachmentMapper.listAtchByCond(attachmentCond);
                postListVo.setPostAttachments(attachments);
            }
            else if(sectionId == PostEnum.活动约伴.getCode()){ //活动约伴
                //获取活动信息
                TActivity activity = activityMapper.selectByPrimaryKey(postListVo.getActivityId());
                ActivityListVo activityListVo = new ActivityListVo();
                if (activity!=null){
                    BeanUtils.copyProperties(activity,activityListVo);
                    PubResource pubResource = pubResServiceCore.selectByPrimaryKey(activity.getDestination());
                    if (pubResource!=null)
                        activityListVo.setDestination(pubResource.getName());
                    postListVo.setActivityListVo(activityListVo);
                }
            }
        }

        return postListVos;
    }


        //判断该服务是否有明细
//            ProdServe serve = prodServeService.selectByPrimaryKey(activityService.getServiceId());
//            if (serve == null)
//                throw new BaseBusinessException(ProdError.SERVICE_NOTFOUNT);
//
//            if (serve.getServiceDetail() == 0){ //没有服务明细
//
//            }

        //服务明细先不做
//        for (TActivityService activityService:activityServices){
//            ActivityServiceVo activityServiceVo = new ActivityServiceVo();
//            BeanUtils.copyProperties(activityService,activityServiceVo);
//            String serviceName = prodServeMapper.selectByPrimaryKey(activityService.getServiceId()).getName();
//            activityServiceVo.setServiceName(serviceName);
//
//            //通过服务id获取服务明细项
//            TActivityServiceDetail serviceDetail = new TActivityServiceDetail();
//            serviceDetail.setActivityServiceId(activityService.getServiceId());
//            List<TActivityServiceDetail> serviceDetails = activityServiceDetailMapper.select(serviceDetail);
//            List<ActivityServiceDetailVo> serviceDetailVos = serviceDetailToVo(serviceDetails);
//            activityServiceVo.setServiceDetailVos(serviceDetailVos);
//
//            activityServiceVos.add(activityServiceVo);
//        }

    /**
     * 服务明细转Vo
     * @return
     */
    private List<ActivityServiceDetailVo> serviceDetailToVo(List<TActivityServiceDetail> serviceDetails){
        List<ActivityServiceDetailVo> serviceDetailVos = new ArrayList<>();
        for (TActivityServiceDetail activityServiceDetail:serviceDetails){
            ActivityServiceDetailVo serviceDetailVo = new ActivityServiceDetailVo();
            BeanUtils.copyProperties(activityServiceDetail,serviceDetailVo);
            ServiceDetail serviceDetail = serviceDetailMapper.selectByPrimaryKey(activityServiceDetail.getServiceDetailId());
            if (serviceDetail == null){
                throw new BaseBusinessException(ProdError.SERVICE_DETAIL_NOTFOUND);
            }
            serviceDetailVo.setServiceDetailName(serviceDetail.getName());
            serviceDetailVos.add(serviceDetailVo);
        }
        return serviceDetailVos;
    }

    /**
     * postCommentToVo
     * @param postComments
     * @return
     */
    private List<PostCommentVo> postCommentToVo(List<TPostComment> postComments) throws Exception {
        List<PostCommentVo> postCommentVos = new ArrayList<>();
        for (TPostComment postComment:postComments){
            PostCommentVo postCommentVo = new PostCommentVo();
            BeanUtils.copyProperties(postComment,postCommentVo);
            postCommentVo.setCust(custCommServiceCore.getCommVo(postComment.getCustId()));

            if (postCommentVo.getPid() != null){
                TPostComment pidPostComment = postCommentMapper.selectByPrimaryKey(postCommentVo.getPid());

                //1. 找到上一个帖子评论的用户Id
                String pidCustId=pidPostComment.getCustId();
                postCommentVo.setPidCust(custCommServiceCore.getCommVo(pidCustId));
                //2. 找到上一条回复内容
                postCommentVo.setPidContent(pidPostComment.getContent());
            }
            postCommentVos.add(postCommentVo);
        }

        if (postCommentVos.size()==0)
            return null;
        return postCommentVos;
    }

    /**
     * post转Vo
     * @param posts
     * @return
     */
    private List<PostListVo> postListToVo(List<TPost> posts) throws Exception {

        BaseSessionUser user = AppContextHelper.getCurrentUser();

        List<PostListVo> postListVos = new ArrayList<>();
        for (TPost post:posts){
            PostListVo postListVo = new PostListVo();
            BeanUtils.copyProperties(post,postListVo);

            if (user==null){
                postListVo.setIsFavorite(false);
                postListVo.setIsThumb(false);
                postListVo.setIsSelf(false);
            }else {
                postListVo.setIsSelf(user.getId().equals(post.getCustId())?true:false);
                TPostThumbs postThumbs = new TPostThumbs();
                postThumbs.setCustId(user.getId());
                postThumbs.setPostId(post.getId());

                CustFavorite custFavorite =new CustFavorite();
                custFavorite.setCustId(user.getId());
                custFavorite.setTargetId(String.valueOf(post.getId()));

                postListVo.setIsThumb(postThumbsMapper.select(postThumbs).size()>0?true:false);
                postListVo.setIsFavorite(custFavoriteServiceCore.select(custFavorite).size()>0?true:false);
            }

            postListVo.setCustCommVo(custCommServiceCore.getCommVo(post.getCustId()));
            postListVos.add(postListVo);
        }
        return postListVos;
    }

    private List<ThumbListVo> postThumbToListVo(List<TPostThumbs> postThumbsList) throws Exception {
        List<ThumbListVo> thumbListVos = new ArrayList<>();
        for (TPostThumbs postThumbs:postThumbsList){
            ThumbListVo thumbListVo = new ThumbListVo();
            BeanUtils.copyProperties(postThumbs,thumbListVo);
            thumbListVo.setThumbCust(custCommServiceCore.getCommVo(postThumbs.getCustId()));
            thumbListVos.add(thumbListVo);
        }
        return thumbListVos;
    }
}
