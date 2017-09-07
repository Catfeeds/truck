Ext.define('Rich.model.Route',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    	{name:'id',type:'int'},
    	
    	'name',//服务名称
    
    	'code',//编号
    	
    	'createTime',//创建时间

    	{name:'type',type:'int'},//1 海岛游  2 海钓租船  3 饵料 4 住宿 5餐饮
    	
    	{name:'status',type:'int'}
    ]
    
});