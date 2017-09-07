package com.hyhl.gotosea.console.cust.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyhl.gotosea.console.cust.service.IWalletService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.cust.po.Wallet;

@Service
@Transactional(readOnly = true, transactionManager = "custTransationManager")
public class WalletServiceImpl extends BaseServiceImpl<Wallet> implements IWalletService {
}
