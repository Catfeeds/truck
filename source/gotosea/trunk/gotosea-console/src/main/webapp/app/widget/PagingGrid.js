/*
 * 分页表格
 * */
Ext.define('Rich.widget.PagingGrid',{
    extend: 'Ext.grid.Panel',
    alias:'widget.paginggrid',
    requires:['Ext.toolbar.Paging'],
    emptyText:'没有数据',
    loadMask:true,
    initComponent:function(){
    	var me = this;
    	if(me.store && me.store.proxy){
    		if(!me.store.proxy.reader){
    			me.store.proxy.reader = {
					type: 'json',
					rootProperty: 'data.pageData',
					totalProperty: 'data.totalRows'		           
				}
    		}
    	}
    	var store = me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');
    	me.bbar = Ext.create('Ext.toolbar.Paging',{
	        store: store,
	        displayInfo: true,
	        displayMsg: '显示 {0} - {1} of {2}',
	        emptyMsg: "没有数据",
	        items:['-']
       	});
		me.callParent(arguments);
    },
    /*
    onStoreLoad:function(sto,records,f,o){
    	if(records.length == 0){
			var tel = this.getView().getTargetEl();
			if(tel){
				//Ext.core.DomHelper.insertHtml('beforeEnd', tel.dom, '<center><div style="color:red;background-color:#C1DDF1;">'+this.emptyText+'<div></center>');
			}
		}
    },*/
    loadPage:function(page,params,options){
    	var sto = this.getStore();
	    sto.getProxy().extraParams = params;
	    sto.loadPage(page,options);
    }
});