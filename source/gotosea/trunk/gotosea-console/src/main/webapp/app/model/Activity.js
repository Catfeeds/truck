Ext.define('Rich.model.Activity',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
	{name:'id',type:'int'},// 唯一的 不在界面显示
	
	'activityTitle',//活动标题

	'destination',//目的地（id转string）
	
	{name:'activityDays',type:'int'},//活动天数
	
	'summary',//活动概要
	
	'beginDate',//开始日期
	
	'endDate',//结束日期
	
	'gatherTime',//开始日期
	
	{name:'minCustomers',type:'int'},//最少人数
	
	{name:'maxCustomers',type:'int'},//最多人数
	
	'status',//0--待发布 1--已发布  2--已确认  3--已下订待出行 4--行程中 5--已结束 100-已撤销  
            
    'statusName'//状态名称
	]
});