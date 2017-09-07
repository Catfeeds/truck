﻿/**
 *优惠券详情
 */
Ext.define('Rich.view.coupon.CouponDetailWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.coupondetailwindow',
    width:0.6,
    height:0.8,
    minWidth:200,
    minHeight:200,
    autoScroll:true,
    title:'优惠券详情',

    setV:function(rec){
    	var form = this.lookupI('form')
    	form.getForm().setValues(rec);
    	this.lookupI('orderRandom').setValue(rec.orderRandom == 0?'可用':'不可用');
    	form.setDisabled(true);
    	this.show();
    },
    
    initComponent:function(){
    	var me = this;
    	var states = Ext.create('Ext.data.Store', {
		    data : [
		        {"abbr":"0", "name":"可用"},
		        {"abbr":"1", "name":"不可用"}
		    ],
		    fields: ['abbr', 'name']
		});
    	
		var stat = Ext.create('Ext.data.Store', {
		    data : [
		        {"abbr":"0", "name":"满减券"},
		        {"abbr":"1", "name":"代金券"}
		    ],
		    fields: ['abbr', 'name']
		});
		
		var store1 = Ext.create('Ext.data.Store', {
			autoLoad:true,
			proxy:{
				type:'ajax',
				url:Rich.Url.conponTermPath,
				reader:{
					type:'json',
					rootProperty:'data'
				},
				fields : ['key','name'] 
			}
		});
		
    	Ext.apply(me,{
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
		            	anchor: '100%'			            
		            }
		        },
		        layout: 'hbox',
			    items: [{
		        	itemId:'leftCt',
		        	margin:'10 10 10 10',	        	
		            items: [{
		                xtype:'hiddenfield',
		                fieldLabel: 'ID',
		                name: 'id'
		            },{
		                xtype:'textfield',
		                fieldLabel: '名称',
		                itemId:'name',
		                allowBlank:false,
		                name: 'name'
		            },{
		                xtype:'combo',
		                fieldLabel: '类型选择',
		                name: 'couponTypeId',
		                itemId:'couponTypeId',
		                value:1,
				        editable:false,
					    store: stat,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr',
					    listeners:{
							'select':function(e,r){
								if(r.data.abbr == 0){
									this.up('form').lookupI('consumptionMin').show();
								}else{
									this.up('form').lookupI('consumptionMin').hide();
								}
							}
					    }
		            },{
		                xtype:'textfield',
		                fieldLabel: '满减下限',
		                hidden:true,
		                itemId:'consumptionMin',
		                name: 'consumptionMin'
		            },{
		            	xtype:'combobox',
				        fieldLabel: '触发条件',
				        itemId:'getWay',
				        name: 'getWay',
				        allowBlank:false,
				        editable:false,
					    store: store1,
					    queryMode: 'remote',
					    valueField: 'key',
					    displayField: 'name'
					},{
				    	fieldLabel: '随机赠送',
						xtype:'combo',
				        itemId:'orderRandom',
				        name: 'orderRandom',
				        editable:false,
					    store: states,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr'
				    }/*,{
		            	xtype:'combobox',
				        fieldLabel: '随机赠送',
				        itemId:'orderRandom',
				        name: 'orderRandom',
				        //editable:false,
					    store: states,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr'
					}*/,{
						xtype:'textfield',
						name:'amount',
						allowBlank:false,
						fieldLabel: '面额'
					},{
		                xtype:'textfield',
		                fieldLabel: '兑换积分',
		                itemId:'creditsExchange',
		                allowBlank:false,
		                name: 'creditsExchange'
		            },{
		                xtype:'textfield',
		                fieldLabel: '有效期(月)',
		                itemId:'validityMonths',
		                allowBlank:false,
		                name: 'validityMonths'
		            },{
		                xtype:'textfield',
		                fieldLabel: '计划发行量',
		                itemId:'planNum',
		                allowBlank:false,
		                name: 'planNum'
		            },{
		                xtype:'textfield',
		                fieldLabel: '已发行量',
		                hidden:true,
		                disabled:true,
		                itemId:'suppliedNum',
		                allowBlank:false,
		                name: 'suppliedNum'
		            }]
				}]
    		}],
    		buttons:[{
    			text:'修改',
    			itemId:'update',
    			handler:function(btn){
    				btn.ownerCt.getItem('update').setVisible(false);
    	    		btn.ownerCt.getItem('cancel').setVisible(true);
    	    		btn.ownerCt.getItem('save').setVisible(true);
    	    		var fm = this.up('window').lookupI('form');
    				fm.setDisabled(false);
    			}
    		},{
    			text:'取消修改',
    			itemId:'cancel',
    			hidden:true,
    			handler:function(btn){
    				var fm = this.up('window').lookupI('form');
    				fm.setDisabled(true);
    				btn.ownerCt.getItem('update').setVisible(true);
    	    		btn.ownerCt.getItem('cancel').setVisible(false);
    	    		btn.ownerCt.getItem('save').setVisible(false);
    			}
    		},{
    			text:'提交',
    			itemId:'save',
    			hidden:true,
    			handler:function(btn){
    				this.up('window').submit();
    			}
    		}]	
    	});
    	me.callParent(arguments);
    	this.setV(this.rec);
    },
    submit:function(){
    	var fm = this.lookupI('form');
    	if(!fm.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		};
    	var vas = this.lookupI('form').getForm().getValues();
    	var id = vas.id;
    	vas.orderRandom == '可用'?vas.orderRandom = 0:vas.orderRandom = 1;
    	var va = Ext.encode(vas);
    	Rich.JsonAjax.request({
			method:'put',
			url:Rich.Url.conponAddPath+'/'+id,      	
			params:va,
			headers:{'Content-Type':'application/json;charset=UTF-8'},
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		this.returnValue(o,f,r);
    	}
    }
});