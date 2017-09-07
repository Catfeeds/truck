﻿/*
 * 渔获详情窗体
 * */
Ext.define('Rich.view.freshcatch.FishCatchDetailWindow',{
	requires:['Rich.view.freshcatch.FishCatchForm'],
    extend: 'Rich.widget.Window',
    alias:'widget.fishcatchdetailwindow',
    uses:[],
    //resizable:false,
    minWidth:300,
    minHeight:200,
    autoScroll:true,
    title:'渔获 ',
     
    id:null,
    showById:function(id){
    	this.Id = id;
    	this.show();
    },
    
   	initComponent:function(){
    	var me = this;
    	Ext.apply(me,{
    		autoScroll:true,
    		layout:'fit',
    		items:[{
    			xtype:'tabpanel',
    			deferredRender:false,
    			items: [{
    				itemId:'fishcatchform',
    				title:'渔获详情',
    				xtype:'fishcatchform',
    				showFn:function(){
    					var id = this.up('window').Id;
    					this.loadById(id);
    				},
    				buttons:['->','u']
    			}]
    		}]
    	});
    	me.callParent(arguments);
    }
});