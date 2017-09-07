﻿Ext.define('Rich.view.ship.ShipTagMain', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
        'Rich.model.RouteDate',
        'Ext.form.field.File',
        'Ext.form.FieldSet',
       	'Rich.view.ship.TagForm',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.Value',
        'Rich.Url'
    ],
   
	    uses:['Rich.widget.CrudWindow'],
	    extend: 'Ext.panel.Panel',
	    alias:'widget.shiptagmain',
	    id:null,
	    loadById:function(id){
	    	this.id = id;
			var sto = this.lookupI('grid').getStore();
			sto.getProxy().extraParams = {id:id};
			sto.loadPage(1);
		},
	
		initComponent:function(){
			var me = this;
			var actionItems = [{
	            icon: 'resources/images/icons/2.png',
	            iconCls:'actioncolumn-margin',
	            altText:'删除',
	            tooltip: '删除',
	            handler: function(gridview, rowIndex, colIndex) {
	                var rec = gridview.getStore().getAt(rowIndex);
	                this.up('gridpanel').removeMem(rec);
	            }
	        }];
		
			var itms = [{
		    	xtype:'form',
		    	docked:'top',
		    	defaults:{
		    		xtype:'textfield',
		    		style:{float:"left",margin:"5px 0  5px 10px"}
		    	}
			}];
			itms.unshift({
				xtype:'toolbar',
				ui:'footer',
				items:[{
				xtype:'button',
				text:'新增销售计划',
				handler:function(btn){
					var id = this.up('shiptagmain').id;
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:0.8,
						height:0.8,
						crudForm:{
							xtype:'tagform',
							tid:id,
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(f,r){
					if(r.responseJson.data == 0){
						Rich.Msg.alert('提示','服务已存在!');
					}else{
						Rich.Msg.alert('提示','添加成功!');
					}
					this.up('shiptagmain').lookupI('grid').getStore().reload();
				}
			}]
		});
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.RouteDate',
	        pageSize: 50,
	        autoLoad:true,	        
	        proxy: {
		        type: 'ajax',
		       	method:'get',		       
		       	url: Rich.Url.shipTagListPath+this.tid,	
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
				id:'seafishaddition',
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
				   	items:[{ text: '服务名称', dataIndex: 'name',flex: 1 },
				        { text: '市场价', dataIndex: 'marketPrice',flex: 1 },
				        { text: '优惠价', dataIndex: 'preferPrice',flex: 1 },
				        { text: '成本价', dataIndex: 'costPrice',flex: 1 },
				        {
				        	text:'操作',
				            xtype:'actioncolumn', 
				            width:110,
				            items: actionItems
				        }
				]},
			    removeMem:function(rec){
			        this.el.mask('删除中...');
	        		Rich.JsonAjax.request({
	        			method:'DELETE',
    	        		url:Rich.Url.shipTagDelPath+rec.get('id'),
    	        		callback:this.removeBack,
    	        		scope:this
	        		});
			    },
    	        removeBack:function(o,f,r){
    	        	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
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
