Ext.define('Rich.view.Log', {
	requires:[
		'Rich.model.Route'
    ],
    uses:[],
    extend: 'Ext.grid.Panel',
    alias:'widget.log',
    
    paramId:null,
    paramType:null,
    loadByParam:function(id,type){
    	var sto = this.getStore();
    	var vs = {itemId:id};
    	if(type){
    		vs.type = type;
    	}else{
    		vs.type = this.paramType;
    	}
		sto.getProxy().extraParams = vs;
		sto.loadPage(1);
    },
	initComponent:function(){
		var me = this;
		var url = Rich.Url.handlelogPath;
		var autoLoad = false;
		if(me.paramId && me.paramType){
			url = url+"?itemId="+me.paramId+'&type='+me.paramType;
			autoLoad = true;
		}
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Route',
	        pageSize: 50,
	        autoLoad:autoLoad,
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return "post"},
		        url: url,
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
		            totalProperty: 'data.totalRows'
		        }
		    }
		});
		Ext.apply(me,{
			title: '操作日志',
			loadMask: true,
	    	forceFit:true,
	    	store: store,
		   	bbar: Ext.create('Ext.PagingToolbar', {
	            store: store,
	            displayInfo: true,
	            displayMsg: '显示 {0} - {1} of {2}',
	            emptyMsg: "没有数据",
	            items:[
	                '-']
	        }), 
		   	columnLines: true,
		   	columns: {
			   	defaults:{
			        sortable:false,
			        draggable:false,
			        enableColumnHide:false,
			        menuDisabled:true
			   	},
			   	items:[
			        { text: '操作人', dataIndex: 'adminId',flex: 1 },
			        { text: '操作时间', dataIndex: 'operateTime',flex: 1 },
			        { text: '操作记录', dataIndex: 'operate',flex: 1},
			        { text: '操作原因',    dataIndex: 'reason',flex: 1 }			       					       
			           
			]}
		});
		me.callParent(arguments);
	}
});
