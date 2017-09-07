/** 
 * 商家管理
 */
Ext.define('Rich.view.merchant.Main', {
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
        'Rich.model.Merchant',
        'Ext.form.FieldSet',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Ext.grid.feature.Grouping',
		'Rich.view.merchant.MerchantForm',
		'Ext.form.field.ComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.merchantmain',
    
	initComponent:function(){		
		var me = this;
		
		var al = Rich.RightManager.hasRight(Rich.V.rest_merchants);//列表加载的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_merchant_custId);//详情的权限
		var actionItems = [{
            icon: 'resources/images/icons/6.png',
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        }];
		
		var itms = [{
	    	xtype:'form',
	    	style:{padding:"10px"},
	    	docked:'top',
	    	defaults:{
	    		xtype:'textfield',
	    		labelWidth:70,
	    		anchor:'100%',
	    		style:{float:"left",margin:"5px 0  5px 10px"}
	    	},
	    	layout:'auto',
		    items: [{
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
		}];
		/*,{
	    	xtype:'toolbar',
	    	docked:'top',
	    	items:[{
	    		text:'下线',
	    		hidden:!(type == Rich.V.online),
	    		handler:function(btn){
		            var gd = this.up('gridpanel');
		            var rec = gd.getSelectionModel().getSelection();
		            gd.upDateState(rec,Rich.V.store);
	    		}
	    	},{
	    		text:'上线',
	    		hidden:!(type == Rich.V.store),
	    		handler:function(btn){
		            var gd = this.up('gridpanel');
		            var rec = gd.getSelectionModel().getSelection();
		            gd.upDateState(rec,Rich.V.online);
	    		}
	    	},{
	    		text:'删除',
	    		hidden:!(type != Rich.V.history),
	    		handler:function(btn){
		            var gd = this.up('gridpanel');
		            var rec = gd.getSelectionModel().getSelection();
		            gd.upDateState(rec,Rich.V.history);
	    		}
	    	}]
	    }*/
	    
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Merchant',
	        pageSize: 50,
	        autoLoad:al,
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
				selModel:true,
				selType: 'checkboxmodel',
				loadMask: true,
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
				   	    { text: 'ID', dataIndex: 'custId',flex: 0.3 },  
				        { text: '商家名称', dataIndex: 'merchant',flex: 1 },
				        { text: '真实姓名', dataIndex: 'realName',flex: 1 },
				        { text: '商家证件名', dataIndex: 'idType',flex: 1 },
				        { text: '商家证件号', dataIndex: 'idNum',flex: 1 },
				        { text: '商家电话', dataIndex: 'phone',flex: 1 },	
				        { text: '商家地址', dataIndex: 'address',flex: 1.5 },
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:120,
				            items:actionItems
				        }
				]},
			     upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
			    },
				lookDetail:function(rec){
					//Ext.create('Rich.view.route.RouteDetailWindow',{}).showByRouteId(record.get('id'));
					Ext.create('Rich.widget.CrudWindow',{
						title:'商家详情',
						width:0.6,
						height:0.6,
						crudForm:{
							xtype:'merchantform',
							tid:rec.get('custId')
						}
					}).showByParams({id:rec.get('custId')},this.upStateBack,this);
			    },
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    },
			    dockedItems:itms
			}]
		
		});
		this.callParent(arguments);
	}
});
