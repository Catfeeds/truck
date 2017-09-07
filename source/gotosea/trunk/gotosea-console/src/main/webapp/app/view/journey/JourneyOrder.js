/**
 * 行程的订单信息
 */
Ext.define('Rich.view.journey.JourneyOrder', {
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
        'Rich.model.Order',
        'Ext.form.FieldSet',
        'Ext.toolbar.Paging',
        'Rich.view.order.OrderDetailWindow',
        'Rich.component.DicComboBox'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.journeyorder',
	
    loadById:function(id){
    	this.id = id;
		var sto = this.lookupI('list').getStore();
		sto.getProxy().extraParams = {journeyId:id};
		sto.loadPage(1);
	},
	initComponent:function(){
		var me = this;		
		var actionItems = [{
            icon: Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        }];
        var store = Ext.create('Ext.data.Store', {
				model:'Rich.model.Order',
		        pageSize: 50,
		        autoLoad:false,
		        proxy: {
			        type: 'ajax',
			        getMethod:function(){return 'post'},
			        url:Rich.Url.journeyOrderPagePath,
			        reader: {
			            type: 'json',
			            root: 'data.pageData',
			            totalProperty: 'data.totalRows',
			            idProperty: 'id'
			        }
			    }
			});
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[{
				flex:1,
				xtype:'gridpanel',
				itemId:'list',
				loadMask: true,					
				padding:'0',
				bodyStyle:'',
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
				   			{ text: '订单编号', dataIndex: 'orderNo',flex: 1 },
				   			{ text: '名称', dataIndex: 'creator',flex: 1 },
					   	    { text: '行程名称', dataIndex: 'jourName',flex: 1 },
					        { text: '创建时间', dataIndex: 'orderTime',flex: 1 },
					        { text: '状态', dataIndex: 'statusDesc',flex: 1 },
					        { text: '订单金额', dataIndex: 'totalFee',flex: 1 },
				        	{
					        	text:'操作',
					            xtype:'actioncolumn',
					            width:120,
					            items:actionItems
				        	}
				]},
				lookDetail:function(record){
					var ot = 3;
					Ext.create('Rich.view.order.OrderDetailWindow').showByOrderId(record.get('id'),ot);
			    },
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    }
			}]
		});
		this.callParent(arguments);
	}
});
