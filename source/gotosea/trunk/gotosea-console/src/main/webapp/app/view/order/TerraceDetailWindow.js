﻿/*
 * 平台订单详情窗体
 * */
Ext.define('Rich.view.order.TerraceDetailWindow',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Ext.ux.layout.Center'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.terracedetailwindow',
    minWidth:500,
    minHeight:500,
    width:0.6,
    height:0.6,
    autoScroll:true,
    title:'商家订单详情',
 
    id:null,
    
    showByOrderId:function(uid){
    	this.id = uid;
    	this.show();
    	Rich.JsonAjax.request({
			url:Rich.Url.orderTerraceDetailPath+this.id,
			method:'get',
			callback:function(o,f,r){
				if(f){
					var data = r.responseJson.data;
					this.lookupI('form').getForm().setValues(data);
				}
			},
			scope:this
		})
    },
    
    initComponent:function(){
    	var me = this;   
    	Ext.apply(me,{
    		layout:'fit',
    		items:[{
				xtype:'form',
				itemId:'form',
		        defaults: {
		            border: false,
		            xtype: 'panel',
		            flex: 1,
		            layout: 'anchor',
		            defaults:{
		            	margin:'2 10',
		            	anchor: '80%'			            
		            }
		        },
		        layout: 'hbox',
		        items: [{xtype:'box',flex:0.05},{
		        	defaults:{disabled:true,anchor: '100%'},
			        items: [{
		            	padding:'5 0 0 0',
		                xtype:'textfield',
		                fieldLabel: '订单编号',
		                itemId:'orderNo',
		                allowBlank:false,
		                name: 'orderNo'
		            },{
		            	padding:'5 0 0 0',
		                xtype:'textfield',
		                fieldLabel: '创建时间',
		                itemId:'createTime',
		                allowBlank:false,
		                name: 'createTime'
		            },{
		            	xtype:'textfield',
		            	fieldLabel:'订单类别',
		            	itemId:'serviceTypeId',
		            	name:'serviceTypeId'
		            },{
		            	xtype:'textfield',
		            	fieldLabel:'服务名称',
		            	name:'name'
		            },{
			            xtype      : 'fieldcontainer',
			            layout: 'hbox',
			            items: [{
							xtype: 'textfield',
							fieldLabel:'出行日期',
							flex:1,
						    name: 'serviceDate'
						},{
							labelWidth:60,
							fieldLabel:'出行人数',
							xtype: 'textfield',
							flex:1,
						    name: 'travelersNum'
						}]
			        },{
			            xtype      : 'fieldcontainer',
			            layout: 'hbox',
			            items: [{
							xtype: 'textfield',
							fieldLabel:'预订数量',
							flex:1,
						    name: 'serviceNum'
						},{
							labelWidth:60,
							fieldLabel:'订单总额',
							xtype: 'textfield',
							flex:1,
						    name: 'preferPrice'
						}]
			        },{
		            	xtype:'textfield',
				        fieldLabel: '实收总额',
				        itemId:'payFee',
				        name: 'payFee'
					}]
		        },{xtype:'box',flex:0.05}]
    		}]
    	});
    	me.callParent(arguments);
    }
});