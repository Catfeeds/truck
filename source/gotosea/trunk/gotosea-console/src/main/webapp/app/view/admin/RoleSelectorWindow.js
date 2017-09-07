/*
 * 角色选择窗体
 * */
Ext.define('Rich.view.admin.RoleSelectorWindow',{
	requires:['Rich.model.Role','Ext.grid.Panel','Rich.JsonAjax'],
    extend: 'Rich.widget.Window',
    alias:'widget.roleselectorwindow',
    alternateClassName:['Rich.RoleSelectorWindow'],
    //uses:[],
    //resizable:false,
    width:500,
    height:400,
    minWidth:360,
    minHeight:300,
    layout:'fit',
    autoScroll:true,
    title:'选取角色',
    singleCheck:false,
    initComponent:function(){
    	var me = this;
    	var singleCk = this.singleCheck?true:false;
    	Ext.apply(me,{
    	    items:[{
    	    	xtype:'gridpanel',
				itemId:'list',
		    	forceFit:true,
		    	store:{
			        model:'Rich.model.Role',
					proxy: {
				         type:'ajax',
				         url: Rich.Url.searchAllRoles+"?status=1",
				         reader:{
				             type:'json',
				             rootProperty: 'data'
				         }
				     },
				     autoLoad:true
					 //,groupField: 'groupName'
  					 //,sorters: ['resName']
			   },
			   selType: 'checkboxmodel',
			   selModel:{
			   		mode:singleCk?'SINGLE':'MULTI',
			   		toggleOnClick:false,
			   		//checkOnly:true,
			   		allowDeselect:false
			   },
			   columnLines: true,
			   columns:{
				   	defaults:{
				        //sortable:false,
				        draggable:false,
				        enableColumnHide:false,
				        menuDisabled:true
				   	},
				   	items:[
				        {text:'角色ID',hidden:true,dataIndex:'roleId',flex:1},
				        {text:'角色名称',dataIndex:'roleName',flex:3},
				        {text:'创建者',dataIndex:'creater',rightId:Rich.V.display_creater,rightHidden:true,flex:2},
				        {text:'创建时间',dataIndex:'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140}]
				}
    	    }],
    	    buttons:[{
    	    	text:'刷新',
    	    	//hidden:true,
    	    	handler:function(btn){
    	    		var win = btn.up('roleselectorwindow');
    	    		var list = win.getComponent('list');
    	    		list.getStore().reload();
    	    	}
    	    },'->',{
    	    	text:'确定',
    	    	handler:function(btn){
    	    		var win = btn.up('roleselectorwindow');
    	    		var grid = win.getComponent('list');
    	    		var records = grid.getSelectionModel().getSelection();
    	    		var fn = win.returnFn,scope = win.returnScope;
    	    		win.returnFn = null;
    	    		win.returnScope = null;
    	    		if(fn){
    	    			fn.call(scope||window,records);
    	    		}
    	    		win.close();
    	    	}
    	    },{
    	    	text:'取消',
    	    	handler:function(btn){
    	    		btn.up('roleselectorwindow').close();
    	    	}
    	    }]
    	});
    	me.callParent(arguments);
    },
    showFor:function(fn,scope){
    	this.returnFn = fn;
    	this.returnScope = scope;
    	this.show();
    }
});