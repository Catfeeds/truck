Ext.define('Rich.model.Merchant',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    'custId',//客户id
    
    'realName',//真实姓名
    
    'idType',//证件名
    
    'idNum',//证件号码
    	
	'merchant',// 商家名称
	
	'phone',//商家电话
	
	{name:'areaId',type:'int'},//商家归属区域
	
	{name:'locatorId',type:'int'},//定位点
	
	'address'//商家地址

    ]
    
});