package com.hyhl.gotosea.console.prod.service;

import com.hyhl.gotosea.console.prod.dto.ThemeDto;
import com.hyhl.gotosea.console.prod.dto.ThemeServeDto;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.prod.po.Theme;

/**
 * @author Leslie.Lam
 * @create 2017-09-06 18:16
 **/
public interface ThemeService extends BaseService<Theme> {

    /**
     * 添加主题
     */
    void addTheme(ThemeDto param);

    /**
     * 修改主题
     */
    void updateTheme(ThemeDto param);

    /**
     * 删除主题
     * @param id
     */
    void delTheme(Integer id);

    /**
     * 添加主题服务
     * @param param
     */
    void addThemeServe(ThemeServeDto param);

    /**
     * 删除主题服务
     * @param id
     */
    void delThemeServe(Integer id);
}
