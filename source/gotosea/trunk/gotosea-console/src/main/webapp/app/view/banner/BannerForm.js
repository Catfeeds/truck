
Ext.define('Rich.view.banner.BannerForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Rich.component.FileUpload',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.bannerform',
    minWidth:300,
    minHeight:200,
    
    loadById:function(id){
    	this.id = id;
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
	        	margin:'10 10 10 10',
	        	flex:1,
	        	defaults:{anchor:'98%'},
	            items:[{
	                xtype:'hiddenfield',
	                name: 'id'
	            },{
	                xtype:'hiddenfield',
	                name: 'isHidden'
	            },{
	                xtype:'hiddenfield',
	                name: 'isDelete'
	            },{
	                xtype:'textfield',
	                fieldLabel: '名称',
	                itemId:'titleDesc',
	                name: 'titleDesc'
	            },{
	                xtype:'numberfield',
	                fieldLabel: '排序编号位置',
	                itemId:'sortOrder',
	                name: 'sortOrder'
	            },{
	                xtype:'textfield',
	                fieldLabel: '超链接',
	                itemId:'imgLink',
	                name: 'imgLink'
	            }]
			},{
	        	itemId:'rightCt',
	        	margin:'10 10 10 10',
	        	flex:0.5,
	        	defaults:{anchor:'98%'},
	            items:[{
					itemId:'cover',
			    	xtype:'fileupload',
					maxWidth:250,
					labelWidth:50,
					height:200,
					itemId:'imgUrl',
					name:'imgUrl',
					url:Rich.Url.upLoadProdPath,
					labelHidden:true,
					buttonText: '上传图片'
	            }]
			}]
    	});
    	me.callParent(arguments);
    },
    getFormValues:function(){
    	if(!this.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getValues();
    	return Ext.encode(vas);
    },
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.bannerAddPath;
    	}else if(sta == 'r'){
    		return Rich.Url.bannerAddPath;
    	}else if(sta == 'u'){
    		return Rich.Url.bannerAddPath;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    	this.lookupI('rightCt').setDisabled(st=='r');
    	
    },
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('imgUrl').setValue('',va.imgUrl);
	},
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		this.toStatus('r');
	    	}else if(s=='r'){
	    		this.applyValue(r);
	    		this.toStatus(s);
	    	}else if(s=='c'){
	    	}
    	}
    }
});