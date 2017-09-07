package com.hyhl.gotosea.core.article.dao;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.apache.ibatis.annotations.Param;

public interface ArticleReaderMapper{
    public void readArticle(@Param("custId") String custId,@Param("artId")Integer artId);
}
