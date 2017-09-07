﻿/*
 * 订单详情窗体
 * */
Ext.define('Rich.view.route.BasePanel',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Ext.form.Panel',
    alias:'widget.basepanel',
    minWidth:300,
    minHeight:200,
    widthPercent:0.6,
    heightPercent:0.6,
    autoScroll:true,
 
    id:null,
    showById:function(id){
    	this.id = id;
    	this.show();
    },
    
    initComponent:function(){
    	var me = this;
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
		
		var destination = Ext.create('Ext.data.Store',{
			fields: ['key','value'],
			proxy: {
		        type: 'ajax',	       
		       	url:Rich.Url.shipTagTypePath+'1001',	
		        reader: {
		            type: 'json',
		            rootProperty:'data'
		        }
		    },
		    autoLoad:true
		});
		
		
    	Ext.apply(me,{
    		layout:'fit',
    		dockedItems:{
    			docked:'top',
    			itemId:'topToolbar',
    			xtype:'toolbar',
    			items:['->']
    		},
    		items:[{
				xtype:'form',
				itemId:'form',
				cls:'r-highlight-disabled',
				autoScroll:true,
		        defaults: {
		            border: false,
		            xtype: 'panel',
		            flex: 1,
		            layout: 'anchor',
		            defaults:{
		            	anchor: '80%'			            
		            }
		        },
		        layout: 'hbox',
		        items: [{xtype:'box',flex:0.1},{
		        	defaults:{anchor: '100%'},
		            items: [{
		            	xtype:'hiddenfield',
		            	name:'id'
		            },{
		            	xtype:'combo',
		            	name:'serviceTypeId',
		            	displayField: 'name',
		            	store:store,
		            	allowBlank:false,
	    	    		editable:false,
		            	queryMode:'local',
					    valueField: 'abbr',
		            	fieldLabel:'服务类型'
		            },{
		            	xtype:'combo',
		            	name:'businessUnitId',
		            	displayField: 'value',
		            	store:store1,
		            	allowBlank:false,
	    	    		editable:false,
		            	queryMode:'remote',
					    valueField: 'key',
		            	fieldLabel:'业务板块类型'
		            },{
		            	xtype:'textfield',
		            	name:'name',
		            	allowBlank:false,
		            	fieldLabel:'服务名称'
		            },{
		            	xtype:'hiddenfield',
		            	name:'areaId'
		            },{
				        fieldLabel:'目的地',
				        name:'destination',
				        itemId:'destination',
	    	    		xtype:'combo',
	    	    		store:destination,
	    	    		allowBlank:false,
	    	    		editable:false,
	    	    		valueField: 'id',
						displayField: 'name',
	    	    		emptyText:'请选择目的地'
		            },{
	    	            xtype : 'fieldcontainer',
	    	            fieldLabel:'默认定价',
	    	            layout: 'hbox',
	    	            items: [{
			            	xtype:'numberfield',
			            	name:'marketPrice',
			            	flex:1,
			            	allowBlank:false,
			            	labelWidth:50,
			            	minValue: 0,
			            	emptyText:'单位(元)',
			            	decimalPrecision:2,
			            	fieldLabel:'市场价'
			            },{
			            	padding:'0 0 0 10',
			            	xtype:'numberfield',
			            	name:'preferPrice',
			            	decimalPrecision:2,
			            	minValue: 0,
			            	labelWidth:50,
			            	emptyText:'单位(元)',
			            	flex:1,
			            	allowBlank:false,
			            	fieldLabel:'优惠价'
			            },{
			            	padding:'0 0 0 10',
			            	xtype:'numberfield',
			            	name:'costPrice',
			            	decimalPrecision:2,
			            	emptyText:'单位(元)',
			            	labelWidth:50,
			            	minValue: 0,
			            	flex:1,
			            	allowBlank:false,
			            	fieldLabel:'成本价'
			            }]
	            	},{
	            		xtype:'textfield',
	            		fieldLabel:'显示价格',
	            		allowBlank:false,
	            		name:'price'
	            	},{
	            		xtype:'textfield',
	            		name:'priceUnit',
	            		allowBlank:false,
	            		fieldLabel:'定价单位'
	            	},{
	    	            xtype      : 'fieldcontainer',
	    	            layout: 'hbox',
	    	            items: [{
			            	xtype:'datefield',
			            	name:'beginDate',
			            	flex:1,
			            	allowBlank:false,
			            	format:'Y-m-d',
			            	fieldLabel:'生效时间'
			            },{
			            	padding:'0 0 0 10',
			            	xtype:'datefield',
			            	name:'endDate',
			            	labelWidth:60,
			            	allowBlank:false,
			            	format:'Y-m-d',
			            	flex:1,
			            	fieldLabel:'失效时间'
			            }]
	            	},{
	            		xtype:'numberfield',
	            		fieldLabel:'出行周期',
	            		minValue: 0,
	            		name:'duration'
	            	},{
	            		xtype:'numberfield',
	            		fieldLabel:'提前预定天数',
	            		minValue: 0,
	            		name:'advanceDays'
	            	},{
				    	fieldLabel: '是否需要购买保险',
						xtype:'combo',
				        name: 'insurance',
				        editable:false,
				        allowBlank:false,
					    store: states,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr'
				     },{
				    	fieldLabel: '是否支持优惠券',
						xtype:'combo',
				        name: 'coupon',
				        editable:false,
				        allowBlank:false,
					    store: states,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr'
				     },{
				    	fieldLabel: '标签',
						xtype:'combo',
				        name: 'tags',
				        editable:false,
				        allowBlank:false,
				        multiSelect:true,
					    store: store3,
					    queryMode: 'remoat',
					    displayField: 'name',
					    valueField: 'id'
				     },{
	            		xtype:'htmleditor',
	            		name:'recommend',
	            		itemId:'recommend',
	            		url:Rich.Url.upLoadProdPath,
	            		allowBlank:false,
	            		fieldLabel:'小约推荐'
	            	},{
	    	            xtype      : 'fieldcontainer',
	    	            fieldLabel:'封面图',
	    	            labelWith:100,
	    	            layout: 'hbox',
	    	            items: [{
					     	xtype:'fileupload',
					     	width:300,
					     	labelWidth:60,
					     	url:Rich.Url.upLoadProdPath,
					     	fieldLabel:'封面图',
					     	height:300,
					     	itemId:'picture',
					     	name:'picture'
					     }]
	            	}]
		        },{xtype:'box',flex:0.1},{
		        	defaults:{anchor: '100%'},
		            items: [{
			        	margin:'0 0 5 0',
						padding:'0 5 5 0',
						itemId:'imgs',
						applyValue:function(v,notClean){
							if(!notClean){
					 			this.removeAll();
					 		}
					 		if(Ext.isArray(v) && v.length > 0){
							 	var its = [],it;
							 	for(var i = 0;i < v.length;i++){
							 		its.push(this.createItemByValue(v[i]));
							 	}
							 	this.add(its);
					 		}
					 		
						},
						createItemByValue:function(v){
							var items = this.items.items.length;
							if(items<4){
								return {
			        	            xtype:'fieldcontainer',
			        	           	height:300,
			        	            defaults:{
			        	                hideLabel: true
			        	            },
			        	            layout: {
								        type: 'hbox',
								        align: 'stretch'
								    },
			        	            items: [{
			        	            	margin:'0 0 0 5',
										itemId:'cover',
								    	xtype:'fileupload',
										flex:0.9,
										maxWidth:300,
										value:(v?v:null),
										src:(v?v:null),
										url:Rich.Url.upLoadProdPath,
										name:'carouselPic',
										labelHidden:true,
										buttonText: '上传图片'
			        	            },{
			        	            	margin:'0 0 0 10',
		    							xtype:'button',
		    							text:'删除',
		    							handler:function(btn){
		    								var pi = btn.up('fieldcontainer');
		    								pi.getOwnerCt().remove(pi);
		    							}
		    						}]
		    					};
							}else{
								Rich.Msg.alert('提示','图片不能超过4张!');
							}
						},
			        	dockedItems:{
			        		docked:'top',
			        		xtype:'toolbar',
			        		items:[{
			        			text:'添加相册图片',
			        			handler:function(btn){
			        				var ct = btn.getOwnerCt('imgs');
			        				ct.add(ct.createItemByValue(null));
			        			}
			        		}]
			        	},
			        	layout: {
					        type: 'vbox',
					        align: 'stretch'
					    }
			        }]
		        },{xtype:'box',flex:0.1}]
    		}]
    	    	
    	});
    	me.callParent(arguments);
    }
});