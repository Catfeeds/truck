/**
 * 旅游线路管理
 */
Ext.define('Rich.view.route.Main', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Rich.model.Route',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Ext.grid.feature.Grouping',
		'Ext.grid.plugin.CellEditing',
		'Ext.form.field.ComboBox',
		'Rich.view.route.RouteDetailWindow',
		'Rich.view.route.RouteAddWindow'
		//'Rich.view.route.ShipDetailWindow',
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.routemain',
   
    
	initComponent:function(){		
		var me = this;
		var type = me.getItemId();
		var al = Rich.RightManager.hasRight(Rich.V.rest_prod_serve_page);//上下线的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_prod_serve_route_detail_id);//详情的权限	
		var batch = Rich.RightManager.hasRight(Rich.V.rest_prod_serve_switch);//上下线的权限
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
        },{
            iconCls:'actioncolumn-margin',
            altText:'修改上架状态',
            tooltip: '修改上架状态',
            disabled:!batch,
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
               this.up('gridpanel').doUpdateState(rec);
            }
        }];
        
        var store1 = Ext.create('Ext.data.Store',{
			autoLoad:true,
			proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.routeTypePath,	
		        reader: {
		            type: 'json',
		            rootProperty:'data'
		        }
		    },
		    fields: ['key','value']
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
		        fieldLabel: '线路名称',
		        labelWidth:60,
		        name: 'name'
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
				text:'新建线路服务',
				rightId:Rich.V.rest_prod_serve_page,
				handler:function(btn){
					Ext.create('Rich.view.route.RouteAddWindow').showFor(this.returnFn,this);
				},
				returnFn:function(){
					this.up('routemain').lookupI('grid').getStore().reload();
				}
			}]
		});
	    
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Route',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        method:'post',
		        url: Rich.Url.routeListPath+'?type=2001&type=2002',
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalElements'
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
				   	    { text: '序号', dataIndex: 'code',flex: 1 },  
				        { text: '线路名称', dataIndex: 'name',flex: 1 },			       
				        {text: '线路类型', dataIndex: 'type',flex: 1,renderer:function(v){
				        	return v == 2001?'海岛游':'海钓';
				        }},
				        { text: '状态', dataIndex: 'createTime',flex:1},
				        { text: '状态', dataIndex: 'status',flex:1,renderer:function(v){
								return v == 0?'已下架':'已上架';
				        }},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:120,
				            items:actionItems
				        }
				]},
				
				doUpdateState:function(rec){
					var ststus = rec.data.status;
					var msg,uri;
					if(ststus == 0){
						msg = '是否上架此服务?';
						uri = Rich.Url.routeSwichPath+'on/'+rec.data.id;
					}else{
						msg = '是否下架此服务?';
						uri = Rich.Url.routeSwichPath+'off/'+rec.data.id;
					};
					Ext.Msg.confirm('提示',msg,function(btn){
			        	if (btn == 'yes'){
			        		this.el.mask('...');
			        		Rich.JsonAjax.request({
			        			method:'put',
		    	        		url:uri,
		    	        		callback:this.upStateBack,
		    	        		scope:this
			        		});
					    }
			        	this._records = null;
			        	this._type = null;
			    	},this);
				},
			     upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
			    },
				lookDetail:function(rec){//shipdetailwindow
					//Ext.create('Rich.view.route.RouteDetailWindow',{type:rec.data.type,tid:rec.data.id}).showByRouteId(rec.get('id'),rec.get('status'));
			    	Ext.create('Rich.view.route.RouteDetailWindow',{tid:rec.get('id')}).showByRouteId(rec.get('id'),rec.get('status'));
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
