/**
 * 
 */
Ext.define('Rich.store.AreaTreeStore',{
	requires:['Rich.model.AreaTree','Rich.Url'],
    extend: 'Ext.data.TreeStore',
    alias:'store.areatreestore',
	model:'Rich.model.AreaTree',
	proxy:{
		type: 'memory'
	},
    statics:{
         getRecordById: function(id) {
             var sto = Rich.store.AreaTreeStore.instance;
             return sto.getNodeById(id);
         }
    },
    constructor: function(config){
    	var me = this;
    	
    	Ext.apply(config,{
    		
            
    	});
    	me.callParent(arguments);
    	
    	if(this.autoLoad){
    		this.refresh();
    	}
    },
    refresh:function(){
		//this.setLoading(' ');
		Rich.JsonAjax.request({
			url:Rich.Url.routeAreaPath,
			callback:this.refreshBack,
			scope:this
		});
	},
	refreshBack:function(o,f,r){
		//this.setLoading(false);
		if(f){
			var res = r.responseJson.data;
			//var oks = []
			//this.makeTree(oks,null,res);
			var nodeData = {key:-1,value:'选择',items:res,expended:true};
			this.setRootNode(nodeData);
		}
	}
},function(cls){
	Rich.store.AreaTreeStore.instance = new Rich.store.AreaTreeStore({
		autoLoad:true
	});
});