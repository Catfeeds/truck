package com.hyhl.gotosea.console.prod.service.impl;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.MerchResourceService;
import com.hyhl.gotosea.core.common.annotation.Locator;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.mapper.MerchantMapper;
import com.hyhl.gotosea.core.cust.po.Merchant;
import com.hyhl.gotosea.core.local.mapper.TLocatorMapper;
import com.hyhl.gotosea.core.local.po.TLocator;
import com.hyhl.gotosea.core.prod.dto.MerchResourceDelDto;
import com.hyhl.gotosea.core.prod.dto.MerchantResourceDto;
import com.hyhl.gotosea.core.prod.mapper.MercResoTypeMapper;
import com.hyhl.gotosea.core.prod.mapper.MerchantResourceMapper;
import com.hyhl.gotosea.core.prod.po.MerchResCond;
import com.hyhl.gotosea.core.prod.po.MerchantResource;
import com.hyhl.gotosea.core.prod.po.MerchantResourceType;
import com.hyhl.gotosea.core.prod.vo.MercResVo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MerchResourceServiceImpl extends BaseServiceImpl<MerchantResource> implements MerchResourceService{

    @Resource
    private MerchantResourceMapper merchantResourceMapper;
    @Resource
    private MercResoTypeMapper mercResoTypeMapper;
    @Resource
    private TLocatorMapper locatorMapper;
    @Resource
    private MerchantMapper merchantMapper;


    @Override
    public WebResponse listMerchResource(MerchResCond merchResCond) {
        Pager<MerchantResource> pager = selectByPage(new PageExcute<MerchantResource>() {
            @Override
            public List<MerchantResource> excute() {
                return merchantResourceMapper.selectByCond(merchResCond);
            }
        });
        if (pager.getContent() !=null && pager.getContent().size()>0)
            pager.setContent(mercResToVo(pager.getContent()));
        else
            pager.setContent(null);
        return new WebResponse("success","",pager);
    }

    @Override
    public WebResponse deleteMerchResource(MerchResourceDelDto merchResourceDelDto) {
        merchantResourceMapper.updateStatus(merchResourceDelDto.getIds(),merchResourceDelDto.getStatus());
        return new WebResponse("success","操作成功");
    }

    @Override
    public WebResponse updateMerchResource(MerchantResource merchantResource) {
        merchantResourceMapper.updateByPrimaryKeySelective(merchantResource);
        return new WebResponse("success","更新成功");
    }

    @Override
    public WebResponse listMerchResourceType() {
        List<MerchantResourceType> merchantResourceTypes = mercResoTypeMapper.selectAll();
        return new WebResponse("success","",merchantResourceTypes);
    }

    @Override
    public WebResponse createMerchResource(MerchantResourceDto merchantResourceDto) {
        MerchantResource merchantResource = new MerchantResource();
        BeanUtils.copyProperties(merchantResourceDto,merchantResource);
        merchantResource.setCreateTime(new Date());
        merchantResource.setStatus(1);
        merchantResourceMapper.insert(merchantResource);
        return new WebResponse("success","新增成功");
    }

    private List<MercResVo> mercResToVo(List<MerchantResource> merchantResources){
        List<MercResVo> mercResVos = new ArrayList<>();
        for (MerchantResource merchantResource:merchantResources){
            MercResVo mercResVo = new MercResVo();
            BeanUtils.copyProperties(merchantResource,mercResVo);
            TLocator locator = locatorMapper.selectByPrimaryKey(mercResVo.getLocatorId());
            if (locator!=null)
                mercResVo.setLocatorName(locator.getName());
            mercResVo.setMerchantResourceTypeName(
                    mercResoTypeMapper.selectByPrimaryKey(mercResVo.getMerchantResourceTypeId()).getName());
            Merchant merchant = merchantMapper.selectByPrimaryKey(mercResVo.getCustId());
            if (merchant != null){
                mercResVo.setCustName(merchant.getRealName());
            }
            //图片转数组
            String pictures= mercResVo.getPictures();
            if (pictures!=null && pictures.length()>0){
                mercResVo.setPictureArr(pictures.split(","));
            }
            mercResVos.add(mercResVo);
        }
        return mercResVos;
    }
}
