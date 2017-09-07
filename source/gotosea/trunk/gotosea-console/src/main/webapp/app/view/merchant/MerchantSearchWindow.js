﻿/*
 * 查询船只窗体
 * */
Ext.define('Rich.view.merchant.MerchantSearchWindow',{
	requires:['Ext.form.Panel',
	'Ext.form.field.ComboBox',
	'Rich.model.Merchant'
	//,'Rich.model.Ship'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.merchantsearchwindow',
    //uses:[],
    //resizable:false,
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
			model:'Rich.model.Merchant',
	        pageSize: 50,
	        autoLoad:true,
	        proxy: {
		        type: 'ajax',
		        method:'post',
		        url: Rich.Url.merchantListPath,
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalRows'		           
		        }
		    }
		});
    	Ext.apply(me,{
    		layout:'fit',
    		items:[{
					xtype:'gridpanel',
					itemId:'grid',
					loadMask: true,
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
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					   	    { text: 'ID', dataIndex: 'custId',flex: 1 },  
					        { text: '商家名称', dataIndex: 'merchant',flex: 1 },
					        { text: '真实姓名', dataIndex: 'realName',flex: 1 },
					        { text: '商家证件名', dataIndex: 'idType',flex: 1 },
					        { text: '商家证件号', dataIndex: 'idNum',flex: 1 },
					        { text: '商家电话', dataIndex: 'phone',flex: 1 },	
					        { text: '商家地址', dataIndex: 'address',flex: 1.5 }
					]}
    			}],
    			dockedItems:[{
	    			docked:'top',
	    			xtype:'form',
	    			style:{padding:"10px"},
			    	docked:'top',
			    	defaults:{
			    		xtype:'textfield',
			    		labelWidth:70,
			    		style:{float:"left",margin:"5px 0  5px 10px"}
			    	},
			    	layout:'auto',
	    			items:[{
				        fieldLabel: '商家名称',
				        labelWidth:60,
				        name: 'merchant'
				    },{
				        fieldLabel: '真实姓名',
				        name: 'realName'
				    },{
				        fieldLabel: '证件号',
				        name: 'idNum'
				    },{
				    	xtype:'fieldcontainer',
				    	layout:'hbox',
				    	style:{float:"right",margin:"5px 10px 5px 10px"},
				    	items:[{
					    	xtype:'button',
					    	text:'重置',
					    	rightId:Rich.V.rest_merchants,
					    	cls:'r-btn-font-normal',
					    	handler:function(btn){
					    		this.up('form').getForm().reset();
					    	}
					    },{
					    	xtype:'button',
					    	text:'搜索',
					    	margin:'0 6 0 0',
					    	cls:'r-btn-font-normal',
					    	rightId:Rich.V.rest_merchants,
					    	handler:function(btn){
					    		var vs = this.up('form').getForm().getValues();
					    		var sto = this.up('gridpanel').getStore();
					    		sto.getProxy().extraParams = vs;
					    		sto.loadPage(1);
					    	}
					    }]
				    }]
	    		}],
    		
    		buttons:[{
    			text:'确定',
    			handler:function(btn){
    				win = btn.up('merchantsearchwindow');
    				var records = win.lookupI('grid').getSelectionModel().getSelection();
    	    		var fn = win.returnFn,scope = win.returnScope;
    	    		win.returnFn = null;
    	    		win.returnScope = null;
    	    		if(fn){
    	    			fn.call(scope||window,records);
    	    		}
    	    		win.close();
    			}
    		}]
    	});
    	me.callParent(arguments);
    }
});