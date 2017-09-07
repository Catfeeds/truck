/*
 * 车辆选择窗体
 * */
Ext.define('Rich.view.sys.OrgSelectorWindow',{
	requires:['Rich.view.sys.OrgTree'],
    extend: 'Rich.widget.Window',
    alias:'widget.orgselectorwindow',
    alternateClassName:['Rich.OrgSelectorWindow'],
    //uses:[],
    //resizable:false,
    width:360,
    height:400,
    minWidth:360,
    minHeight:300,
    layout:'fit',
    autoScroll:true,
    title:'选择组织',
    singleCheck:false,
    initComponent:function(){
    	var me = this;
    	var singleCk = this.singleCheck?true:false;
    	Ext.apply(me,{
    	    items:[{
    	    	xtype:'orgtree',
				itemId:'orgtree'
    	    }],
    	    buttons:[{
    	    	text:'刷新',
    	    	hidden:true,
    	    	handler:function(btn){
    	    		var win = btn.up('orgselectorwindow');
    	    		var tree = win.getItem('orgtree');
    	    		tree.refresh();
    	    	}
    	    },'->',{
    	    	text:'确定',
    	    	handler:function(btn){
    	    		var win = btn.up('orgselectorwindow');
    	    		var tree = win.getComponent('orgtree');
    	    		var records = tree.getSelectionModel().getSelection();
    	    		var fn = win.returnFn,scope = win.returnScope;
    	    		win.returnFn = null;
    	    		win.returnScope = null;
    	    		if(fn){
    	    			fn.call(scope||window,records);
    	    		}
    	    		win.close();
    	    	}
    	    },{
    	    	text:'取消',
    	    	handler:function(btn){
    	    		btn.up('orgselectorwindow').close();
    	    	}
    	    }]
    	});
    	me.callParent(arguments);
    	
    },
    //returnFn
    //returnScope
    showFor:function(fn,scope){
    	this.returnFn = fn;
    	this.returnScope = scope;
    	this.show();
    }
});