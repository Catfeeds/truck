package com.hyhl.gotosea.console.article.controller;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.article.service.ArticleService;
import com.hyhl.gotosea.console.system.permission.ExtPermission;
import com.hyhl.gotosea.console.system.permission.ExtPermissionEumn;
import com.hyhl.gotosea.core.article.dto.ArticleDto;
import com.hyhl.gotosea.core.article.po.Article;
import com.hyhl.gotosea.core.article.po.SearchCond;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping("/rest/art")
public class ArticleController {

    @Resource
    private ArticleService articleService;


    /**
     * 通过条件获取所有文章
     * @return 
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.文章列表})
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public WebResponse listArts(SearchCond searchCond){
        return new WebResponse(articleService.listArtByCond(searchCond));
    }


    /**
     * 通过文章id获取文章
     * @param artId
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.文章详情})
    @RequestMapping(value = "/{artId}",method = RequestMethod.GET)
    public WebResponse getArtById(@PathVariable(value = "artId",required = true) Integer artId){
        return new WebResponse(articleService.getArtById(artId));
    }

    /**
     * 创建文章
     * @param articleDto   校验对象
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.文章新增})
    @RequestMapping(value = "",method = RequestMethod.POST)
    public WebResponse createArt(@RequestBody @Valid ArticleDto articleDto){
        return articleService.createArt(articleDto);
    }


    /**
     * 更新文章
     * @return
     */
    @ExtPermission()
    @RequestMapping(value = "",method = RequestMethod.PUT)
    public WebResponse updateArt(@RequestBody  ArticleDto articleDto){
        return articleService.updateArt(articleDto);

    }


    /**
     * 修改文章业务类型
     * @param articleDto 文章id
     * @return
     */
//    @RequestMapping(value = "/cngBiz",method = RequestMethod.PUT)
//    public WebResponse cngBiz(ArticleDto articleDto){
//        articleService.updateArt(articleDto);
//        return new WebResponse("200","修改文章业务类型成功");
//    }


    /**
     *  批量删除文章
     * @return
     */
    @ExtPermission(values={ExtPermissionEumn.文章删除})
    @RequestMapping(value = "",method = RequestMethod.DELETE)
    public WebResponse deleteArts(/*@RequestParam(value = "artIds[]",required = true)*/ @RequestBody Article[] arts/*Delete[] artIds*/){
        articleService.deleteArts(arts);
        return new WebResponse().returnMsg("删除文章成功");
    }

}
