/**
 * 广告位
 */
Ext.define('Rich.view.page.Main', {
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
        'Rich.view.notice.NoticeForm',
        'Rich.view.page.PageMgrWindow',
        'Ext.toolbar.Paging'
    ],
   
    uses:['Rich.widget.CrudWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.pagemain',
    
     getShipId:function(){
    	return this.ship.get('id');
    },
     
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.advert_banner_queryDetail);//详情权限
		var used = Rich.RightManager.hasRight(Rich.V.advert_banner_acfor);//启用/禁用权限
		var del = Rich.RightManager.hasRight(Rich.V.advert_banner_del);//删除权限
		var al = Rich.RightManager.hasRight(Rich.V.advert_banner_page);
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
		       	url: Rich.Url.bannerPagePath,	
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
				text:'新建广告位',
				rightId:Rich.V.advert_banner_add,
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
					this.up('pagemain').lookupI('grid').getStore().reload();
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
			        plugins:[  
		                 Ext.create('Ext.grid.plugin.CellEditing',{  
		                     clicksToEdit:2  
		                 })  
			        ],
				   	columnLines: true,
				  	columns:[ 
				        {header:'ID',dataIndex:'id',width:50},
				        {header:'名称',dataIndex:'name',flex:1},
				        {header:'描述',dataIndex:'depict',flex:1},
				        {header:'超链接',dataIndex:'link',flex:1},
				        {header:'排序编号',dataIndex:'sort',flex:1,
				                    editor:{  
				                        allowBlank:true  
				                    }},
				        {header:'创建时间',dataIndex:'created',flex:1},
				        {header:'修改的时间',dataIndex:'updated',flex:1},
				        {header:'是否启用',dataIndex:'isUsedDesc',flex:1},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:150,
				            items:actionItems
					}],
					lookDetail:function(record){
						Ext.create('Rich.widget.CrudWindow',{
							title:'广告详情',
							width:800,
							height:600,
							crudForm:{
								xtype:'bannerform',
								buttons:['u']
							}
						}).showByParams({id:record.get('id')},this.upStateBack,this);
					},
					
				    doChangeStar:function(red){
				    	Ext.Msg.confirm('提示','确定要启用这条广告!',function(btn){
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
				    	Ext.Msg.confirm('提示','确定要禁用这条广告!',function(btn){
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
				    doUpdateState:function(red){
				    	
		        		Rich.JsonAjax.request({
		        			method:'get',
	    	        		url:Rich.Url.bannerNumbPath,
	    	        		params:{
	    	        			id:red.get('id'),
	    	        			sort:red.get('sort')
				        	},
	    	        		callback:this.upStateBack,
	    	        		scope:this
		        		});
				    },
				    
				    doDelete:function(red){
				    	Ext.Msg.confirm('提示','确定要删掉这条广告!',function(btn){
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
	    	        	if(f){
	    	        		this.getStore().reload();
	    	        	}
				    },
				    
				    listeners:{
				    	'edit':function(editor, e) {
				    		var befor = e.originalValue;
				    		var last = e.record.data.sort
				    		if(befor == last){
				    			Rich.Msg.alert('消息','没有修改排序编号');
				    		}else{
				    			this.doUpdateState(e.record);
				    		}
				    		
				    	}
				    },
				    dockedItems:itms
				}]
		});
		me.callParent(arguments);
	}
});
