/**
 *字典增加页面
 */
Ext.define('Rich.view.dictionary.DictionaryUpdate',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.dictionaryupdate',
    width:0.4,
    height:0.6,
    autoScroll:true,
    title:'增加字典数据',
 
    typeName:null,
    typeDesc:null,
    isParent:null,
    parentCode:null,
    itemDesc:null,
    itemCode:null,
    id:null,
    showById:function(typeName,typeDesc,isParent,parentCode,itemDesc,itemCode,id){
    	this.typeName = typeName;
    	this.typeDesc = typeDesc;
    	this.isParent = isParent;
    	this.parentCode = parentCode;
    	this.itemDesc = itemDesc;
    	this.itemCode = itemCode;
    	this.id = id;
    	this.show();
    	this.lookupI('typeName').setValue(typeName);
    	this.lookupI('typeDesc').setValue(typeDesc);
    	this.lookupI('isParent').setValue(isParent);
    	this.lookupI('itemDesc').setValue(itemDesc);
    	this.lookupI('itemCode').setValue(itemCode);
    	this.lookupI('id').setValue(id);
    },
    
    initComponent:function(){
    	var me = this;   
    	Ext.apply(me,{
    		layout:'fit',
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
		            	anchor: '80%'			            
		            }
		        },
		        layout: 'hbox',
		        items: [{xtype:'box',flex:0.1},{
		            items: [{
		                xtype:'hiddenfield',
		                itemId:'id',
		                name: 'id'
		            },{
		                xtype:'textfield',
		                fieldLabel: '名称描述',
		                itemId:'typeDesc',
		                readOnly:true,
		                name: 'typeDesc'
		            },{
		                xtype:'textfield',
		                fieldLabel: '类型名称',
		                itemId:'typeName',
		                readOnly:true,
		                name: 'typeName'
		            },{
		                xtype:'textfield',
		                itemId:'isParent',
		                hidden:true,
		                readOnly:true,
		                name: 'isParent'
		            },{
		                xtype:'textfield',
		                fieldLabel: '对应字段',
		                itemId:'itemCode',
		                allowblank:false,
		                readOnly:true,
		                name: 'itemCode'
		            },{
		                xtype:'textfield',
		                fieldLabel: '字段描述',
		                itemId:'itemDesc',
		                allowblank:false,
		                name: 'itemDesc'
		            }]
		        },{xtype:'box',flex:0.1}]
    		}],
    		buttons:[{
    			text:'提交',
    			handler:function(){
    				this.up('window').submit();
    			}
    		}]
    	    	
    	});
    	me.callParent(arguments);
    },
    submit:function(){
    	var fm = this.lookupI('form');
    	if(!fm.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = fm.getValues();
    	Rich.JsonAjax.request({
			method:'post',
			getMethod:function(){return "post"},
			url:Rich.Url.dictionaryUpdatePath,      	
			params:vas,
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		Ext.getCmp('it').getStore().reload();
    	}
    }
});