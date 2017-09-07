/**
 * 螺旋广告位
 */
Ext.define('Rich.view.page.SpiralMain', {
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
        'Rich.model.Banner',
        'Ext.form.field.File',
        'Ext.form.FieldSet',
        'Rich.view.page.BannerForm',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Rich.view.page.PageMgrWindow',
        'Ext.toolbar.Paging'
    ],
   
    uses:['Rich.widget.CrudWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.spiralmain',
    
     getShipId:function(){
    	return this.ship.get('id');
    },
     
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.advert_spiral_detail);//详情权限
		var used = Rich.RightManager.hasRight(Rich.V.advert_spiral_acfo);//启用/禁用权限
		var del = Rich.RightManager.hasRight(Rich.V.advert_spiral_del);//删除权限
		var al = Rich.RightManager.hasRight(Rich.V.advert_spiral_page);
		var actionItems = [];
		actionItems = actionItems.concat([{
            icon:  Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'详情',
            tooltip: '详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
            icon: Rich.Url.icons_8,
            iconCls:'actioncolumn-margin',
            altText:'启用',
            tooltip: '启用',
            disabled:!used,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doChangeStar(rec);
            }
        },{
            icon: Rich.Url.icons_16,
            iconCls:'actioncolumn-margin',
            altText:'失效',
            tooltip: '失效',
            disabled:!used,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doChangeEnd(rec);
            }
        },{
            icon: Rich.Url.icons_2,
            iconCls:'actioncolumn-margin',
            altText:'删除',
            tooltip: '删除',
            disabled:!del,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doDelete(rec);
            }
        }]);
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Banner',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return "post"},		       
		       	url: Rich.Url.spiralPagePath,	
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
		
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
				text:'新建螺旋广告位',
				rightId:Rich.V.advert_spiral_add,
				handler:function(btn){
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:800,
						height:600,
						crudForm:{
							xtype:'bannerform',
							tid:1,
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('spiralmain').lookupI('grid').getStore().reload();
				}
			}]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[{
					xtype:'gridpanel',
					itemId:'grid',
					loadMask: true,					
					padding:'0',
					bodyStyle:'',
					selModel:{selType:'checkboxmodel',mode:'MULTI'},
					selType: 'checkboxmodel',
					stripeRows:true,
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
				        { text: 'ID', dataIndex: 'id',flex: 1 },
				        { text: '名称', dataIndex: 'name',flex: 1 },
				        { text: '描述', dataIndex: 'depict',flex: 1 },
				        { text: '超链接', dataIndex: 'link',flex: 1 },
				        { text: '排序编号', dataIndex: 'sort',flex: 1 },
				        { text: '创建时间', dataIndex: 'created',flex: 1 },
				        { text: '修改的时间', dataIndex: 'updated',flex: 1 },
				        { text: '是否启用', dataIndex: 'isUsedDesc',flex: 1 },
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:110,
				            items: actionItems
					      }
					]},
					lookDetail:function(record){
						Ext.create('Rich.widget.CrudWindow',{
							title:'螺旋广告详情',
							width:800,
							height:600,
							crudForm:{
								xtype:'bannerform',
								buttons:['u']
							}
						}).showByParams({id:record.get('id')},this.updateReturnFn,this);
					},
					
				    
				    doChangeStar:function(red){
				    	Ext.Msg.confirm('提示','确定要启用这条广告?',function(btn){
				        	if (btn == 'yes'){
				        		Rich.JsonAjax.request({
				        			method:'get',
			    	        		url:Rich.Url.bannerUsedPath,
			    	        		params:{
			    	        			id:red.get('id')
						        	},
			    	        		callback:this.upStateBack,
			    	        		scope:this
				        		});
				        	}
				    	},this);
				    },
				    doChangeEnd:function(red){
				    	Ext.Msg.confirm('提示','确定要禁用这条广告?',function(btn){
				        	if (btn == 'yes'){
				        		Rich.JsonAjax.request({
				        			method:'get',
			    	        		url:Rich.Url.bannerEndPath,
			    	        		params:{
			    	        			id:red.get('id')
						        	},
			    	        		callback:this.upStateBack,
			    	        		scope:this
				        		});
				        	}
				    	},this);
				    	
				    },
				    doDelete:function(red){
				    	Ext.Msg.confirm('提示','确定要删掉这条广告?',function(btn){
				    		if(btn == 'yes'){
						    	Rich.JsonAjax.request({
				        			method:'get',
			    	        		url:Rich.Url.bannerDelePath,
			    	        		params:{
			    	        			ids:red.get('id')
						        	},
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
				    dockedItems:itms
				}]
		});
		me.callParent(arguments);
	}
});
