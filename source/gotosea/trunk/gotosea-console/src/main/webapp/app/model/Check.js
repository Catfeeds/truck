Ext.define('Rich.model.Check',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
	{name:'id',type:'int'},// 唯一的 不在界面显示
	 
	'auditObjectId',//'根据审核类型，填写对应类型的审核对象ID.例如审核类型为1（商家认证），则审核对象ID填写商家的cust_id',
    
	'auditType',// '1--商家认证审核',
	
	'status',// '0--已提交待审核1-审核通 2-审核失败,
    
	'applyRemark',//申请描述
	
	'auditRemark',//认证描述
	
	'applyTime',//申请时间
	
	'auditTime',//认证时间
	
	'idNum',//身份证号码
	
	'phone',//手机号
	
	'realName',//真实姓名
	
	'auditObjectId',//认证id
	
	{name:'auditType',type:'int'},
	
	'auditRemark',//认证说明
	
	'auditTime'	//认证时间

	
	
	
	
	
	
	
	
	
	
	
	
	]
});