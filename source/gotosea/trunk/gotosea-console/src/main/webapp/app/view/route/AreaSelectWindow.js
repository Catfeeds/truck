/*
 * 车辆选择窗体
 * */
Ext.define('Rich.view.route.AreaSelectWindow',{
	requires:['Rich.view.route.AreaTree'],
    extend: 'Rich.widget.Window',
    alias:'widget.areaselectwindow',
    width:360,
    height:400,
    minWidth:360,
    minHeight:300,
    layout:'fit',
    autoScroll:true,
    title:'选择目的地',
    singleCheck:false,
    initComponent:function(){
    	var me = this;
    	var singleCk = this.singleCheck?true:false;
    	Ext.apply(me,{
    	    items:[{
    	    	xtype:'areatree',
				itemId:'areatree'
    	    }],
    	    buttons:[{
    	    	text:'刷新',
    	    	hidden:true,
    	    	handler:function(btn){
    	    		var win = btn.up('areaselectwindow');
    	    		var tree = win.getItem('areatree');
    	    		tree.refresh();
    	    	}
    	    },'->',{
    	    	text:'确定',
    	    	handler:function(btn){
    	    		var win = btn.up('areaselectwindow');
    	    		var tree = win.getComponent('areatree');
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
    	    		btn.up('areaselectwindow').close();
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