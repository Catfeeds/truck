/*
 * 资源选择窗体
 * */
Ext.define('Rich.view.admin.ResourceSelectorWindow',{
	requires:['Ext.grid.feature.Grouping','Rich.ux.GridGrouping','Rich.JsonAjax','Rich.model.Resource','Ext.selection.CheckboxModel'],
    extend: 'Rich.widget.Window',
    alias:'widget.resourceselectorwindow',
    //alternateClassName:['Rich.ResourceSelectorWindow'],
    //uses:[],
    //resizable:false,
    width:600,
    height:0.8,
    minWidth:360,
    minHeight:300,
    layout:'fit',
    autoScroll:true,
    title:'选取资源',
    singleCheck:false,
    initComponent:function(){
    	var me = this;
    	var singleCk = this.singleCheck?true:false;
    	Ext.apply(me,{
    	    items:[{
    	    	xtype:'gridpanel',
				itemId:'list',
		    	forceFit:true,
		    	store: {
			        model:'Rich.model.Resource',
					proxy: {
				         type: 'ajax',
				         url: Rich.Url.searchAllResources,
				         reader: {
				             type: 'json',
				             rootProperty: 'data'
				         }
				     },
				     autoLoad: true,
					 groupField: 'groupName',
  					 sorters: ['resDesc']
			   },
			   selType: 'checkboxmodel',
			   selModel:{
			   		mode:singleCk?'SINGLE':'MULTI'
			   		//toggleOnClick:false,
			   		//checkOnly:true,
			   		//allowDeselect:false
			   },
			   features: [{
			        ftype: 'grouping',
			        groupHeaderTpl: '{groupValue} ({rows.length})',
			        hideGroupedHeader: true,
			        collapsible:true,
			        startCollapsed:true
			        //,id: 'featuresGroupName'
			    }],
			   columnLines: true,
			   columns: {
				   	defaults:{
				        //height:26,
				        sortable:false,
				        draggable:false,
				        enableColumnHide:false,
				        menuDisabled:true
				   	},
				   	items:[
				        { text: '权限ID',hidden:true,dataIndex: 'resId'},
				        { text: '权限名称', dataIndex: 'resName',width:180 },
				        { text: '权限描述', dataIndex: 'resDesc',flex:1 },
				        { text: '分组名称', dataIndex: 'groupName'}
				]}
    	    }],
    	    buttons:[{
    	    	xtype:'label',
    	    	text:'不包含'
    	    },{
    	    	itemId:'checkbox',
    	    	xtype:'checkboxfield'
    	    },{
    	    	xtype:'label',
    	    	text:'(勾选表示去除所选权限)'
    	    },{
    	    	text:'刷新',
    	    	hidden:true,
    	    	handler:function(btn){
    	    		var win = btn.up('resourceselectorwindow');
    	    		var list = win.getComponent('list');
    	    		list.getStore().reload();
    	    	}
    	    },'->',{
    	    	text:'确定',
    	    	handler:function(btn){
    	    		var win = btn.up('resourceselectorwindow');
    	    		var list = win.getComponent('list');
    	    		var records = list.getSelectionModel().getSelection();
    	    		var fn = win.returnFn,scope = win.returnScope;
    	    		win.returnFn = null;
    	    		win.returnScope = null;
    	    		if(fn){
    	    			var b = btn.ownerCt.getComponent('checkbox').checked;
    	    			fn.call(scope||window,records,b);
    	    		}
    	    		win.close();
    	    	}
    	    },{
    	    	text:'取消',
    	    	handler:function(btn){
    	    		btn.up('resourceselectorwindow').close();
    	    	}
    	    }]
    	});
    	me.callParent(arguments);
    },
    //returnFn
    //returnScope
    showFor:function(fn,scope){
    	this.returnFn = fn;
    	this.returnScope = scope;
    	this.show();
    }
});