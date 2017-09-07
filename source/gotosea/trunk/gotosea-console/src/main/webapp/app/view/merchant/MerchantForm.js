﻿
Ext.define('Rich.view.merchant.MerchantForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.FieldContainer',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Rich.component.FileUpload',
	'Ext.ux.layout.Center'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.merchantform',
    width:0.6,
    height:0.6,
    minWidth:300,
    minHeight:200,
    
    loadById:function(id){
		this.doRetrieve({id:id});
	},
	
    initComponent:function(){
    	var me = this;
    	
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
	            	fieldLabel: '商家名称',
	            	name:'merchant'
	            },{
	            	xtype:'textfield',
	            	fieldLabel: '商家真实姓名',
	            	name:'realName'
	            },{
			    	xtype:'fieldcontainer',
			    	layout:'hbox',
			    	items:[{
		            	xtype:'textfield',
		            	fieldLabel: '证件名',
		            	flex:1,
		            	name:'idTypeName'
		            },{
		            	padding:'0 0 0 10',
		            	xtype:'textfield',
		            	fieldLabel: '证件号',
		            	flex:1,
		            	labelWidth:60,
		            	name:'idNum'
		            }]
			    },{
	            	xtype:'textfield',
	            	fieldLabel: '手机号',
	            	itemId:'phone',
	            	name:'phone'
	            },{
	                xtype:'textfield',
	                fieldLabel: '商家地址',
	                itemId:'address',
	                name: 'address'
	            },{
	                xtype:'textfield',
	                fieldLabel: '商家所属区域',
	                itemId:'locatorIdName',
	                name: 'locatorIdName'
	            },{
	            	xtype:'textareafield',
	            	fieldLabel: '商家介绍',
	            	name:'introduction'
	            },{
			    	xtype:'fieldcontainer',
			    	layout:'hbox',
			    	items:[{
				    	xtype:'fileupload',
						margin:'0 0 0 10',
						itemId:'idPicture1',
						name:'idPicture1',
						labelHidden:true,
						height:200,
						labelWidth:70,
						flex:0.25,
						fieldLabel: '身份证正面',
						buttonText: '上传图片'
					},{
				    	xtype:'fileupload',
						margin:'0 0 0 10',
						itemId:'idPicture2',
						name:'idPicture2',
						height:200,
						flex:0.25,
						labelHidden:true,
						labelWidth:70,
						fieldLabel: '身份证背面',
						buttonText: '上传图片'
					},{
				    	xtype:'fileupload',
						margin:'0 0 0 10',
						itemId:'thumbnail',
						name:'thumbnail',
						height:200,
						flex:0.25,
						labelHidden:true,
						labelWidth:60,
						fieldLabel: '缩略图',
						buttonText: '上传图片'
					},{
				    	xtype:'fileupload',
						margin:'0 0 0 10',
						itemId:'picture',
						name:'picture',
						height:200,
						flex:0.25,
						labelHidden:true,
						labelWidth:60,
						fieldLabel: '封面图',
						buttonText: '上传图片'
					}]
			    },{
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
						return {
	        	            xtype:'fieldcontainer',
	        	           	height:300,
	        	            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
	        	            items: [{
	        	            	margin:'0 0 0 5',
								itemId:'cover',
						    	xtype:'fileupload',
								flex:1,
								width:300,
								height:300,
								value:(v?v:null),
								src:(v?v:null),
								labelHidden:true,
								url:Rich.Url.upLoadProdPath,
								name:'carouselPic',
								fieldLabel: '轮播图',
								buttonText: '上传图片'
	        	            }]
    					}
					},
		        	layout: {
				        type: 'hbox',
				        align: 'stretch'
				    }
		        }]
			}]
    	});
    	me.callParent(arguments);
    },
    valueFields:['idPicture1','idPicture2','thumbnail','picture'],
    
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('imgs').applyValue(va.carouselPicsArr);
		var o,t,c,vf = this.valueFields;
		var u = '';
		for(o in vf){
			t = vf[o];
			c = this.lookupI(t);
			c.setValue(u,va[t]);
		}
	},
	
    getFormValues:function(){
    	if(!(this.isValid()))
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getForm().getValues();
    	return vas;
    },
    
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.conponAddPath;
    	}else if(sta == 'r'){
    		return Rich.Url.merchantDetailPath+this.tid;
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