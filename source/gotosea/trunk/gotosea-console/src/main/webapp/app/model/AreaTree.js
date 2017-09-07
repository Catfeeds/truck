Ext.define('Rich.model.AreaTree',{
    extend: 'Ext.data.TreeModel',
    idProperty: 'key',
    fields:[{
		name: "key",
		type:'int'
	},{name:'text',type:'string',convert:function(v, record){
    		var oi = record.get('value');
    	}
    },{name:'children',type:'auto',convert:function(v, record){
    		return record.get('items');
    	}
    },{name:'leaf',type:'boolean',convert:function(v, record){
    		var its = record.get('items');
    		if(its == null){
    			return true;
    		}
    		return false;
    	}
    },{
		name: "value",
		type:'string'
	},{
		name: "items",
		type:'auto'
	}]
});
