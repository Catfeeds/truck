﻿/*
 * 查询商家窗体
 */
Ext.define('Rich.view.serve.CustSearchWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	,'Rich.model.Cust'],
    extend: 'Rich.widget.Window',
    alias:'widget.custsearchwindow',
    minWidth:300,
    minHeight:200,
    widthPercent:0.6,
    heightPercent:0.6,
    autoScroll:true,
    title:'查询商家',
    
    callback:null,
    scope:null,
    multiSelect:false,
    
    initComponent:function(){
    	var me = this;
    	var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Cust',
	        pageSize: 50,
	        autoLoad:true,	        
	        proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.custsListPath+'?merchantStatus=3',	
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
    	Ext.apply(me,{
    		layout:'fit',
			items:[{
				xtype:'gridpanel',
				itemId:'grid',
				selType: 'checkboxmodel',
				selModel:{selType:'checkboxmodel',mode:(me.multiSelect?'MULTI':'SINGLE')},
				loadMask: true,					
				padding:'0',
				bodyStyle:'',
		    	forceFit:true,
		    	store: store,
				bbar:Ext.create('Ext.PagingToolbar', {
		            store: store,
		            displayInfo: true,
		            displayMsg: '显示 {0} - {1} of {2}',
		            emptyMsg: "没有数据",
		            items:['-']
		        }),
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
				        { text: '商家名称', dataIndex: 'name',flex: 1 },
				        { text: '微信', dataIndex: 'wechat',flex: 1 },
				        { text: '客户性别', dataIndex: 'sex',flex: 1,renderer:function(v){
			        		if(v == 1){
			        			return '男';
			        		}else if(v == 2){
			        			return '女';
			        		}else{
								return '未知';			        		
			        	}}},
				        { text: '等级',    dataIndex: 'level',flex: 1 },
				        { text: '联系方式', dataIndex: 'phone',flex: 1},			                					                        
				        { text: '创建时间',    dataIndex: 'createTime',flex:1}		
				]}
			}],
    		returnCallback:function(records){
    			//debugger
    			Rich.Relax.add(win,'close');
				//this.callback.call(win.scope || window,records);
    			this.returnValue(records);
    		},
    		
    		buttons:[{
    			text:'确定',
    			handler:function(btn){
    				//debugger
    				win = btn.up('custsearchwindow');
    				var records = win.lookupI('grid').getSelectionModel().getSelection();
    				if(win.multiSelect){
    					win.returnCallback(records);
    				}else{
    					if(records.length > 0){
    						win.returnCallback(records[0]);
    					}else{
    						win.returnCallback(null);
    					}
    				}
    			}
    		}]
    	});
    	me.callParent(arguments);
    }
});