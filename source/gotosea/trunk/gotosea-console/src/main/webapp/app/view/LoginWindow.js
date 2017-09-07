/*
 * 登录窗体
 * */
Ext.define('Rich.view.LoginWindow',{
	requires:['Rich.view.LoginForm'],
    extend: 'Rich.widget.Window',
    alias:'widget.loginwindow',
    //uses:[],
    resizable:false,
    width:360,
    height:320,
    minWidth:360,
    minHeight:320,
    layout:'fit',
    title:'登录',
    initComponent:function(){
    	var me = this;
    	Ext.apply(me,{
    	    items:[{
    	    	xtype:'loginform',
    	    	onReady:function(){
    	    		Rich.RightManager.doFreshUser();
    	    		this.up('window').returnValue(true);
    	    	}
    	    }]
    	});
    	me.callParent(arguments);
    }
});