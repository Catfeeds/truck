package com.hyhl.gotosea.core.article.dao;

import com.hyhl.gotosea.core.article.dto.ArticleDto;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.po.SearchCond;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleMapper extends MyMapper<Article> {
    public void createArt(ArticleDto articleDto);
    public void updateArt(@Param("articleDto") ArticleDto articleDto);
    public void cngBiz(@Param("artId") Integer artId,@Param("bizId") Integer bizId);
    public void deleteArts(@Param("artIds") List<Integer> artIds);
    public List<Article> getArtByTags(@Param("tags") List<Integer>tags);
    public Article getArtById(Integer id);
    public List<Article> selectAll();
    public void readArticle(Integer artId);
    public void thumbArticle(Integer artId);
    public List<Article> listArtByCond(@Param("searchCond") SearchCond searchCond);
}
