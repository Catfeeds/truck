package com.hyhl.gotosea.console.prod.service.impl;

import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.console.prod.service.BannerService;
import com.hyhl.gotosea.core.common.page.PageExcute;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.dto.BannerDto;
import com.hyhl.gotosea.core.prod.mapper.BannerMapper;
import com.hyhl.gotosea.core.prod.po.Banner;
import com.hyhl.gotosea.core.prod.po.BannerCond;
import com.hyhl.gotosea.core.util.NumberGenerator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.GeneratedValue;
import java.util.Date;
import java.util.List;

@Service
public class BannerServiceImpl extends BaseServiceImpl<Banner> implements BannerService {

    @Resource
    private BannerMapper bannerMapper;

    @Override
    public WebResponse listBanner(BannerCond bannerCond) {
        Pager<Banner> pager =(Pager<Banner>) selectByPage(new PageExcute<Banner>() {
            @Override
            public List<Banner> excute() {
                return bannerMapper.listBanner(bannerCond);
            }
        });
        return new WebResponse("success","",pager);
    }

    /**
     * 创建banner
     * @param bannerDto
     * @return
     */
    @Override
    public WebResponse createBanner(BannerDto bannerDto) {

        Banner banner = new Banner();
        banner.setId( NumberGenerator.getOrderNo(true));
        BeanUtils.copyProperties(bannerDto,banner);
        banner.setCreateTime(new Date());
        banner.setIsHidden((byte)1);    //默认不隐藏
        banner.setIsDelete((byte)0);    //默认不删除
        bannerMapper.insert(banner);
        return new WebResponse("success","添加成功");
    }

    /**
     * 更新banner
     * @param banner
     * @return
     */
    @Override
    public WebResponse updateBanner(Banner banner) {
        if (banner.getIsHidden()!=null){
            //获取要更新的bannner
            Banner oriBanner = bannerMapper.selectByPrimaryKey(banner.getId());

            BannerCond bannerCond = new BannerCond();
            bannerCond.setIsHidden((byte)0);
            List<Banner> banners = bannerMapper.listBanner(bannerCond);
            for (Banner bannerTmp:banners){
                if (bannerTmp.getSortOrder()==banner.getSortOrder())
                    throw new BaseBusinessException("200","存在相同sortOrder");
            }
        }
        bannerMapper.updateByPrimaryKeySelective(banner);
        return new WebResponse("success","更新成功");
    }
}
