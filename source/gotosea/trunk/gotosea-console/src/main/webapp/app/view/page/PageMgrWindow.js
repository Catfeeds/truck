﻿/*
 * 钓点管理窗体
 * */
Ext.define('Rich.view.page.PageMgrWindow',{
	requires:[
	'Ext.form.field.ComboBox',
	'Rich.view.page.RecommendForm',
	'Rich.view.page.KeywordForm',
	'Rich.view.page.BannerForm'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.pagemgrwindow',
    uses:['Rich.view.wharf.WharfForm'],
    minWidth:300,
    minHeight:200,
    autoScroll:true,
    title:'推荐详情',
    
    fId:null,
    type:null,
    it:null,
    showById:function(fId,it){
    	this.fId = fId;
    	this.it = it;
    	this.show();
    },
    initComponent:function(){
    	var me = this;
    	var tp = me.type;
    	var itms =  [];
    	 if(tp == 2){
    		itms.push({
				itemId:'recommendform',
				//title:'线路详情',
				xtype:'recommendform',
				buttons:['->','u'],
				showFn:function(){
					var fid = this.up('window').fId;
					var tid = this.up('window').it;
					this.loadById(fid,tid);
				}
			});
    	 }
    	Ext.apply(me,{
    		layout:'fit',
    		items:itms
    	});
    	me.callParent(arguments);
    }
});