/*
 * 用户实名认证窗体
 * */
Ext.define('Rich.view.finance.AuthWindow',{
	requires:[
	'Ext.form.Panel',
	'Rich.component.DicComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.authwindow',
    width:500,
    height:300,
    autoScroll:true,
    
    showById:function(uid){
    	this.lookupI('id').setValue(uid);
    	this.show();
    },
    initComponent:function(){
    	var me = this;
    	
    	var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"2", "name":"提现成功"},
		        {"abbr":"3", "name":"提现失败"}
		    ]
		});
    	
    	Ext.apply(me,{
    		layout:'fit',
    		items:[{
    			itemId:'form',
    			xtype:'form',
    			padding:'10 10 10 10',
    			layout:{
    				type:'vbox',
    				align:'stretch'
    			},
    			items:[{
    				xtype:'hiddenfield',
    				name:'id',
    				itemId:'id'
    			},{
			    	fieldLabel: '认证结果',
					xtype:'combo',
			        name: 'status',
			        editable:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr',
				    listeners:{
				    	'select':function(e,r){
				    		if(r.data.abbr == 2){
				    			this.up('form').down('textarea').hide();
				    		}else{
				    			this.up('form').down('textarea').show();
				    		}
				    	}
				    }
			     },{
			    	flex:1,
    				fieldLabel:'原因',
    				hidden:true,
    				xtype:'textarea',
    				itemId:'remark',
    				name:'remark'
    			}]
    		}],
    		buttons:['->',{
    			text:'提交审核',
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
    	var  id = vas.id;
    	var sta = vas.status
    	Rich.JsonAjax.request({
			method:'put',
			url:Rich.Url.withdrawStatusPathL+vas.id+'/'+vas.status,
			params:vas,
			callback:this._submitBack,
			scope:this
		});
    },
    _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		this.returnValue(f);
    	}
    }
});