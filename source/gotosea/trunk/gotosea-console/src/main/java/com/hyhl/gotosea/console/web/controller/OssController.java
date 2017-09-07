package com.hyhl.gotosea.console.web.controller;

import com.hfocean.common.oss.service.OssService;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.oss.PathEnum;
import com.hyhl.gotosea.core.common.oss.PathHandler;
import com.hyhl.gotosea.core.common.oss.PictureEnum;
import com.hyhl.gotosea.core.util.PrimaryKeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import java.io.ByteArrayInputStream;
import java.util.Map;
import java.util.Objects;


@RestController
@RequestMapping("oss")
public class OssController {
	
    @Autowired
    private OssService ossService;

    /**
     * 单文件上传
     * @return
     * @throws Exception
     */
    @RequestMapping("/single/upload")
    public WebResponse uploadFile(MultipartFile file) throws Exception{
        if(null==file)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"请选择文件上传");
        //取得当前上传文件的文件名称
        String fileName = file.getOriginalFilename();
        Map<String, Object> result;
        try {
            result = ossService.uploadByName(file.getInputStream(), fileName);
        } catch (Exception e) {
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"上传文件失败");
        }
        return new WebResponse(result);
    }

    /**
     * 上传base64字符串
     * @return
     * @throws Exception
     */
    @RequestMapping("/attach/upload")
    public WebResponse uploadFileByBase64(String file,String fileName) throws Exception{
        Assert.hasText(file,"上传文件不能为空");
        Assert.hasText(fileName,"文件名不能为空");
        return new WebResponse(ossService.uploadByName(new ByteArrayInputStream(new BASE64Decoder().decodeBuffer(file)), fileName));
    }

    /**
     * 上传文章图片
     * @return
     * @throws Exception
     */
    @RequestMapping("/article/image")
    public WebResponse uploadArticleImage(MultipartFile file) throws Exception{
        if(null==file)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"请选择文件上传");
        Map<String, Object> result;
        try {
            //取得当前上传文件的文件名称
            String fileName = file.getOriginalFilename();
            String suffix = PathHandler.suffix(fileName);
            Assert.isTrue(PictureEnum.allowdIf(suffix),"上传图片格式不对");
            String path = PathHandler.getStorePath(PathEnum.ARTICLE_IMAGE, PrimaryKeyGenerator.generate()+suffix);
            result = ossService.uploadByPath(file.getInputStream(), path);
            result.put("srcName",fileName);//原文件名称
        } catch (Exception e) {
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"上传文件失败,原因："+e.getMessage());
        }
        return new WebResponse(result);
    }

    /**
     * 上传产品资源图片
     * @return
     * @throws Exception
     */
    @RequestMapping("prod/image")
    public WebResponse uploadProdImage(MultipartFile file) throws Exception{
        if(null==file)throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"请选择文件上传");
        Map<String, Object> result;
        try {
            //取得当前上传文件的文件名称
            String fileName = file.getOriginalFilename();
            String suffix = PathHandler.suffix(fileName);
            Assert.isTrue(PictureEnum.allowdIf(suffix),"上传图片格式不对");
            String path = PathHandler.getStorePath(PathEnum.PROD_IMAGE, PrimaryKeyGenerator.generate()+suffix);
            result = ossService.uploadByPath(file.getInputStream(), path);
            result.put("srcName",fileName);//原文件名称
        } catch (Exception e) {
            throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"上传文件失败,原因："+e.getMessage());
        }
        return new WebResponse(result);
    }

}
