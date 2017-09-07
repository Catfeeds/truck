/**
 *字典增加页面
 */
Ext.define('Rich.view.dictionary.DictionaryAdd',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.dictionaryadd',
    width:0.3,
    height:0.3,
    minWidth:200,
    minHeight:200,
    autoScroll:true,
    title:'增加节点',

    setV:function(rec){
    	var name = this.lookupI('name');
		var pcode = this.lookupI('parentCode');
		var describe = this.lookupI('describe');
    	if(rec == 1){//增加节点
    		
    	}else{
    		name.setValue(rec.name);
    		pcode.setValue(rec.code);
    		describe.setValue(rec.remark);
    		name.setReadOnly(true);
    		describe.setReadOnly(true);
    		describe.show();
    	}
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
		                xtype:'textfield',
		                fieldLabel: '对应字段',
		                itemId:'name',
		                regex:/^[a-zA-Z][a-zA-Z_]+[a-zA-Z]$/,
		                invalidText:'只能包含字母和下划线,且开头不能是下划线',
		                allowBlank:false,
		                name: 'name'
		            },{
		                xtype:'hiddenfield',
		                itemId:'parentCode',
		                value:-1,
		                name: 'parentCode'
		            },{
		                xtype:'textfield',
		                fieldLabel: '字段描述',
		                itemId:'describe',
		                hidden:true,
		                //allowBlank:false,
		                name: 'describe'
		            },{
		                xtype:'textfield',
		                fieldLabel: '新增数据描述',
		                itemId:'remark',
		                allowBlank:false,
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
			method:'post',
			url:Rich.Url.dictionaryAddPath,     	
			params:vas,
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		Rich.Msg.alert('消息','新增成功!')
    		this.returnValue(f);
    	}
    }
});