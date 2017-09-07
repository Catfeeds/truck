﻿/**
 * 行程信息
 */
Ext.define('Rich.view.journey.JourneyDetail', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
		'Rich.view.journey.JourneyCancelWindow',
		'Rich.view.route.RouteDetailWindow',
		'Rich.view.journey.JourneyFishSeaWindow',
		'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.journeydetail',
    
    idd:null,
    fromType:null,
    state:null,
    record: null,
    showById:function(id,fromType,state){
    	this.idd = id;
    	this.fromType = fromType;
    	this.state = state;
		this.show();
		var me = this;
		Rich.JsonAjax.request({
			url:Rich.Url.journeyDetailPath,
			method:'get',
			params:{
				id:this.idd,
				fromType:this.fromType
			},
			callback:function(o,f,r){
				this.lookupI('form').getForm().setValues(r.responseJson.data);
				me.record = r.responseJson.data;
				var state = r.responseJson.data.state;
				if(state == 3 || state == 4 || state == 5){
					this.lookupI('cancel',true).setVisible(false);
				}
			},
			scope:this
		});
    },
    resetForm:function(){
		this.lookupI('form').getForm().setValues(this.record);    
    },
	initComponent:function(){
		var me = this;
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
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
			                xtype:'hiddenfield',
			                itemId:'userId',
			                name: 'userId'
			            },{
			                xtype:'textfield',
			                fieldLabel: '行程编号',
			                name: 'number'
			            }, {
			                xtype:'textfield',
			                fieldLabel: '路线管理员',
			                name: 'creator'
			            },{
					    	xtype:'diccombo',
					        fieldLabel: '线路类型',
					        name: 'routeType',
					        editable:false,
					        typeName:'route_type'
					    },{
	        	            xtype      : 'fieldcontainer',
	        	            fieldLabel : '行程订单',
	        	            itemId:'fieldc',
	        	            layout: 'hbox',
	        	            disabled:false,
        	            	items: [{
    							xtype: 'triggerfield',
    							flex:1,
    							editable:false,
    							itemId:'orderNo',
    							disabled:false,
    						    name: 'orderNo',
    						    onTriggerClick: function(e) {
    						    	var jourOrderId = this.up('form').lookupI('orderId').getValue();
    						    	var os = this.up('form').lookupI('orderStatus').getValue();
							        Ext.create('Rich.view.order.OrderDetailWindow').showByOrderId(jourOrderId);
							    }
    						}]
	        	        },{
			                xtype:'textfield',
			                fieldLabel: '线路编号',
			                disabled:true,
			                itemId:'routeNo',
			                name: 'routeNo'
			            }]
		        },{xtype:'box',flex:0.1},{
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
			                xtype:'textfield',
			                fieldLabel: '行程名称',
			                disabled:true,
			                name: 'name'
			            },{
			                xtype:'textfield',
			                fieldLabel: '创建日期',
			                disabled:true,
			                name: 'createTime'
			            },{
			                xtype:'hiddenfield',
			                itemId:'orderId',
			                name: 'orderId'
			            },{
	        	            xtype      : 'fieldcontainer',
	        	            fieldLabel : '行程日期',
	        	            defaults: {
	        	                hideLabel: true
	        	            },
	        	            layout: 'hbox',
	        	            items: [{
    							xtype: 'textfield',
    							flex:1,
    							itemId:'departureTime',
    						    name: 'departureTime',
								editable:false,
								disabled:true
    						},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
    							xtype: 'textfield',
    							flex:1,
    							itemId:'endTime',
    						    name: 'endTime',
    						    disabled:true
    						}]
	        	        },{
					    	xtype:'diccombo',
					        fieldLabel: '订单状态',
					        itemId:'orderStatus',
					        name: 'orderStatus',
					        disabled:true,
					        editable:false,
					        typeName:'order_status'
					    },{
			                xtype:'hiddenfield',
			                itemId:'routeId',
			                fieldLabel: '线路id',
			                name: 'routeId'
			            },{
			                xtype:'hiddenfield',
			                itemId:'orderId',
			                fieldLabel: '订单状态id',
			                disabled:true,
			                name: 'orderId'
			            },{
			                xtype:'hiddenfield',
			                itemId:'id',
			                fieldLabel: '行程id',
			                disabled:true,
			                name: 'id'
			            }]
		        },{xtype:'box',flex:0.1}],
		        buttons:['->',{
		    	    	text:'编辑',
		    	    	itemId:'btnEdit',
		    	    	rightId:Rich.V.journey_alter_time,
		    	    	handler:function(btn){
		    	    		var fm = btn.up('form');
		    	    		fm.lookupI('departureTime').setDisabled(false);
		    	    		btn.ownerCt.getItem('cancelEdit').setVisible(true);
		    	    		btn.ownerCt.getItem('btnSave').setVisible(true);
		    	    		btn.setVisible(false);
		    	    	}
		    	    },{
		    	    	text:'取消编辑',
		    	    	hidden:true,
		    	    	itemId:'cancelEdit',
		    	    	handler:function(btn){
		    	    		this.up('journeydetail').resetForm();
		    	    		var fm = btn.up('form');
		    	    		fm.lookupI('departureTime').setDisabled(true);
		    	    		btn.ownerCt.getItem('btnEdit').setVisible(true);
		    	    		btn.ownerCt.getItem('cancelEdit').setVisible(false);
		    	    		btn.ownerCt.getItem('btnSave').setVisible(false);
		    	    		btn.setVisible(false);
		    	    	}
		    	    },{
		    	    	text:'保存',
		    	    	hidden:true,
		    	    	itemId:'btnSave',
		    	    	handler:function(btn){
		    	    		btn.up('form').submit();
		    	    	}
		    	    },{
		    	    	text:'取消行程',
		    	    	itemId:'cancel',
		    	    	hidden:true,
		    	    	rightId:Rich.V.journey_alter_cancel,
		    	    	handler:function(btn){
		    	    		btn.up('form').cancel();
		    	    	}
		    	    }],
		    	    submit:function(){
	    	        	var vas = this.getValues();	    	        	
	    	        	var time = vas.departureTime;
	    	        	var rs = vas.reason;
	    	        	var ids = this.up('journeydetail').idd;
	    	        		Ext.Msg.prompt('修改', '确定要修改出发时间吗？\n请输入原因:',function(btn, text){
	    	        			if(text && text !=''){
							    if (btn == 'ok'){
			    	        		Rich.JsonAjax.request({
			    	        			method:'post',
				    	        		url:Rich.Url.journeyUpdatePath,
				    	        		params:{
					    	        		departureTime:time,
					        				reason:text,
					        				jourId:ids
							        	},
				    	        		callback:this.removeBack,
				    	        		scope:this
			    	        		});
							    }
						    }else{
						    	Rich.Msg.alert('提示','原因是必须输入的.');
						    	return false;
						    }
	    	        		},this)
	    	        },
	    	        removeBack:function(o,f,r){
	    	        	this.el.unmask();
	    	        	if(f){
	    	        		this.getForm().setValues(r.responseJson.data);
	    	        		this.lookupI('departureTime').setDisabled(true);
		    	    		this.lookupI('btnEdit',true).setVisible(true);
		    	    		this.lookupI('btnSave',true).setVisible(false);
		    	    		this.lookupI('cancelEdit',true).setVisible(false);
	    	        	}else{
	    	        		this.getForm().setValues(r.responseJson.data);
	    	        		this.lookupI('departureTime').setDisabled(true);
		    	    		this.lookupI('btnEdit',true).setVisible(true);
		    	    		this.lookupI('btnSave',true).setVisible(false);
		    	    		this.lookupI('cancelEdit',true).setVisible(false);
	    	        	}
	    	        },
	    	        cancel:function(){
	    	        	var ids = this.up('journeydetail').idd;
	    	        	var uid = this.lookupI('userId').getValue();
	        			Ext.create('Rich.view.journey.JourneyCancelWindow',{
	        				jourId:ids,
	        				userId:uid
						}).showFor(this.removeBack,this);
	    	        }
    		}]
    	    	
    	});
		this.callParent(arguments);
	}
});
