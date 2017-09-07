/**
 * 商家资源管理
 */
Ext.define('Rich.view.serve.Main', {
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
        'Ext.form.FieldSet',
        'Ext.toolbar.Paging',
        'Rich.model.Serve',
        'Rich.view.serve.ServeForm',
        'Rich.component.DicComboBox',
        'Ext.grid.feature.Grouping',
		'Ext.grid.plugin.CellEditing',
		'Rich.widget.CrudWindow',
		'Ext.form.field.ComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.servemain',
    
	initComponent:function(){		
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.rest_prod_merchResource_detail);//上下线的权限
		var ststus = Rich.RightManager.hasRight(Rich.V.rest_prod_merchResource_a);//上下线的权限
		var al = Rich.RightManager.hasRight(Rich.V.rest_prod_merchResource_list);
		var actionItems = [{
            icon: Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
            iconCls:'actioncolumn-margin',
            altText:'修改',
            tooltip: '修改',
            disabled:!ststus,
            getClass:function(metadata,rowIndex,colIndex,store){
            	var st = colIndex.data.status;
            	if(st == 0){
            		return 'actioncolumn-margin icons_8'; 
            	}else{
            		return 'actioncolumn-margin icons_16';
            		
            	}
            },
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doUpdate(rec);
            }
        }];
		
        var store1 = Ext.create('Ext.data.Store', {
			proxy:{
				type:'ajax',
				url:Rich.Url.prodLabelPath,
				reader:{
					type:'json',
					rootProperty:'data'
				},
				fields : ['key','value'] 
			}
		});
        
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
		        fieldLabel: '资源名称',
		        name: 'name'
		    },{
		    	fieldLabel : '资源类型',
				xtype:'combobox',
		        labelWidth:90,
		        name: 'air',
		        store: store1,
			    queryMode:'remote',
			    displayField: 'value',
		        editable:false
		     },{
		    	xtype:'fieldcontainer',
		    	layout:'hbox',
		    	style:{float:"right",margin:"5px 10px 5px 10px"},
		    	items:[{
			    	xtype:'button',
			    	text:'搜索',
			    	margin:'0 6 0 0',
			    	cls:'r-btn-font-normal',
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
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    }]
		    }]
		}];
	    
	    itms.unshift({
			xtype:'toolbar',
			ui:'footer',
			items:[{
				xtype:'button',
				text:'新建资源',
				rightId:Rich.V.rest_prod_merchResource,
				handler:function(btn){
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:0.6,
						height:0.8,
						crudForm:{
							xtype:'serveform',
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('servemain').lookupI('grid').getStore().reload();
				}
			}]
	    });
	    
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Serve',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        method:'post',
		        url: Rich.Url.prodListPath,
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
				   		//{ text: 'ID', dataIndex: 'id',flex: 0.3 },
				        { text: '资源名称', dataIndex: 'name',flex: 1 },
				        { text: '所属商家', dataIndex: 'custName',flex: 1 },					       
				        { text: '所属地区',    dataIndex: 'locatorName',flex:1},
				        { text: '资源简介', dataIndex: 'introduction',flex:1 },
				        { text: '资源状态', dataIndex: 'status',flex:1 ,renderer:function(v){
				        	return v == 0?'不可用':'可用';
				        }},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:120,
				            items:actionItems
				        }
				]},
				doUpdate:function(red){
					var sta = red.get('status') == 0?1:0;
					var msg = sta == 0?'确定修改为不可用?':'确定修改为可用?';
			    	var ids = Ext.encode({ids:[red.get('id')],status:sta});
			    	Ext.Msg.confirm('提示',msg,function(btn){
			        	if (btn == 'yes'){
			        		this.el.mask('...');
			        		Rich.JsonAjax.request({
			        			method:'DELETE',
		    	        		url:Rich.Url.prodDeletePath,
		    	        		params:ids,
		    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
		    	        		callback:this.upStateBack,
		    	        		scope:this
			        		});
			        	}
			    	},this);
			    },
			    
			     upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
			    },
			    
				lookDetail:function(record){
					Ext.create('Rich.widget.CrudWindow',{
						title:'资源详情',
						width:0.6,
						heifht:0.6,
						crudForm:{
							xtype:'serveform',
							tid:record.data,
							buttons:['u']
						}
					}).showByData(record);
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
