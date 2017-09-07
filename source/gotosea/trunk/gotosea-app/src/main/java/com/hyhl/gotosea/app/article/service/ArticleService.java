package com.hyhl.gotosea.app.article.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.vo.ArticleListVo;
import com.hyhl.gotosea.core.article.vo.ArticleVo;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;
import org.springframework.ui.Model;

import java.util.List;

public interface ArticleService extends BaseService<Article>{
//    public Pager listRecArts ();
    public ArticleVo getArtById(Model model, Integer artId);
    public WebResponse thumbArt(Integer artId);
    public Pager getArtsByBizId(Integer bizId) throws Exception;
    public Pager listCollectionArticle();
    public WebResponse collectArticle(Integer artId);

    List<ArticleListVo> searchArt(String keywords);
}
