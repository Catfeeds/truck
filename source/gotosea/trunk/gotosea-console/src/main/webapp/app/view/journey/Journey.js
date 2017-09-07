﻿/**
 * 行程的main  行程的总入口
 */
Ext.define('Rich.view.journey.Journey', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
        'Rich.model.ExtJourney',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.view.journey.JourneyMgrWindow',
        'Rich.component.DicComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.journey',
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.journey_detail);//详情权限
		var actionItems = []
		if(detail){
			actionItems.push({
	            icon: 'resources/images/icons/6.png',
	            iconCls:'actioncolumn-margin',
	            altText:'查看详情',
	            tooltip: '查看详情',
	            handler: function(gridview, rowIndex, colIndex) {
	                var rec = gridview.getStore().getAt(rowIndex);
	                this.up('gridpanel').lookDetail(rec);
	            }
			})
		}
		var al = Rich.RightManager.hasRight(Rich.V.journey_query);//分页权限
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.ExtJourney',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return "post"},
		        url: Rich.Url.searchJourneyPath,
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
		
		var itm = [{
	    	xtype:'form',
	    	style:{padding:"10px"},
	    	docked:'top',
	    	defaults:{
	    		xtype:'textfield',
	    		labelWidth:70,
	    		style:{float:"left",margin:"5px 0  5px 10px"}
	    	},
	    	layout:'auto',
			items: [{
			        fieldLabel: '行程编号',
			        name: 'journeyNumber'
			    },{
			        fieldLabel: '行程名称',
			        name: 'journeyName'
			    },{
			        fieldLabel: '线路编号',
			        name: 'routeNumber'
			    }/*,{
			    	fieldLabel:'发起人',
			    	name:'orginator'
			    }*/,{
		            xtype      : 'fieldcontainer',
		            fieldLabel : '创建时间',
		            width:300,
		            labelWidth:60,
		            defaults: {
		                hideLabel: true
		            },
		            layout: 'hbox',
		            items: [{
						xtype: 'datefield',
						flex:1,
					    anchor: '100%',
					    name: 'create_begin',
					    format:'Y-m-d',
					    maxValue: new Date()
					},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
						xtype: 'datefield',
						flex:1,
					    anchor: '100%',
					    name: 'create_end',
					    format:'Y-m-d',
					    maxValue: new Date()
					}]
		        },{
			    	xtype:'diccombo',
			        fieldLabel: '行程状态',
			        itemId:'status',
			        name: 'journeyState',
			        editable:false,
			        typeName:'journey_state'
			    },{
			    	xtype:'diccombo',
			        fieldLabel: '线路类型',
			        itemId:'fromType',
			        name: 'fromType',
			        editable:false,
			        typeName:'route_from_type'
			    },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	style:{float:"right",margin:"5px 10px 5px 0"},
			    	rightId:Rich.V.journey_query,
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    },{
			    	xtype:'button',
			    	text:'搜索',
			    	cls:'r-btn-font-normal',
			    	style:{float:"right",margin:"5px 10px 5px 10px"},
			    	rightId:Rich.V.journey_query,
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    }]
		}]
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'gridpanel',
				itemId:'list',
				loadMask: true,					
					padding:'0',
				selModel:true,
				selType: 'checkboxmodel',
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
			   	columns: {
				   	defaults:{
				        sortable:false,
				        draggable:false,
				        enableColumnHide:false,
				        menuDisabled:true
				   	},
				   	items:[
				   		{ text: '序号', dataIndex: 'id',flex: 1 },
				        { text: '行程编号', dataIndex: 'number',flex: 1 },
				        { text: '行程名称', dataIndex: 'name',flex: 1 },
				        { text: '线路编号', dataIndex: 'routeNo',flex: 1 },
				       	{ text: '线路类型', dataIndex: 'fromTypeDesc',flex: 1},
				       	{ text: '发起人', dataIndex: 'orginator',flex: 1},
				        { text: '创建日期', dataIndex: 'createTime',width:140 },
				        { text: '行程状态', dataIndex: 'stateDesc',flex: 1},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:70,
				            items: actionItems
				        }
				]},
				lookDetail:function(record){
					Ext.create('Rich.view.journey.JourneyMgrWindow',{
						fromType:record.get('fromType')
					}).showById(record.get('id'),record.get('state'));
			    },
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    },
			    dockedItems:itm
			}]
		});
		this.callParent(arguments);
	}
});
