Ext.define('Rich.model.Org',{
    extend: 'Ext.data.TreeModel',
    idProperty: 'orgId',
    parentIdProperty:'parentId',
    fields:[{
		name: "orgId",
		type:'string'
	},{
		name: "seq",
		type:'string'
	},{
		name: "remark",
	 	type:'string'
	},{
		name: "parentId",
		type:'string'
	},{
		name:'typeDesc',
		type:'string'
	},{
		name:'typeName',
		type:'string'
	},{
		name:'name',
		type:'string'
	},{
		name:'num',
		type:'int'
	},{
		name:'id',
		type:'int'
	},{
		name: "itemCode",
		type:'string'
	},{
		name: "curMax",
		type:'int'
	},{
		name: "key",
		type:'int'
	},{
		name: "value",
		type:'string'
	}]
});
