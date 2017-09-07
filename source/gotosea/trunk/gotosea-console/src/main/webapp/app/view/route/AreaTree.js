Ext.define('Rich.view.route.AreaTree', {
	requires:['Rich.JsonAjax',"Rich.store.AreaTreeStore"],
    extend: 'Ext.tree.Panel',
    alias:'widget.areatree',
    uses:[],
	bodyStyle:'overflow:hidden',
    rootVisible: false,
    lines: true,
    singleCheck:false,//单checked模式
    customColumn:false,
    displayField:'value',
    initComponent:function(){
    	var me = this;
    	var store = me.store;
    	if (!store || !store.isStore){
           store = me.store = new Rich.store.AreaTreeStore({
           		autoLoad:true,
           	    folderSort: true,
			    sorters: [{
			         property: 'seq',
			         direction: 'ASC'
			    }]
           });
    	}
    	me.callParent(arguments);
    	setTimeout(function(){
    		//me.refresh();
    	},50);
    },
	
	
	deleteSelect:function(){
		var ss = this.getSelectionModel().getSelection();
		if(ss.length > 0){
			var rec = ss[0];
			var id = rec.get('id');
			this.deleteId = id;
			Ext.Msg.confirm('提示','确定删除这个节点?',function(btn){
				if (btn == 'yes'){
			    	this.el.mask('...');
	        		Rich.JsonAjax.request({
	        			method:'DELETE',
    	        		url:Rich.Url.dictionaryDeletePath+this.deleteId,
    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
    	        		callback:this.deleteSelectBack,
    	        		scope:this
	        		});
				}
	        },this);
	        
		}else{
			Rich.Msg.alert('提示','请先选择删除节点!');
		}
	},
	deleteSelectBack:function(o,f,r){
		if(f){
			this.el.unmask();
			this.refresh();
		}
		
	}
});