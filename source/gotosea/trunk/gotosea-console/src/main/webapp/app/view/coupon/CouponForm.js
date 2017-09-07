﻿
Ext.define('Rich.view.coupon.CouponForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.FieldContainer',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Ext.ux.layout.Center'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.couponform',
    width:0.6,
    height:0.6,
    minWidth:300,
    minHeight:200,
    
    loadById:function(id){
		this.doRetrieve({id:id});
	},
	
    initComponent:function(){
    	var me = this;
    	
    	var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"可用"},
		        {"abbr":"1", "name":"不可用"}
		    ]
		});
    	
		var stat = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"满减券"},
		        {"abbr":"1", "name":"代金券"}
		    ]
		});
		
		var store1 = Ext.create('Ext.data.Store', {
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
	    	cls:'r-highlight-disabled',
	    	bodyStyle:'overflow-x:hidden;overflow-y:auto;',
	        fieldDefaults: {
	            labelAlign: 'left',		           
	            msgTarget: 'side'
	        },
	        layout: {
		        type: 'hbox',
		        align: 'stretchmax'
		    },
		    defaults: {
	            border: false,
	            xtype: 'panel',
	            flex: 1,
	            layout: 'anchor'
	        },
	        items: [{
	        	itemId:'leftCt',
	        	margin:'10 10 10 20',
	        	defaults:{anchor: '100%',labelWidth:120},		        	
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
	            	xtype:'combo',
			        fieldLabel: '随机赠送',
			        itemId:'orderRandom',
			        name: 'orderRandom',
			        allowBlank:false,
			        editable:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'key'
				},{
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
    	});
    	me.callParent(arguments);
    },
      applyValue:function(va){
		this.getForm().setValues(va);
	},
	
    getFormValues:function(){
    	if(!(this.isValid()))
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getForm().getValues();
    	vas.ty == 1;
    	if(vas.id == ''){
    		return Ext.encode(vas);
    	}
    	this.submit(vas)
    },
    submit:function(vas){
    	Rich.JsonAjax.request({
			method:'PUT',
			url:Rich.Url.conponAddPath+vas.id,
			params:va,
			headers:{'Content-Type':'application/json;charset=UTF-8'},
			callback:this.upStateBack,
			scope:this
		});
    },
    
    
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.conponAddPath;
    	}else if(sta == 'r'){
    		return Rich.Url.couponTempDetailPath;
    	}else if(sta == 'u'){
    		return Rich.Url.conponAddPath+'/'+this.tid;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    	this.el.unmask();
    },
    callback:function(o,f,r,s){
    	if(s == 'u'){
    		this.loadById(o.params.id);
    	}else if(s=='r'){
    		this.applyValue(r.data);
			this.toStatus(s,r.data);
    	}else if(s=='c'){
    	}
    }
});