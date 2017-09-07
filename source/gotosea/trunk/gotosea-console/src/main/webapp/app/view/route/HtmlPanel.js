﻿/**
 *优惠券详情
 */
Ext.define('Rich.view.route.HtmlPanel',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Ext.panel.Panel',
    alias:'widget.htmlpanel',
    autoScroll:true,
	title:'亮点介绍',
	autoScroll:true,
    
	data:null,
	showById:function(data){
		if(data){
			this.lookupI('itemContent').setValue(data.itemContent);
		}
		this.show();
	},
    initComponent:function(){
    	var me = this;
		
    	Ext.apply(me,{
    		dockedItems:{
    			docked:'top',
    			itemId:'topToolbar',
    			xtype:'toolbar',
    			items:['->']
    		},
    		layout:'fit',
    		items:[{
				xtype:'form',
				itemId:'form',
				cls:'r-highlight-disabled',
		        defaults: {
		            border: false,
		            xtype: 'panel',
		            flex: 1,
		            layout: 'anchor',
		            defaults:{
		            	anchor: '100%'			            
		            }
		        },
		        layout: 'hbox',
			    items: [{
		        	itemId:'leftCt',
		        	margin:'10 10 10 10',	        	
		            items: [{
	    	            xtype:'htmleditor',
		            	fieldLabel:(this.tid == 1?'亮点介绍':(this.tid == 2?'行程安排':(this.tid == 3?'费用说明':'出行须知'))),
		            	allowBlank:false,
		            	name:'itemContent',
		            	url:Rich.Url.upLoadProdPath,
		            	itemId:'itemContent',
		            	height:400,
		            	flex:1
		            }]
				}]
    		}]
    	});
    	me.callParent(arguments);
    }
});