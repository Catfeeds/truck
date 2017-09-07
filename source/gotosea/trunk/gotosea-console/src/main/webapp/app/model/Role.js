Ext.define('Rich.model.Role',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    	{name:'id',type:'string',convert:function(v, record){
    		var oi = record.get('orgId');
    		var ri = record.get('roleId');
    		if(oi){
    			return ri+"_"+oi;
    		}
    		return ri;
    	}},
    	'roleId',
   		'roleName',
        'creater',//单独查询，指的是角色创建者。查询组织角色，指的是关系创建者
        'createTime',//单独查询，指的是角色创建时间。查询组织角色，指的是关系创建时间
        'orgId',
        'orgName',
        {name:'status',type:'int'}
    ]
});