Ext.define('Rich.controller.ViewManager', {
    extend: 'Ext.app.Controller',
    //requires: [],
    //stores: [],
    //alias: 'controller.main',
    
    refs: [{
	        ref: 'navigation',
	        selector: '#navigation'
	    },{
	        ref: 'center',
	        selector: 'tabpanel'
	    }
	],
    control: {
        'viewport > treepanel': {
        	itemclick: 'onTreeNavClick'//selectionchange:onTreeNavSelectionChange
        },
        'viewport > tabpanel': {
        	tabchange: 'onCenterTabChange'
        }
    },
    routes:{
    	':id': {
            action: 'handleRoute',
            before: 'beforeHandleRoute'
        }
    },
    beforeHandleRoute: function(id, action) {
    	var me = this,
        node = Ext.StoreMgr.get('navigation').getNodeById(id);
	    if (node) {
	        action.resume();
	    }else{
	    	me.redirectTo('home');
	        action.stop();
	    }
    },
    handleRoute: function(id) {
    	if(id == 'home'){
    		this.toModule('home');
    		return;
    	}
    	var node = Ext.StoreMgr.get('navigation').getNodeById(id);
	    if (node){
	        this.toModule(node.get("id"),node.get("ctype"),node.get("text"));
	    }else{
	    	alert("找不到模块:"+id);
	    }
    },
    toModule:function(id,ctype,text){
    	var cen = this.getCenter();
    	var comp = cen.getComponent(id);
    	if(comp){
    		cen.setActiveItem(comp);
    	}else{
    		Ext.require(ctype,function(){
    			var cd = Ext.create(ctype,{
        			closable:true,
        			itemId:id,
        			title:text
        		});
    			this.add(cd);
    			this.setActiveItem(cd);
    		},cen);
    	}
    },
    onTreeNavClick:function(me,record,item,index,e,eOpts){
        if(record.get('leaf')){
        	Rich.Relax.lazy(200,this,'redirectTo',record.getId());
		}
    },
    onTreeNavSelectionChange: function(selModel, records) {
    	//debugger
        var record = records[0];
        if(record.get('leaf')){
        	//this.redirectTo(record.getId());
		}
        /*
        if (record && !record.isRoot()) {
            this.redirectTo(record.getId());
        }
        */
    },
    onCenterTabChange : function(tb, newC, oldC, e){
    	if(!Rich.view.Viewport.linkTab){
			var tp = tb.up('viewport').lookupI('treepanel');
			var rc = tp.getStore().getById(newC.getItemId());
			if(rc){
				tp.expandNode(rc,true);
				tp.getSelectionModel().select(rc);
			}
		}
    }
});
