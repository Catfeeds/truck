package com.hyhl.gotosea.community.cust.service;

import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.core.common.service.BaseService;
import com.hyhl.gotosea.core.cust.po.Cust;

public interface CommCustService extends BaseService<Cust>{
    public WebResponse custContact(String starId);
    public WebResponse custCenter();

    WebResponse custInfo(String custId) throws Exception;

    WebResponse custContactList(String custId);
}
