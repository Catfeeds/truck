﻿
Ext.define('Rich.view.activity.ActivityForm',{
	
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
    alias:'widget.activityform',
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
	        	defaults:{anchor: '98%'},		        	
	            items: [{
	            	xtype:'textfield',
	            	fieldLabel: '活动标题',
	            	name:'activityTitle'
	            },{
	            	xtype:'textfield',
	            	fieldLabel: '活动简介',
	            	name:'summary'
	            },{
	            	xtype:'textfield',
	            	fieldLabel: '目的地',
	            	name:'destinationName'
	            },{
	            	xtype:'textfield',
	            	fieldLabel: '计划时间',
	            	itemId:'data',
	            	name:'data'
	            },{
	            	xtype:'textfield',
	            	fieldLabel: '实际开始时间',
	            	name:'gatherTime'
	            },{
		            xtype      : 'fieldcontainer',
		            layout: 'hbox',
		            items: [{
						xtype: 'textfield',
						flex:1,
						fieldLabel: '最小人数',
						name:'minCustomers'
					},{
						xtype: 'textfield',
						padding:'0 0 0 10',
						flex:1,
						labelWidth:70,
						fieldLabel: '最大人数',
						name:'maxCustomers'
					}]
		        },{
	                xtype:'textfield',
	                fieldLabel: '线路名称',
	                itemId:'businessUnitName',
	                name: 'businessUnitName'
	            },{
					itemId:'conActServeVos',
					layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
			        flex:1,
			        margin:'5 0 0 0',
					padding:'0 5 5 5',
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
						return {
	        	            xtype : 'fieldcontainer',
	        	            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
	        	            items:[{
	        	            	xtype:'textfield',
	        	            	fieldLabel: '服务类型',
	        	            	value:(v?(v.activityServiceType == 1?'AA付费项目':'自选付费项目'):''),
	        	            	flex:1,
	        	            	name:'numToSale'
	        	            },{
	        	            	padding:'0 0 0 10',
	        	            	labelWidth:70,
    							xtype:'textfield',
    							fieldLabel: '服务名称',
    							value:(v?v.serviceName:null),
    							flex:1
	        	            }]
						};
					}
		        }]
			}]
    	});
    	me.callParent(arguments);
    },
      applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('conActServeVos').applyValue(va.conActServeVos);
		this.lookupI('data').setValue(va.beginDate+'至'+va.endDate);
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
    		return Rich.Url.actiDetailPath+this.tid;
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
    		this.applyValue(r.responseJson.data);
			this.toStatus(s,r.data);
    	}else if(s=='c'){
    	}
    }
});