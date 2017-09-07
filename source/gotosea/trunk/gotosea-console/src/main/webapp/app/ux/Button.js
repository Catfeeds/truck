Ext.define('Rich.ux.Button',{
	override:'Ext.button.Button',
	iconStyle:null,
	onRender:function(){
		this.callParent(arguments);
		if(this.iconStyle){
			//debugger
			this.setIconStyle(this.iconStyle);
		}
	},
	setIconStyle:function(style){
		if(style && this.btnIconEl){
	        this.btnIconEl.applyStyles(style);
		}
        return this;
	}
});
Ext.define('Rich.ux.MenuItem',{
	override:'Ext.menu.Item',
	iconStyle:null,
	onRender:function(){
		this.callParent(arguments);
		if(this.iconStyle){
			this.setIconStyle(this.iconStyle);
		}
	},
	setIconStyle:function(style){
		if(style && this.iconEl){
	        this.iconEl.applyStyles(style);
		}
        return this;
	}
});
Ext.define('Rich.data.proxy.Server',{
	override:'Ext.data.proxy.Server',
	pageParam: 'currentPage',
	startParam: 'start',
	limitParam: 'pageSize'
});