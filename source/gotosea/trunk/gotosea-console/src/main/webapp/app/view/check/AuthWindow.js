/*
 * 用户实名认证窗体
 * */
Ext.define('Rich.view.check.AuthWindow',{
	requires:[
	'Ext.form.Panel',
	'Rich.component.DicComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.authwindow',
    width:500,
    height:300,
    autoScroll:true,
    title:'商家资格认证',
    
    setV:function(uid){
    	this.lookupI('id').setValue(uid);
    	this.show();
    },
    initComponent:function(){
    	var me = this;
    	
    	var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"1", "name":"认证通过"},
		        {"abbr":"0", "name":"认证不通过"}
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
				    		if(r.data.abbr == 1){
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
    				itemId:'reason',
    				name:'reason'
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
    	this.setV(this.id);
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
			url:Rich.Url.custsCheckPath+vas.id+'/'+vas.status,
			headers:{'Content-Type':'application/json;charset=UTF-8'},
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