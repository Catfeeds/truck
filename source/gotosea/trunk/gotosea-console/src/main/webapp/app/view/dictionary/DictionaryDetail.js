/**
 *字典数据修改页面
 */
Ext.define('Rich.view.dictionary.DictionaryDetail',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.dictionarydetail',
    width:0.4,
    height:0.4,
    minWidth:200,
    minHeight:200,
    autoScroll:true,
    title:'增加字典数据',

    setV:function(rec){
    	var a = this.lookupI('form').getForm().setValues(rec);
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
		                xtype:'hiddenfield',
		                itemId:'isParent',
		                name: 'isParent'
		            },{
		                xtype:'hiddenfield',
		                itemId:'itemCode',
		                name: 'itemCode'
		            },{
		                xtype:'hiddenfield',
		                itemId:'parentCode',
		                name: 'parentCode'
		            },{
		                xtype:'textfield',
		                fieldLabel: '对应字段',
		                itemId:'name',
		                readOnly:true,
		                name: 'name'
		            },{
		                xtype:'textfield',
		                fieldLabel: '字段对应编号',
		                itemId:'code',
		                readOnly:true,
		                name: 'code'
		            },{
		                xtype:'textfield',
		                fieldLabel: '字段描述',
		                itemId:'remark',
		                name: 'remark'
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
    	this.setV(this.rec);
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
			method:'put',
			url:Rich.Url.dictionaryUpdaPath,      	
			params:vas,
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		Rich.Msg.alert('消息','修改成功!')
    		this.returnValue(f);
    	}
    }
});