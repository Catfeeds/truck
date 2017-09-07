/*
 * 发送消息
 * */
Ext.define('Rich.view.cust.PushMessageWindow',{
	requires:[
	'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.pushmessagewindow',
    width:0.4,
    height:0.4,
    minWidth:200,
    minHeight:200,
    title:'推送消息',
    
    custid:null,
    showById:function(custid){
    	this.custid = custid;
    	this.show();
    },
    initComponent:function(){
    	var me = this;
    	Ext.apply(me,{
    		items:[{
    			itemId:'form',
    			xtype:'form',
    			padding:'5 10',
    			layout:{
    				type:'vbox',
    				align:'stretch'
    			},
	    		items:[{
					xtype: 'textareafield',
					fieldLabel: '消息内容 ',
				    name: 'msg',
				    flex:1
				}]
	    	}],
	    	buttons:['->',{
    	    	text:'保存',
    	    	handler:function(btn){
    	    		btn.up('window').submit();
    	    	}
    	    }],
    	    submit:function(){
	        	var vas = this.lookupI('form').getForm().getValues();
	        	//vas.id = this.up('window').custid;
	        	//var vas = this.getValues();
	        	vas.id = this.custid;
	        	this.el.mask('..');
        		Rich.JsonAjax.request({
        			method:'get',
	        		url:Rich.Url.custsSengMsgPath,
	        		params:vas,
	        		callback:this.removeBack,
	        		scope:this
        		}); 
    	    },
    	    removeBack:function(){
    	    	this.el.unmask('..');
    	    }
    	});
    	me.callParent(arguments);
    }
});