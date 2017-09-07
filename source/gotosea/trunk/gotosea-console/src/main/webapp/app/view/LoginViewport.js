Ext.define('Rich.view.LoginViewport', {
    extend: 'Ext.container.Viewport',
    requires:['Rich.Url','Rich.JsonAjax','Ext.form.Panel','Ext.form.field.Checkbox','Rich.view.LoginForm','Ext.form.FieldContainer'],
    //layout: 'border',
	cls:'login-viewport',
	initComponent:function(){
    	var me = this;
    	Ext.apply(me,{
    		layout: {
			    type: 'vbox',
			    align: 'stretch'
			},
    		items:[{
		    	xtype:'container',
		        region: 'north',
		        //height:90,
		        cls:'login-north',
		        minHeight:50,
		        flex:3,
		        layout: {
			        type: 'hbox',
			        align: 'bottom'
			    },
		        items:[{
		        	xtype:'label',
		        	style:'font-size:18px;color:#a7a7a7;padding-left:10px;text-shadow: 0 -1px 0 #4C4C4C;line-height:50px;',
		        	text:'',//Ext.SYSTEM_NAME,
		        	cls:'login-logo'
		        },{
		        	xtype:'box',
		        	flex:1
		        }]
		    },{
		        region: 'center',
		        xtype: 'panel',
		        height:520,
		        cls:'login-center',
		        bodyCls:'login-center-body',
		        layout:{
		        	type:'hbox',
		        	align: 'middle'
		        },
		        items:[{
		        	xtype:'box',
		        	flex:3
		        },{
		        	xtype:'loginform',
		        	frame:true,
		        	onReady:function(){
		        		window.location.reload();
		        	}
		        },{
		        	xtype:'box',
		        	flex:1
		        }]
		    },{
		        region: 'south',
		        xtype:'toolbar',
		        minHeight:30,
		        cls:'login-south',
		        flex:7,
		        layout: {
			        type: 'hbox',
			        align: 'top'
			    },
		        items:['->',{
		        	xtype:'label',
		        	style:'font-size:12px;color:#7b7b7b;',
		        	height:20,
		        	text:Ext.COPYRIGHT
		        },'->']
		    }]
    	});
    	me.callParent(arguments);
	}
});