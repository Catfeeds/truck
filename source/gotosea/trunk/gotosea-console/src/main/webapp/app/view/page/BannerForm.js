
Ext.define('Rich.view.page.BannerForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.bannerform',
    minWidth:300,
    minHeight:200,
    tid:null,
    
    loadById:function(id){
    	this.userId = id;
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
	        	defaults:{anchor:'100%'},
	            items:[{
	            	xtype:'hiddenfield',
	            	name:'isUsed'
	            },{
	            	xtype:'hiddenfield',
	            	name:'id'
	            },{
	            	xtype:'hiddenfield',
	            	name:'type'
	            },{
	                xtype:'textfield',
	                fieldLabel: '名称',
	                itemId:'name',
	                name: 'name'
	            },{
	                xtype:'textfield',
	                fieldLabel: '排序编号位置',
	                itemId:'sort',
	                name: 'sort'
	            },{
	                xtype:'textfield',
	                fieldLabel: '超链接',
	                itemId:'link',
	                name: 'link'
	            },{
	                xtype:'textarea',
	                fieldLabel: '描述',
	                height:100,
	                itemId:'depict',
	                name: 'depict'
	            },{
					itemId:'cover',
			    	xtype:'fileupload',
					maxWidth:300,
					height:300,
					itemId:'pic',
					name:'pic',
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
    	if(!vas.type){
    		vas.type = this.tid;
    	}
    	return vas;
    },
    cUrl:Rich.Url.bannerAddPath,
    rUrl:Rich.Url.bannerDetaPath,
    uUrl:Rich.Url.bannerUpdaPath,
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    },
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('pic').setValue(va.pic,va.picFull);
	},
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		this.loadById(this.userId);
	    	}else if(s=='r'){
	    		if(r.responseJson.data){
	    			this.applyValue(r.responseJson.data);
	    			this.toStatus(s);
	    		}else{
	    			this.toStatus('c');
	    		}
	    	}else if(s=='c'){
	    	}
    	}
    }
});