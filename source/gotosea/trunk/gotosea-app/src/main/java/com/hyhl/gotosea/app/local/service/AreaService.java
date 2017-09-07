package com.hyhl.gotosea.app.local.service;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.local.po.Area;

import java.util.List;

public interface AreaService extends BaseService<Area>{

    List<Integer> selectAreaIdsByPAreaId(Integer[] pAreaIds);
}
