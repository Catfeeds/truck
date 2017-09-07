
Ext.define('Rich.view.page.KeywordForm',{
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
    alias:'widget.keywordform',
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
	                xtype:'textfield',
	                fieldLabel: '关键字',
	                itemId:'word',
	                name: 'word'
	            },{
	                xtype:'textfield',
	                fieldLabel: '排序编号位置',
	                itemId:'sort',
	                name: 'sort'
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
    	if(!vas.itemType){
    		vas.itemType = this.tid;
    	}
    	return vas;
    },
    cUrl:Rich.Url.keywordAddPath,
    rUrl:Rich.Url.keywordDetailPath,
    uUrl:Rich.Url.keywordUpdatePath,
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    },
    applyValue:function(va){
		this.getForm().setValues(va);
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