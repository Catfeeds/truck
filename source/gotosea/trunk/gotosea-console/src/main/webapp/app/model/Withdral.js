Ext.define('Rich.model.Withdral',{
    extend: 'Ext.data.Model',
    idProperty: 'userName',
    fields:[
    	{name:'id',type:'int'},
    	
    	'custId',//申请人ID
    	
    	'reqMoney',//提现金额
    	
    	'reqTime',//申请时间
    	
    	'cardId',//银行卡的ID
    	
    	{name:'status',type:'int'},//状态 1已提交待审核   2--已审核待处理
		
    	'realName',//真实姓名
    	
    	'phone',//手机号
    	
    	'cardNo',//卡号
    	
    	'accountName',//持卡人姓名
    	
    	'cardTypeName',//卡的名称
    	
    	'totalMoney',//余额
    	
    	{name:'cardType',type:'int'},
    	
    	'prePayMoney'//提现金额
    	 ]
});
