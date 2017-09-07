/**
 * 接收到的消息 
 */
Ext.define('Rich.view.ReceiveMessage',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox','Rich.model.Cust'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.receivemessage',
   
    minWidth:300,
    minHeight:200,
    autoScroll:true,
    title:'收到的消息',
    
    jourId:null,
    getJourneyId:function(){
    	return this.jourId;
    },
    
    initComponent:function(){
    	var me = this;
    	var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Cust',
	        pageSize: 50,
	        autoLoad:true,
	        proxy: {
		        type: 'ajax',
		        //getMethod:function(){return "post"},
		        url: Rich.Url.messagePushAllPath,
		        reader: {
		            type: 'json',
		            rootProperty: 'data.pageData',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
		Ext.apply(me,{
    		layout:'fit',
    		items:[{
					xtype:'gridpanel',
					itemId:'list',
					loadMask: true,    
					padding:'0',
			    	forceFit:true,
			    	store: store,
			    	bbar: Ext.create('Ext.PagingToolbar', {
			            store: store,
			            displayInfo: true,
			             displayMsg: '显示 {0} - {1} of {2}',
			            emptyMsg: "没有数据",
			            items:['-']
			        }),
				    columnLines: true,
				   listeners:{
				    	 'render': function() {
						  this.clockGo();
						  }
				    },
				    clockGo:function(){
				    	var me = this;
					    Ext.TaskManager.start({
					    run: function() {
					    	me.getStore().reload();
					    	//alert('111')
					    },
					    
					    interval: 60000
					  });
				    },
					
				
				    columns: {
					   	defaults:{
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        { text: '标题', dataIndex: 'title',flex:60},
					        { text: '内容', dataIndex: 'alert',flex: 140 }
					       
					]},
						doUpdateState:function(rec){
					    	this.el.mask('请稍后...');
	    	        		Rich.JsonAjax.request({
	    	        			method:'post',
		    	        		url:Rich.Url.messageReadPAth,
		    	        		params:{
		    	        			id:rec.get('id')
		    	        			
					        	},
		    	        		callback:this._upStateBack,
		    	        		scope:this
	    	        		});
					    },
					    _upStateBack:function(o,f,r){
					    	this.el.unmask();
		    	        	if(f){
		    	        		this.getStore().reload();
		    	        	}
					    }
	    	    }]
    	});
    	me.callParent(arguments);
    }
   
});