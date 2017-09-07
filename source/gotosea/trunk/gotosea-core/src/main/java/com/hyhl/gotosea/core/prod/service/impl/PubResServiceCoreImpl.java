package com.hyhl.gotosea.core.prod.service.impl;

import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.prod.po.PubResource;
import com.hyhl.gotosea.core.prod.service.PubResServiceCore;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PubResServiceCoreImpl extends BaseServiceImpl<PubResource> implements PubResServiceCore {
}
