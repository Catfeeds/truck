package com.hyhl.gotosea.console.article.service.impl;

import com.hfocean.common.oss.service.OssService;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.article.service.ArticleService;
import com.hyhl.gotosea.core.article.dao.ArticleMapper;
import com.hyhl.gotosea.core.article.dto.ArticleDto;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.po.SearchCond;
import com.hyhl.gotosea.core.article.vo.ArticleListVo;
import com.hyhl.gotosea.core.article.vo.ArticleVo;
import com.hyhl.gotosea.core.common.oss.PathEnum;
import com.hyhl.gotosea.core.common.oss.PathHandler;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.ref.mapper.BusinessUnitMapper;
import com.hyhl.gotosea.core.util.PrimaryKeyGenerator;
import com.hyhl.gotosea.core.util.URLUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ArticleServiceImpl extends BaseServiceImpl<Article> implements ArticleService{

    @Resource
    private ArticleMapper articleMapper;

    @Resource
    private OssService ossService;

    @Resource
    private BusinessUnitMapper businessUnitMapper;

    /**
     * 上传文章
     * @param articleDto
     */
    @Override
    public WebResponse createArt(ArticleDto articleDto) {
        InputStream inputStream = new ByteArrayInputStream(articleDto.getHtmlFile().getBytes());
        String path =  PathHandler.getStorePath(PathEnum.ARTICLE_IMAGE,PrimaryKeyGenerator.generate()+".html");
        Map map = ossService.uploadByPath(inputStream,path);
        articleDto.setHtmlFile((String) map.get("fullUrl"));
        articleMapper.createArt(articleDto);

        return new WebResponse("success","文章创建成功");
    }


    /**
     * 批量删除文章
     */
    @Override
    public void deleteArts(Article[] arts) {
        if (arts == null)
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR); //参数不正确

        List<Integer> artIds = new ArrayList<>();
        for (Article art:arts){
            artIds.add(art.getId());
        }
        articleMapper.deleteArts(artIds);
    }

    /**
     * 更新文章
     */
    @Override
    public WebResponse updateArt(ArticleDto articleDto) {
        if (articleDto.getId() == null)
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR); //参数不正确
        if (articleDto.getHtmlFile()!=null){    //如果正文有需要修改的话
            //从文章的正文url获取文件名
            Article tmpArticle = articleMapper.getArtById(articleDto.getId());
            InputStream inputStream = new ByteArrayInputStream(articleDto.getHtmlFile().getBytes());
            String path =  PathHandler.getStorePath(PathEnum.ARTICLE_IMAGE,getFileName(tmpArticle.getHtmlFile()));
            Map map = ossService.uploadByPath(inputStream,path);
            articleDto.setHtmlFile((String) map.get("fullUrl"));
        }
        articleMapper.updateArt(articleDto);

        return new WebResponse("success","操作成功");
    }


    /**
     * 根据条件列举文章
     * @param searchCond
     * @return
     */
    @Override
    public Pager listArtByCond(SearchCond searchCond) {
        Pager<Article> pager = selectByPage(new PageExcute<Article>() {
            @Override
            public List<Article> excute() {
                return articleMapper.listArtByCond(searchCond);
            }
        });
        pager.setContent(poToVo(pager.getContent()));
        return pager;
    }

    /**
     * 通过id获取文章
     * @param artId
     * @return
     */
    @Override
    public ArticleVo getArtById(Integer artId) {
        //获取文章内容
        if (artId == 0 || artId ==null)
            throw  new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR);    //参数错误
        Article article = articleMapper.getArtById(artId);
        if (article == null)
            throw  new BaseBusinessException(BaseBusinessError.NOT_FOUND);  //没有找到内容
        ArticleVo articleVo = new ArticleVo();
        BeanUtils.copyProperties(article,articleVo);
        articleVo.setHtmlFile(URLUtil.urlToString(articleVo.getHtmlFile()));
        articleVo.setBusinessUnitName(businessUnitMapper.getBizById(article.getBusinessUnitId()).getName());
        return articleVo;
    }


    /**
     * article -> articleVo
     * @param articles
     * @return
     */
    private List<ArticleListVo> poToVo(List<Article> articles) {
        List<ArticleListVo> articleListVos = new ArrayList<>();
        for(Article article:articles){
            ArticleListVo articleListVo = new ArticleListVo();
            BeanUtils.copyProperties(article,articleListVo);
            articleListVo.setBusinessUnitName(businessUnitMapper.getBizById(article.getBusinessUnitId()).getName());
            articleListVos.add(articleListVo);
        }
        return articleListVos;
    }

    /**
     * 获取文件名
     * @param url
     * @return
     */
    private String getFileName(String url){
        String temp [] = url.split("/");
        return (temp[temp.length-1]);
    }
}
