/**
 *商家订单
 */
Ext.define('Rich.view.order.Main', {
	requires:[
		'Ext.form.FieldContainer',
        'Ext.form.field.Trigger',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.Value',
        'Rich.Url',
		'Rich.model.Order',
		'Rich.view.order.OrderDetailWindow',
        'Rich.widget.CrudWindow'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.ordermain',
     
	initComponent:function(){
		var me = this;
		
		var al = Rich.RightManager.hasRight(Rich.V.rest_order_merc_list);
		var detail = Rich.RightManager.hasRight(Rich.V.rest_order_merc_detail_id);
		var item = [{
            icon: Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        }];
        
		var store = Ext.create('Ext.data.Store',{
			model:'Rich.model.Order',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        method:'get',
		        url: Rich.Url.orderMercListPath,
		        limitParam: "size",
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalRows'
		        }
		    }
		});
		
		var itms = [{
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
		        fieldLabel: '订单编号',
		        name: 'jourName'
		    },{
		        fieldLabel: '服务类型',
		        name: 'creator'
		    },{
		    	fieldLabel:'用户账户',
		    	name:'orderNo'
		    },{
		    	xtype:'button',
		    	text:'搜索',
		    	cls:'r-btn-font-normal',
		    	style:{float:'right',margin:"5px 10px 5px 10px"},
		    	handler:function(btn){
		    		var vs = this.up('form').getForm().getValues();
		    		var sto = this.up('gridpanel').getStore();
		    		sto.getProxy().extraParams = vs;
		    		sto.loadPage(1);
		    	}
		    },{
		    	xtype:'button',
		    	text:'重置',
		    	cls:'r-btn-font-normal',
		    	style:{float:'right',margin:"5px 10px 5px 0"},
		    	handler:function(btn){
		    		this.up('form').getForm().reset();
		    	}
		    }]
		}];
		
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'gridpanel',
				itemId:'grid',
				loadMask: true,					
				padding:'0',
				selModel:{selType:'checkboxmodel',mode:'MULTI'},
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
			   	    { text: '订单编号', dataIndex: 'orderNo',flex: 1 },
			   	    { text: '商家姓名', dataIndex: 'name',flex: 1 },
			   	    { text: '出行时间', dataIndex: 'serviceDate',flex: 1 },
			        { text: '创建时间', dataIndex: 'createTime',flex: 1 },
			        { text: '状态', dataIndex: 'id',flex: 1 ,renderer:function(v){
			        	return v == 0?'不可用':'可用';
			        	}
			        },{
			        	text:'操作',
			            xtype:'actioncolumn',
			            width:70,
			            items: item
			        }]
				},
				lookDetail:function(rec){
					Ext.create('Rich.view.order.OrderDetailWindow').showByOrderId(rec.get('id'));
					/*Ext.create('Rich.widget.CrudWindow',{
						title:'aaaaaaa',
						width:0.8,
						height:0.8,
						crudForm:{
							xtype:'merchantform',
							tid:rec.get('id')
						}
					}).showByParams(rec.get('id'));*/
			    },
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    },
			    dockedItems:itms
			}]
		});
		me.callParent(arguments);
	}
});