/**
 * 码头详情
 */
Ext.define('Rich.view.freshcatch.FishCatchForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Ext.ux.layout.Center',
	'Rich.component.FileUpload'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.fishcatchform',
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
	        defaults:{anchor:'100%',margin:'5 10 5 10'},
	        layout: 'hbox',
	        items: [{
		            items: [{
		                xtype:'hiddenfield',
		                fieldLabel: 'ID',
		                name: 'id'
		            },{
		                xtype:'hiddenfield',
		                name: 'fullpic'
		            },{
		                xtype:'textfield',
		                fieldLabel: '名称',
		                itemId:'name',
		                flex:0.4,
		                allowBlank:false,
		                name: 'name'
		            },{
						itemId:'url',
				    	xtype:'fileupload',
				    	width:290,
						height:300,
						itemId:'pic',
						name:'pic',
						fieldLabel: '*添加封面照片',
						buttonText: '上传图片'
				    }]
		        },{
            		xtype:'htmleditor',
            		fieldLabel: '描述',
            		labelWidth:50,
            		allowBlank:false,
            		height:330,
            		itemId:'content',
            		flex:0.6,
					name:'content'
		       }]
	        
    	});
    	me.callParent(arguments);
    },
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('pic').setValue(va.pic,va.fullPic);
	},
    getFormValues:function(){
    	if(!this.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getValues();
    	return vas;
    },
    cUrl:Rich.Url.fishcatchAddPath,
    rUrl:Rich.Url.fishcatchDetPath,
    uUrl:Rich.Url.fishcatchUpdPath,
    toStatus:function(st){
    	this.callParent(arguments);
    	this.setItemDisabled(['name','content','pic'],st=='r');
    },
    setItemDisabled:function(items,dis){
    	for(var i = 0;i< items.length;i++){
    		this.lookupI(items[i]).setDisabled(dis);
    	}
    },
    callback:function(o,f,r,s){
    	if(s == 'u'){
    		this.loadById(o.params.id);
    	}else if(s=='r'){
    		this.applyValue(r.responseJson.data);
			this.toStatus(s);
    	}else if(s=='c'){
    	}
    }
});