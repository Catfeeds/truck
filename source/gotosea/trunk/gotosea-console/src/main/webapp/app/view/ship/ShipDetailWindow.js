﻿/*
 * 线路详情窗体
 * */
Ext.define('Rich.view.ship.ShipDetailWindow',{
	requires:[
		'Rich.view.ship.ShipTagMain',
		'Rich.store.AreaTreeStore'
	  ],
    extend: 'Rich.widget.Window',
    alias:'widget.shipdetailwindow',
    width:0.8,
    height:0.8,
    minWidth:400,
    minHeight:400,
    autoScroll:true,
    title:'船舶服务详情 ',
    
    id:null,
    status:null,
    data:null,
    showByshipId:function(uid,status){
    	this.id = uid;
    	this.show()
    	Rich.JsonAjax.request({
			method:'get',
    		url:Rich.Url.shipDetailPath+this.tid,
    		callback:function(o,f,r){
    			if(f){
    				this.data = r.responseJson.data;
    				this.lookupI('custId').setValue(r.responseJson.data.custId.custId);
    				this.lookupI('merchantName').setValue(r.responseJson.data.custId.merchant)
    				this.lookupI('base').getForm().setValues(r.responseJson.data);
    				this.lookupI('picture').setValue('',r.responseJson.data.picture);
    				this.lookupI('fishPointPic').setValue('',r.responseJson.data.fishPointPic)
    				this.lookupI('imgs').applyValue(r.responseJson.data.carouselPics);
    				this.lookupI('base').setDisabled(true);
    				this.lookupI('detail').setDisabled(true);
    				this.lookupI('explain').setDisabled(true);
    				this.lookupI('know').setDisabled(true);
    			}
    		},
    		scope:this
		});
    },
    
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
				{"abbr":"1001", "name":"租船"}
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
    	var ft = me.type;
    	var tid = me.tid;
    	Ext.apply(me,{
    		autoScroll:true,
    		layout:'fit',
    		items:[{
    			xtype:'tabpanel',
    			itemId:'all',
    			deferredRender:false,
    			items: [{
    				title:'基本信息',
    				cls:'r-highlight-disabled',
    				autoScroll:true,
		    		items:[{
			    		dockedItems:{
			    			docked:'top',
			    			xtype:'toolbar',
			    			items:['->']
			    		},
						items:[{
							xtype:'form',
							itemId:'base',
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
						            	itemId:'custId',
						            	name:'custId'
						            },{
								        fieldLabel:'归属商家',
								        name:'merchantName',
								        itemId:'merchantName',
					    	    		xtype:'triggerfield',
					    	    		allowBlank:false,
					    	    		editable:false,
					    	    		emptyText:'请选择归属商家',
					                    onTriggerClick:function(){
					                    	var win = Ext.create('Rich.view.merchant.MerchantSearchWindow').showFor(this.valueBack,this);
					                    },
					                    valueBack:function(rds){
					                    	if(rds && rds.length > 0){
					                    		var rd = rds[0];
					                    		this.setValue(rd.get('merchant'));
					                    		this.up('form').down('hiddenfield[name=custId]').setValue(rd.get('custId'));
					                    	}
					                    }
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
							            	emptyText:'单位(元)',
							            	minValue: 0,
							            	decimalPrecision:0,
							            	fieldLabel:'市场价'
							            },{
							            	padding:'0 0 0 10',
							            	xtype:'numberfield',
							            	name:'preferPrice',
							            	labelWidth:50,
							            	flex:1,
							            	allowBlank:false,
							            	minValue: 0,
							            	emptyText:'单位(元)',
							            	decimalPrecision:0,
							            	fieldLabel:'优惠价'
							            },{
							            	padding:'0 0 0 10',
							            	xtype:'numberfield',
							            	name:'costPrice',
							            	labelWidth:50,
							            	flex:1,
							            	minValue: 0,
							            	emptyText:'单位(元)',
							            	decimalPrecision:0,
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
							            	xtype:'numberfield',
							            	name:'minPersons',
							            	fieldLabel:'人数下限',
							            	flex:1,
							            	minValue: 0,
							            	allowBlank:false
							            },{
							            	padding:'0 0 0 10',
							            	xtype:'numberfield',
							            	name:'maxPersons',
							            	fieldLabel:'人数上限',
							            	labelWidth:60,
							            	minValue: 1,
							            	allowBlank:false,
							            	flex:1
							            }]
					            	},{
					            		xtype:'numberfield',
					            		fieldLabel:'提前预定天数',
					            		minValue:1,
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
					    	            xtype      : 'fieldcontainer',
					    	            fieldLabel:'封面图',
					    	            labelWith:100,
					    	            layout: 'hbox',
					    	            items: [{
									     	xtype:'fileupload',
									     	flex:0.9,
									     	labelWidth:60,
									     	fieldLabel:'封面图',
									     	url:Rich.Url.upLoadProdPath,
									     	height:300,
									     	itemId:'picture',
									     	name:'picture'
									     },{
									     	margin:'0 0 0 5',
									     	xtype:'fileupload',
									     	flex:0.9,
									     	labelWidth:60,
									     	fieldLabel:'钓点分布图',
									     	url:Rich.Url.upLoadProdPath,
									     	height:300,
									     	itemId:'fishPointPic',
									     	name:'fishPointPic'
									     }]
					            	}]
					        },{xtype:'box',flex:0.05},{
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
													name:'carouselPic',
													url:Rich.Url.upLoadProdPath,
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
		    		}]
    			},{
					itemId:'shiptagmain',
					title:'出行定价',
					xtype:'shiptagmain',
					tid:this.tid,
					showFn:function(){
						var id = this.up('window').id;
						var status = this.up('window').status;
						this.loadById(id,status);
					}
    			},{
    				title:'详情描述',
    				autoScroll:true,
    				cls:'r-highlight-disabled',
    				listeners:{
    					'boxready':function(){
    						var detail = this.up('window').data.infos[0];
    						this.down('hiddenfield[name=itemId]').setValue(detail.itemId);
    						this.down('htmleditor[name=itemContent]').setValue(detail.itemContent);
    					}
    				},
	    			items:[{
	    				layout:'fit',
			    		dockedItems:{
			    			docked:'top',
			    			xtype:'toolbar',
			    			items:['->']
			    		},
						items:[{
							xtype:'form',
							itemId:'detail',
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
					        items: [{xtype:'box',flex:0.05},{
					        	defaults:{anchor: '100%'},
					            items: [{
					            	xtype:'hiddenfield',
					            	name:'itemId'
					            },{
				    	            xtype:'htmleditor',
					            	fieldLabel:'详情描述',
					            	allowBlank:false,
					            	name:'itemContent',
					            	itemId:'itemContent',
					            	height:500,
					            	flex:1
				            	}]
					        },{xtype:'box',flex:0.05}]
						}]
		    		}]
    			},{
    				title:'费用说明',
    				autoScroll:true,
    				cls:'r-highlight-disabled',
    				listeners:{
    					'boxready':function(){
    						var explain = this.up('window').data.infos[1];
    						this.down('hiddenfield[name=itemId]').setValue(explain.itemId);
    						this.down('htmleditor[name=itemContent]').setValue(explain.itemContent);
    					}
    				},
	    			items:[{
	    				layout:'fit',
			    		dockedItems:{
			    			docked:'top',
			    			xtype:'toolbar',
			    			items:['->']
			    		},
						items:[{
							xtype:'form',
							itemId:'explain',
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
					        items: [{xtype:'box',flex:0.05},{
					        	defaults:{anchor: '100%'},
					            items: [{
					            	xtype:'hiddenfield',
					            	name:'itemId'
					            },{
				    	            xtype:'htmleditor',
					            	fieldLabel:'费用说明',
					            	allowBlank:false,
					            	name:'itemContent',
					            	itemId:'itemContent',
					            	height:500,
					            	flex:1
				            	}]
					        },{xtype:'box',flex:0.05}]
						}]
		    		}]
    			},{
    				title:'出行须知',
    				autoScroll:true,
    				cls:'r-highlight-disabled',
    				listeners:{
    					'boxready':function(){
    						var know = this.up('window').data.infos[2];
    						this.down('hiddenfield[name=itemId]').setValue(know.itemId);
    						this.down('htmleditor[name=itemContent]').setValue(know.itemContent);
    					}
    				},
	    			items:[{
	    				layout:'fit',
			    		dockedItems:{
			    			docked:'top',
			    			xtype:'toolbar',
			    			items:['->']
			    		},
						items:[{
							xtype:'form',
							itemId:'know',
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
					        items: [{xtype:'box',flex:0.05},{
					        	defaults:{anchor: '100%'},
					            items: [{
					            	xtype:'hiddenfield',
					            	name:'itemId'
					            },{
				    	            xtype:'htmleditor',
					            	fieldLabel:'出行须知',
					            	allowBlank:false,
					            	name:'itemContent',
					            	itemId:'itemContent',
					            	height:500,
					            	flex:1
				            	}]
					        },{xtype:'box',flex:0.05}]
						}]
		    		}]
    			}],
	    		buttons:['->',{
	    			text:'修改',
	    			itemId:'update',
	    			handler:function(btn){
	    				var window = this.up('window')
	    				window.lookupI('base').setDisabled(false);
	    				window.lookupI('detail').setDisabled(false);
	    				window.lookupI('explain').setDisabled(false);
	    				window.lookupI('know').setDisabled(false);
	    				btn.ownerCt.getItem('update').setVisible(false);
		    	    	btn.ownerCt.getItem('cancel').setVisible(true);
		    	    	btn.ownerCt.getItem('submit').setVisible(true);
	    			}
		    	},{
	    			text:'取消',
	    			hidden:true,
	    			itemId:'cancel',
	    			handler:function(btn){
	    				var window = this.up('window')
	    				btn.ownerCt.getItem('update').setVisible(true);
		    	    	btn.ownerCt.getItem('cancel').setVisible(false);
		    	    	btn.ownerCt.getItem('submit').setVisible(false);
		    	    	window.lookupI('base').setDisabled(true);
	    				window.lookupI('detail').setDisabled(true);
	    				window.lookupI('explain').setDisabled(true);
	    				window.lookupI('know').setDisabled(true);
	    			}
		    	},{
	    			text:'提交',
	    			hidden:true,
	    			itemId:'submit',
	    			handler:function(btn){
	    				btn.ownerCt.getItem('update').setVisible(true);
		    	    	btn.ownerCt.getItem('cancel').setVisible(false);
		    	    	btn.ownerCt.getItem('submit').setVisible(false);
	    				this.up('window').getFormValues();
	    			}
	    		}]
    		}]
    	});
    	me.callParent(arguments);
    },
    getFormValues:function(){
    	var vas = this.lookupI('base').getForm().getValues()
    	var result = this.lookupI('detail').getForm().getValues();
    	var explain = this.lookupI('explain').getForm().getValues()
    	var know = this.lookupI('know').getForm().getValues();
    	if(!this.lookupI('base').getForm().isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return;
		}
		vas.infos = [
			{seq:1,itemContent:result.itemContent,itemName:'详情介绍',itemId:result.itemId},
			{seq:2,itemContent:explain.itemContent,itemName:'费用说明',itemId:explain.itemId},
			{seq:3,itemContent:know.itemContent,itemName:'出行须知',itemId:know.itemId}];
		var carouselPics = '';
		if(Ext.isArray(vas.carouselPic) && vas.carouselPic.length > 1){
			for(var i = 0;i<vas.carouselPic.length;i++){
	    		if(vas.carouselPic[i]){
		    		if(i == 0){
		    			carouselPics = vas.carouselPic[i];
		    		}else{
		    			carouselPics += ','+vas.carouselPic[i];
		    		}
	    		}
	    	}
		}else{
			carouselPics = vas.carouselPic;
		}
    	vas.marketPrice = vas.marketPrice*100;
		vas.preferPrice = vas.preferPrice*100;
		vas.costPrice = vas.costPrice*100;
		vas.carouselPics = carouselPics;
		var va = Ext.encode(vas);
		Rich.JsonAjax.request({
			method:'put',
    		url:Rich.Url.shipUpdatePathL,
    		params:va,
    		headers:{'Content-Type':'application/json;charset=UTF-8'},
    		callback:this.upStateBack,
    		scope:this
		});
    },
    upStateBack:function(o,f,r){
    	if(f){
    		this.lookupI('base').setDisabled(true);
			this.lookupI('detail').setDisabled(true);
			this.lookupI('explain').setDisabled(true);
			this.lookupI('know').setDisabled(true);
			this.lookupI('update').setVisible(true);
			this.lookupI('cancel').setVisible(false);
			this.lookupI('submit').setVisible(false);
    	}
    }
});