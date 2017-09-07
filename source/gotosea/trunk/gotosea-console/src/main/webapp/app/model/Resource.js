Ext.define('Rich.model.Resource',{
    extend: 'Ext.data.Model',
    idProperty: "resId",
    fields:[{
		name: "resId",
		type:'string'
	},{
		name: "resName",
		type:'string'
	},{
		name: "resDesc",
		type:'string'
	},{
		name: "groupName",
		type:'string'
	},{
		name:'resAddDele',
		type:'int'
	},{
		name: "creater",//单独查询，没有值，查询组织权限，指的是加入者
		type:'string'
	},{
		name: "createTime",//单独查询，没有值，查询组织权限，指的是加入时间
		type:'string'
	}
	
	]
});