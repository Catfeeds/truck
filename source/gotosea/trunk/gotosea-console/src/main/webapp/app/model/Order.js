Ext.define('Rich.model.Order',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    	{name:'id',type:'int'},
    	
    	'orderNo',//订单编号
    	
    	'name',//姓名
    	
    	'serviceDate',//出行时间
    	
    	'createTime',//创建时间
    	
    	'status',//0不可用，1可用
    	
    	'merchant',
    	
    	'serviceTypeId',//线路类型
    	
    	'payFee'//实收金额
    ]
});