/**
 * 广告位
 */
Ext.define('Rich.view.banner.Main',{
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
        'Ext.layout.component.FieldSet',
        'Rich.view.banner.BannerForm',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging'
    ],
   
    uses:['Rich.widget.CrudWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.bannermain',
    
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.rest_banner_detail);//详情权限
		var used = Rich.RightManager.hasRight(Rich.V.rest_banner_status);//启用/禁用权限
		var al = Rich.RightManager.hasRight(Rich.V.rest_banner_list);
		var actionItems = [];
		actionItems = actionItems.concat([{
            icon:  Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'详情',
            tooltip: '详情',
            diasbled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
            iconCls:'actioncolumn-margin',
            altText:'修改可见/不可见',
            tooltip:'修改可见/不可见',
            disabled:!used,
            getClass:function(metadata,rowIndex,colIndex,store){
            	var st = colIndex.data.isHidden;
            	if(st == 0){
            		return 'actioncolumn-margin icons_16';
            	}else{
            		return 'actioncolumn-margin icons_8'; 
            	}
            },
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').toUpdatastatus(rec);
            }
            
        },{
            icon: Rich.Url.icons_2,
            iconCls:'actioncolumn-margin',
            altText:'删除',
            tooltip: '删除',
            disabled:!used,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doDelete(rec);
            }
        }]);
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Banner',
	        pageSize: 50,
	        autoLoad:true,	        
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return "post"},		       
		       	url: Rich.Url.bannerListPath,	
		        reader: {
		            type: 'json',
		            root: 'data.content',
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
	    	},
	    	layout:'auto',
	    	items:[{
			        fieldLabel: '广告名称',
			        name: 'titleDesc'
			    },{
		            xtype      : 'fieldcontainer',
		            fieldLabel : '创建日期',
		            width:400,
		            defaults: {
		                hideLabel: true
		            },
		            layout: 'hbox',
		            items: [{
						xtype: 'datefield',
						flex:1,
					    anchor: '100%',
					    name: 'startDate',
					    format:'Y-m-d'
					},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
						xtype: 'datefield',
						flex:1,
						name: 'endDate',
					    anchor: '100%',
					    format:'Y-m-d'
					}]
		        },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_art_list,
			    	style:{float:"right",margin:"5px 10px 5px 0"},
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    },{
			    	xtype:'button',
			    	text:'搜索',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_art_list,
			    	style:{float:"right",margin:"5px 10px 5px 10px"},
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    }]
			}];
			
			itms.unshift({
				xtype:'toolbar',
				ui:'footer',
				items:[{
				xtype:'button',
				text:'新建广告位',
				rightId:Rich.V.rest_banner_add,
				handler:function(btn){
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:0.4,
						height:0.5,
						crudForm:{
							xtype:'bannerform',
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('bannermain').lookupI('grid').getStore().reload();
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
				        {header:'排序',dataIndex:'sortOrder',flex:1},
				        {header:'广告名称',dataIndex:'titleDesc',flex:1},
				        {header:'超链接',dataIndex:'imgLink',flex:1},
				        {header:'是否可见',dataIndex:'isHidden',flex:1,renderer:function(v){return v==0?'可见':'不可见'}},
				        //{header:'创建人',dataIndex:'creator',flex:1},
				        {header:'创建时间',dataIndex:'createTime',flex:1},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:150,
				            items:actionItems
					}],
					lookDetail:function(rec){
						Ext.create('Rich.widget.CrudWindow',{
							title:'广告详情',
							width:0.4,
							height:0.5,
							crudForm:{
								xtype:'bannerform',
								buttons:['u']
							}
						}).showByData({data:rec.data,ty:1},this.upStateBack,this);
					},
					
				    toUpdatastatus:function(rec){
				    	var ih = rec.get('isHidden') == 0?1:0;
				    	var vas = Ext.encode({id:rec.get('id'),isHidden:ih});
				    	Ext.Msg.confirm('提示','确定要修改这条广告可用/不可用?',function(btn){
				    		if(btn == 'yes'){
				        		Rich.JsonAjax.request({
				        			method:'put',
			    	        		url:Rich.Url.bannerAddPath,
			    	        		params:vas,
			    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
			    	        		callback:this.upStateBack,
			    	        		scope:this
				        		});
						    }
						},this);
				    },
				    
				    doDelete:function(red){
				    	var vas = Ext.encode({id:red.get('id'),isDelete:1});
				    	Ext.Msg.confirm('提示','确定要删掉这条广告!',function(btn){
				    		if(btn == 'yes'){
						    	Rich.JsonAjax.request({
				        			method:'put',
			    	        		url:Rich.Url.bannerAddPath,
			    	        		params:vas,
						        	headers:{'Content-Type':'application/json;charset=UTF-8'},
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
