package com.hyhl.gotosea.app.article.service.impl;

import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.exception.type.ArticleError;
import com.hyhl.common.exception.type.CommError;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.article.service.ArticleService;
import com.hyhl.gotosea.core.article.dao.ArticleMapper;
import com.hyhl.gotosea.core.article.dao.ArticleReaderMapper;
import com.hyhl.gotosea.core.article.dao.ArticleThumbMapper;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.po.ArticleThumb;
import com.hyhl.gotosea.core.article.po.SearchCond;
import com.hyhl.gotosea.core.article.vo.ArticleListVo;
import com.hyhl.gotosea.core.article.vo.ArticleVo;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.enm.CustFavoriteEnum;
import com.hyhl.gotosea.core.cust.mapper.MerchantTagMapper;
import com.hyhl.gotosea.core.cust.po.CustFavorite;
import com.hyhl.gotosea.core.cust.service.ICustFavoriteServiceCore;
import com.hyhl.gotosea.core.cust.service.ICustTagServiceCore;
import com.hyhl.gotosea.core.cust.vo.CustTagVO;
import com.hyhl.gotosea.core.ref.mapper.BusinessUnitMapper;
import com.hyhl.gotosea.core.util.URLUtil;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(transactionManager = "articleTransationManager",readOnly = true)
public class ArticleServiceImpl extends BaseServiceImpl<Article> implements ArticleService {

    @Resource
    private MerchantTagMapper merchantTagMapper;
    @Resource
    private ArticleMapper articleMapper;
    @Resource
    private ArticleReaderMapper articleReaderMapper;
    @Resource
    private BusinessUnitMapper businessUnitMapper;
    @Resource
    private ICustFavoriteServiceCore custFavoriteServiceCore;
    @Resource
    private ArticleThumbMapper articleThumbMapper;
    @Resource
    private ICustTagServiceCore tagServiceCore;
    /**
     * 获取推荐的文章
     * @return
     */
    private Pager listRecArts() throws Exception {
        //获取用户id
        BaseSessionUser user =  AppContextHelper.getCurrentUser();

        //用户没有登录的情况
        if (user == null){

            Pager<Article> pager = selectByPage(new PageExcute<Article>() {
                @Override
                public List<Article> excute() {
                    return articleMapper.selectAll();
                }
            });

            pager.setContent(artToVo(pager.getContent()));
            return pager;
        }else { //用户登录的情况
            //获取玩家标签 - 匹配文章标签
            List<CustTagVO> custTagVos = tagServiceCore.findCustTravelerTag(user.getId());
            if (custTagVos==null || custTagVos.size()<=0)
                throw new BaseBusinessException(CommError.CUST_TAG_NOT_EXIST);
            List<Integer> tags = new ArrayList<>();

            for (CustTagVO custTagVO:custTagVos){
                tags.add(custTagVO.getTagId());
            }
            Pager<Article> pager = selectByPage(new PageExcute<Article>() {
                @Override
                public List<Article> excute() {
                    return articleMapper.getArtByTags(tags);
                }
            });

            pager.setContent(artToVo(pager.getContent()));
            return pager;
        }

    }

    /**
     * 阅读文章
     * @param artId
     * @return
     */
    @Transactional(transactionManager = "articleTransationManager")
    @Override
    public ArticleVo getArtById(Model model, Integer artId) {
        BaseSessionUser baseSessionUser =  AppContextHelper.getCurrentUser();

        //获取文章内容
        if (artId == 0 || artId ==null) {
            throw  new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);    //参数错误
        }
        Article article = articleMapper.getArtById(artId);
        if (article == null) {
            throw  new BaseBusinessException(BaseBusinessError.NOT_FOUND);  //没有找到内容
        }
        ArticleVo articleVo = new ArticleVo();
        BeanUtils.copyProperties(article,articleVo);
        articleVo.setBusinessUnitName(businessUnitMapper.getBizById(article.getBusinessUnitId()).getName());

        //更新t_article的阅读量
        articleMapper.readArticle(articleVo.getId());

        //在t_article_reader中插入一条数据
        if (baseSessionUser !=null) {
            articleReaderMapper.readArticle(baseSessionUser.getId(), articleVo.getId());
        }
        //设置正文
        articleVo.setHtmlFile(getHtmlFile(artId));
        model.addAttribute("article",articleVo);
        return articleVo;
    }

    /**
     * 文章点赞
     * @param artId
     */
    @Override
    @Transactional(transactionManager = "articleTransationManager")
    public WebResponse thumbArt(Integer artId) {

        BaseSessionUser baseSessionUser = AppContextHelper.getCurrentUser();
//        BaseSessionUser baseSessionUser = new BaseSessionUser();
//        baseSessionUser.setId("21213");//测试数据

        //判断是否已经点赞过
        Example example = new Example(ArticleThumb.class);
        example.createCriteria().andEqualTo("articleId",artId).
                andEqualTo("custId",baseSessionUser.getId());
        if (articleThumbMapper.selectByExample(example).size()>0){
            throw new BaseBusinessException(ArticleError.THUMB_EXIST);
        }

        //获取文章
        if (artId == 0 || artId ==null)
            throw  new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);    //参数错误
        Article article = articleMapper.getArtById(artId);
        if (article == null)
            throw  new BaseBusinessException(BaseBusinessError.NOT_FOUND);  //没有找到内容

        //更新t_article的点赞量
        articleMapper.thumbArticle(article.getId());

        //在t_article_thumb中插入一条数据
        ArticleThumb articleThumb = new ArticleThumb();
        articleThumb.setArticleId(artId);
        articleThumb.setCustId(baseSessionUser.getId());
        articleThumb.setThumbTime(new Date());
        articleThumbMapper.insert(articleThumb);
        return new WebResponse();
    }


    @Override
    @Transactional(transactionManager = "custTransationManager")
    public WebResponse collectArticle(Integer artId){
        BaseSessionUser user = AppContextHelper.getCurrentUser();

        if (articleMapper.selectByPrimaryKey(artId)==null)
            throw new BaseBusinessException(ArticleError.ARTICLE_NOTFOUND);

        CustFavorite custFavorite = new CustFavorite();
        custFavorite.setCustId(user.getId());
        custFavorite.setTargetId(String.valueOf(artId));
        custFavorite.setTargetType(CustFavoriteEnum.文章.code());
        //判断是否收藏过
        if(custFavoriteServiceCore.selectCount(custFavorite)>0)
            throw new BaseBusinessException(ArticleError.ARTICLE_FAV_EXIST);

        custFavoriteServiceCore.insert(custFavorite);
        return new WebResponse();
    }

    /**
     * 通过关键字搜索文章
     * @param keywords
     */
    @Override
    public List<ArticleListVo> searchArt(String keywords) {
        Example example = new Example(Article.class);
        example.createCriteria().orLike("title","%"+keywords+"%");
        List<Article> articles = articleMapper.selectByExample(example);
        return artToVo(articles);
    }

    /**
     * 通过条件获取文章列表
     * @param bizId
     * @return
     */
    public Pager getArtsByBizId(Integer bizId) throws Exception {
        if (bizId == null)
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR); //参数不正确
        SearchCond searchCond = new SearchCond();

        if (bizId == 3){    //推荐
            return listRecArts();
        }

        searchCond.setBizId(bizId);
        Pager<Article> pager = selectByPage(new PageExcute<Article>() {
            @Override
            public List<Article> excute() {
                return articleMapper.listArtByCond(searchCond);
            }
        });
        pager.setContent(artToVo(pager.getContent()));
        return pager;
    }

    /**
     * 列举收藏的所有文章
     * @return
     */
    @Override
    public Pager listCollectionArticle() {
        BaseSessionUser baseSessionUser = AppContextHelper.getCurrentUser();
        //获取收藏的文章id
        Example example = new Example(CustFavorite.class);
        example.createCriteria().andEqualTo("custId",baseSessionUser.getId()).
                andEqualTo("targetType",CustFavoriteEnum.文章.code());

        Pager<CustFavorite> pager = selectByPage(new PageExcute<CustFavorite>() {
            @Override
            public List<CustFavorite> excute() {
                return custFavoriteServiceCore.selectByExample(example);
            }
        });

        List<CustFavorite> custFavorites = pager.getContent();
        List<Integer> artIds = new ArrayList<>();
        for (CustFavorite custFavorite:custFavorites){
            artIds.add(Integer.parseInt(custFavorite.getTargetId()));
        }

        //通过文章ids获取文章
        Example artExample = new Example(Article.class);
        artExample.createCriteria().andIn("id",artIds);
        pager.setContent(artToVo(articleMapper.selectByExample(artExample)));
        return pager;
    }

    /**
     * 把服务器上的正文内容获取下来
     * @param artId
     * @return
     */
    private String getHtmlFile(Integer artId) {
        Article article = articleMapper.getArtById(artId);
        if (article ==null)
            throw new BaseBusinessException(ArticleError.ARTICLE_NOTFOUND);
        return URLUtil.urlToString(article.getHtmlFile());
    }

    /**
     * 将article转成articleV 也就是添加了
     * @param articles
     * @return
     */
    private List<ArticleListVo> artToVo(List<Article> articles){
        List<ArticleListVo> articleListVos = new ArrayList<>();
        for(Article article:articles){
            ArticleListVo articleListVo = new ArticleListVo();
            BeanUtils.copyProperties(article,articleListVo);

            //判断是否点赞
            BaseSessionUser user = AppContextHelper.getCurrentUser();
            if (user ==null)
                articleListVo.setIsThumb(false);
            else {
                ArticleThumb articleThumb = new ArticleThumb();
                articleThumb.setArticleId(article.getId());
                articleThumb.setCustId(user.getId());
                articleListVo.setIsThumb(articleThumbMapper.select(articleThumb).size()>0?true:false);
            }
            articleListVo.setBusinessUnitName(businessUnitMapper.getBizById(article.getBusinessUnitId()).getName());
            articleListVos.add(articleListVo);
        }
        return articleListVos;
    }

}
