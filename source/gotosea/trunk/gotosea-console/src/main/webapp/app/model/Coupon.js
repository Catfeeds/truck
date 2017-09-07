Ext.define('Rich.model.Coupon',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    	{name:'id',type:'int',defaultValue:0},// 唯一的 不在界面显示
    	
    	'amount',//金额
    	
    	'name',//优惠劵名称
    	
    	{name:'applyScopeId',type:'int'},//使用范围关联ID
    	
    	{name:'consumptionMin',type:'int'},//消费下限

    	{name:'couponTypeId',type:'int'},//优惠卷类型关联ID
    	
    	{name:'marketingActivityId',type:'int'},//营销活动关联ID

    	{name:'planNum',type:'int'},//计划发行数量

    	{name:'status',type:'int'},//状态 '0--失效，1--生效',
    	
    	{name:'suppliedNum',type:'int'},//已发行数量
    	
    	{name:'validityMonths',type:'int'}//有效月份
    ]
    
});