﻿/*
 * 线路详情窗体
 * */
Ext.define('Rich.view.route.RouteAddWindow',{
	requires:[
		'Rich.widget.Message',
		'Rich.component.DicComboBox',
		'Ext.button.Split',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
        'Ext.form.FieldSet',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.component.FieldSet',
        'Rich.ux.HtmlEditor',
        'Rich.component.FileUpload', 
        'Ext.form.field.Checkbox',
        'Ext.form.field.File',
        'Rich.view.route.HtmlPanel',
        'Rich.view.route.BasePanel',
        'Rich.store.AreaTreeStore'
	  ],
    extend: 'Rich.widget.Window',
    alias:'widget.routeaddwindow',
    width:0.8,
    height:0.8,
    minWidth:400,
    minHeight:400,
    autoScroll:true,
    title:'新增服务 ',
    
   	initComponent:function(){
   		var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"否"},
		        {"abbr":"1", "name":"是"}
		    ]
		});
		
		var store = Ext.create('Ext.data.Store',{
			autoLoad:true,
			fields: ['abbr', 'name'],
			data : [
				{"abbr":"2001", "name":"海岛游"},
		        {"abbr":"2002", "name":"海钓"}
		    ]
		});
		var store3 = Ext.create('Ext.data.Store',{
			fields: ['id','name'],
			proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.routeTagPath,	
		        reader: {
		            type: 'json',
		            rootProperty:'data'
		        }
		    },
		    autoLoad:true
		});
		
		var store1 = Ext.create('Ext.data.Store',{
			fields: ['key','value'],
			proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.routeUnitPath,	
		        reader: {
		            type: 'json',
		            rootProperty:'data'
		        }
		    },
		    autoLoad:true
		});
		
    	var me = this;
    	Ext.apply(me,{
    		autoScroll:true,
    		layout:'fit',
    		items:[{
    			xtype:'tabpanel',
    			itemId:'all',
    			deferredRender:false,
    			items: [{
    				itemId:'base',
					title:'基本信息',
					xtype:'basepanel',
					showFn:function(){
						this.showById();
					}
    			},{
					itemId:'light',
					title:'亮点介绍',
					xtype:'htmlpanel',
					tid:1,
					showFn:function(){
						this.showById();
					}
    			},{
    				itemId:'result',
					title:'行程安排',
					xtype:'htmlpanel',
					tid:2,
					showFn:function(){
						this.showById();
					}
    			},{
    				itemId:'explain',
					title:'费用说明',
					xtype:'htmlpanel',
					tid:3,
					showFn:function(){
						this.showById();
					}
				},{
    				itemId:'know',
					title:'出行须知',
					xtype:'htmlpanel',
					tid:3,
					showFn:function(){
						this.showById();
					}
    			}],
    			buttons:['->',{
    			text:'提交',
    			handler:function(){
    				this.up('window').getFormValues();
    				}
    			}]
    		}]
    	});
    	me.callParent(arguments);
    },
    getFormValues:function(){
    	var vas = this.lookupI('base').getForm().getValues()
    	var light = this.lookupI('light').lookupI('form').getForm().getValues();
    	var result = this.lookupI('result').lookupI('form').getForm().getValues();
    	var explain = this.lookupI('explain').lookupI('form').getForm().getValues()
    	var know = this.lookupI('know').lookupI('form').getForm().getValues();
    	if(!this.lookupI('base').getForm().isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
		vas.infos = [{seq:1,itemContent:light.itemContent,itemName:'亮点介绍'},
			{seq:2,itemContent:result.itemContent,itemName:'行程安排'},
			{seq:3,itemContent:explain.itemContent,itemName:'费用说明'},
			{seq:4,itemContent:know.itemContent,itemName:'出行须知'}];
		var carouselPics = '';
		if(vas.carouselPic){
			if(Ext.isArray(vas.carouselPic) && vas.carouselPic.length >= 0){
				for(var i = 0;i<vas.carouselPic.length;i++){
		    		if(vas.carouselPic[i]){
			    		if(i == 0){
			    			carouselPics = vas.carouselPic[i];
			    		}else{
			    			carouselPics += ','+vas.carouselPic[i];
			    		}
		    		}
		    	};
			}else{
				carouselPics = vas.carouselPic;
			}
		}
		vas.marketPrice = vas.marketPrice*100;
		vas.preferPrice = vas.preferPrice*100;
		vas.costPrice = vas.costPrice*100;
		vas.carouselPics = carouselPics;
		var va = Ext.encode(vas);
		Rich.JsonAjax.request({
			method:'post',
    		url:Rich.Url.routeAddPath,
    		params:va,
    		headers:{'Content-Type':'application/json;charset=UTF-8'},
    		callback:this.upStateBack,
    		scope:this
		});
    },
    upStateBack:function(o,f,r){
    	if(f){
    		this.close(true);
			this.returnValue(f);
    	}
    }
});