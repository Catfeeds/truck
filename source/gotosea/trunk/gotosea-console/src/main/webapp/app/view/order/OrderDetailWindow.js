﻿/*
 * 商家详情窗体
 * */
Ext.define('Rich.view.order.OrderDetailWindow',{
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
    alias:'widget.orderdetailwindow',
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
			url:Rich.Url.orderMercDetailPath+this.id,
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
		            	xtype:'textfield',
		            	fieldLabel:'订单类型',
		            	itemId:'orderType',
		            	name:'orderType'
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
						    name: 'serviceFee'
						}]
			        },{
			            xtype      : 'fieldcontainer',
			            layout: 'hbox',
			            items: [{
							xtype: 'textfield',
							fieldLabel:'预订人姓名',
							flex:1,
						    name: 'contacter'
						},{
							labelWidth:60,
							fieldLabel:'联系电话',
							xtype: 'textfield',
							flex:1,
						    name: 'contacterPhone'
						}]
			        },{
		            	xtype:'textareafield',
				        fieldLabel: '预订人备注',
				        itemId:'contacterRemark',
				        name: 'contacterRemark'
					},{
			            xtype      : 'fieldcontainer',
			            layout: 'hbox',
			            items: [{
							xtype: 'textfield',
							fieldLabel:'商家姓名',
							flex:1,
						    name: 'merchant'
						},{
							labelWidth:60,
							fieldLabel:'联系电话',
							xtype: 'textfield',
							flex:1,
						    name: 'contacterPhone'
						}]
			        }]
		        },{xtype:'box',flex:0.05}],
		        buttons:['->',{
	    			text:'出单',
	    			handler:function(){
	    				this.up('window').succ(1);
	    			}
	    		},{
	    			text:'退单',
	    			handler:function(){
	    				this.up('window').succ(2);
	    			}
	    		}]
    		}]
    	});
    	me.callParent(arguments);
    },
    succ:function(va){
    	var url = va == 1?Rich.Url.orderMercSurePath:Rich.Url.orderMercReturnPath;
    	Rich.JsonAjax.request({
			method:'put',
			url:url+this.id,
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		this.returnValue(f);
    	}
    }
});