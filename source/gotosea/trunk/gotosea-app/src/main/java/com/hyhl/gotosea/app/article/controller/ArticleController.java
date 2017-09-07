package com.hyhl.gotosea.app.article.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.article.service.ArticleService;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.vo.ArticleListVo;
import com.hyhl.gotosea.core.article.vo.ArticleVo;
import com.hyhl.gotosea.core.common.page.Pager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/rest/art")
public class ArticleController {

    @Resource
    private ArticleService articleService;

//    /**
//     * 根据用户标签返回推荐的文章列表
//     * @return
//     */
//    @ResponseBody
//    @RequestMapping(value = "/recarts",method = RequestMethod.GET)  //recommendArticles
//    public WebResponse listRecArts(){
//        return new WebResponse("success","",articleService.listRecArts());
//    }


    /**
     * 收藏文章
     * @param artId
     * @return
     */
    @Login
    @ResponseBody
    @RequestMapping(value = "/collect/{artId}",method = RequestMethod.POST)
    public WebResponse collectArticle(@PathVariable("artId") Integer artId){
        return articleService.collectArticle(artId);
    }

    /**
     * 获取收藏的文章列表
     * @return
     */
    @Login
    @ResponseBody
    @RequestMapping(value = "/collection",method = RequestMethod.GET)
    public Pager listCollectionArticle(){
        return articleService.listCollectionArticle();
    }

    /**
     * 通过文章id获取文章
     * @param artId
     * @return
     */
    @RequestMapping(value = "/{artId}",method = RequestMethod.GET)
    public String getArtById(@PathVariable(value = "artId",required = true) Integer artId,Model model){
        ArticleVo articleVo =  articleService.getArtById(model,artId);
        model.addAttribute("article",articleVo);
        return "/article";
    }

    /**
     * 为一篇文章点赞
     * @param artId 文章id
     * @return
     */
    @Login
    @ResponseBody
    @RequestMapping(value = "/thumb/{artId}",method = RequestMethod.POST)
    public WebResponse thumbArt(@PathVariable(value = "artId",required = true) Integer artId){
        return articleService.thumbArt(artId);
    }

    /**
     * 根据业务id获取文章列表
     * @param bizId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/biz/{bizId}",method = RequestMethod.GET)
    public Pager getArtsByBizId(@PathVariable(value = "bizId",required = true) Integer bizId) throws Exception {
        return articleService.getArtsByBizId(bizId);
    }

    /**
     * 搜索文章(首页)
     * @param keywords
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/search/{keywords}")
    public List<ArticleListVo> searchArt(@PathVariable(value = "keywords",required = true) String keywords){
        return articleService.searchArt(keywords);
    }
}
