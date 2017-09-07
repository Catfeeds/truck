
Ext.define('Rich.view.cust.CustForm',{
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
    alias:'widget.custform',
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
	        	padding:'10 10 10 20',
	        	defaults:{anchor: '98%'},		        	
	            items: [{
					xtype: 'hiddenfield',
				    name: 'id'
				},{
					xtype: 'textfield',
					fieldLabel: '客户账号 ',
					disabled:true,
				    name: 'account'
				},{
					xtype: 'textfield',
					fieldLabel: '客户名称 ',
					disabled:true,
				    name: 'name'
				},{
					xtype: 'textfield',
					fieldLabel: '客户手机号',
					disabled:true,
				    name: 'phone'
				},{
					xtype: 'textfield',
					fieldLabel: '客户邮箱 ',
				    name: 'email',
				    disabled:true
				},{
					xtype: 'textfield',
					fieldLabel: '客户微信 ',
				    name: 'wechat',
				    disabled:true
				},{
					xtype: 'textfield',
					fieldLabel: '客户性别 ',
				    name: 'sex',
				    itemId:'sex',
				    disabled:true
				},{
					xtype: 'textfield',
					fieldLabel: '客户等级 ',
				    name: 'level',
				    disabled:true
				},{
					xtype: 'textfield',
					fieldLabel: '玩家积分 ',
				    name: 'credits',
				    disabled:true
				},{
					xtype: 'textfield',
					fieldLabel: '客户状态 ',
				    name: 'status',
				    disabled:true,
				    itemId:'status'
				},{
			    	xtype:'fileupload',
					margin:'0 0 0 0',
					itemId:'picture',
					name:'picture',
					maxWidth:200,
					height:200,
					labelHidden:true,
					fieldLabel: '照片',
					labelWidth:60,
					buttonText: '上传图片'
				}]
			}]
    	});
    	me.callParent(arguments);
    },
 
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('status').setValue(va.status == 1?'未认证':(va.status == 2?'已申请':(va.status == 3?'认证成功':'认证失败')))
		this.lookupI('sex').setValue(va.sex == 1?'男':(va.sex == 2?'女':'未知'))
		this.lookupI('picture').setValue('',va.picture);
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
    		return Rich.Url.custDetailPath+this.tid;
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