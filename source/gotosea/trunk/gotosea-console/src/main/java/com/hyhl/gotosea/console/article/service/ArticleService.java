
package com.hyhl.gotosea.console.article.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.article.dto.ArticleDto;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.po.SearchCond;
import com.hyhl.gotosea.core.article.vo.ArticleListVo;
import com.hyhl.gotosea.core.article.vo.ArticleVo;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.BaseService;

import java.util.List;

public interface ArticleService extends  BaseService<Article>{
    public WebResponse createArt(ArticleDto articleDto);
    public void deleteArts(Article []arts);
    public WebResponse updateArt(ArticleDto articleDto);
    public Pager listArtByCond(SearchCond searchCond);
    public ArticleVo getArtById(Integer artId);
}