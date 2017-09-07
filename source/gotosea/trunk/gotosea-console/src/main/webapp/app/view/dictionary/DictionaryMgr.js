 Ext.define('Rich.view.dictionary.DictionaryMgr', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
        'Rich.view.dictionary.DictionaryTree',
        'Ext.form.Panel',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.model.Dictionary',
        'Rich.view.admin.CRUDForms',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Rich.view.dictionary.DictionaryDetail',
        'Rich.widget.PagingGrid',
        'Rich.component.DicComboBox'
    ],
    uses:'Rich.view.sys.OrgSelectorWindow',
    extend: 'Ext.panel.Panel',
    alias:'widget.dictionarymgr',
    getCrudForms:function(){
    	return this.lookupI('crudforms');
    },
    
	initComponent:function(){
		var me = this;
		
		var actionItems = [];
		Ext.apply(me,{
			layout: {
		        type: 'hbox',
		        align: 'stretch'
		    },
			items:[{
				xtype:'dictionarytree',
				itemId:'dictionarytree',
				id:'tree',
				frame:true,
				title:'数据',
				margin: '10 10 10 10',
				flex:2,
				tools:[{
				    type:'refresh',
				    tooltip: '刷新组织',
				    handler: function(event, toolEl, panelHeader) {
				        this.up('dictionarytree').refresh();
				    }
				}],
				tbar:[{
					text:'删除节点',
					handler:function(){
						this.up('dictionarytree').deleteSelect();
					}
				}],
				listeners:{
	                'select':function(me0, record, index, eOpts){
	                	this.up('dictionarymgr').getCrudForms().doRequest('list',{'code':record.data.code,'name':record.data.name,'remark':record.data.remark});
					}
            	}
			},{
				xtype:'crudforms',
				itemId:'crudforms',
				frame:true,
				margin: '10 10 10 0',
				layout:'card',
				flex:5,
				defaults:{
					xtype:'form',
					padding:'10 10 10 10',
					trackResetOnLoad:true
				},
				items:[{
					xtype:'paginggrid',
					itemId:'list',
					title:'详细',
					id:'it',
					padding:'0',
			    	forceFit:true,
			    	selType: 'checkboxmodel',
				   	columnLines: true,
				   	store:{
				   		model:'Rich.model.Dictionary',
				        pageSize: 50,
				        proxy: {
					        type: 'ajax',
					        url:Rich.Url.dictionaryListPath,
					        reader: {
					            rootProperty: 'data'
					        }
					    }
				   	},
				   	doRequest:function(params){
				   		this.loadPage(1,params,{
						    scope: this,
						    callback: function(records, o, f) {
						    	if(f){
						    		this.params = o.request.initialConfig.params;
							        this.code = this.params.code;
									this.remark = this.params.remark;
									this.setTitle(this.params.remark+' > 详情');
						    	}
						    }
						});
			       		return false;
				   	},
				   	columns: {
					   	defaults:{
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					   		{text: '对应字段', dataIndex: 'name',flex: 1 },
					        {text: '字段描述',dataIndex:'remark',flex:1},
		            	 	{text: '字段对应编号', dataIndex: 'code',flex: 1 },
			             	{text: '是否是父类', dataIndex: 'isParent',flex: 1,renderer:function(v){
					       		if(v == 0){
					       			return '不是'
					       		}else if(v == 1){
					       			return '是'
					       		}
					       	}
					       	},{
					        	text:'操作',
					            xtype:'actioncolumn',
					            width:70,
					            items:[{
						            icon:Rich.Url.icons_6,
						            iconCls:'actioncolumn-margin',
						            altText:'修改',
						            tooltip: '修改',
						            handler: function(gridview, rowIndex, colIndex) {
						            	var rec = gridview.getStore().getAt(rowIndex);
						            	Ext.create('Rich.view.dictionary.DictionaryDetail',{
						            		rec:rec.data
						            	}).showFor(this.upStateBack,this);
						            }
						        },{
						            icon: Rich.Url.icons_2,
						            iconCls:'actioncolumn-margin',
						            text:'删除',
						            tooltip: '删除',
						            handler: function(gridview, rowIndex, colIndex) {
						                var rec = gridview.getStore().getAt(rowIndex);
						                this.up('gridpanel').doUpdateState(rec);
						            }
						        }]
					        }
						]},
					doUpdateState:function(rec){
						Ext.Msg.confirm('提示','确定删除这条数据?',function(btn){
							if (btn == 'yes'){
						    	this.el.mask('...');
				        		Rich.JsonAjax.request({
				        			method:'DELETE',
			    	        		url:Rich.Url.dictionaryDeletePath+rec.get('id'),
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
	    	        		this.getStore().reload()
	    	        		this.up('dictionarymgr').lookupI('dictionarytree').refresh();
	    	        		this.up('dictionarymgr').lookupI('list').getStore().loadData([],false)
	    	        		 
	    	        	}
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	ui:'footer',
				    	items:[{
					    	text:'新增分组',
					    	handler:function(btn){
					    		Ext.create('Rich.view.dictionary.DictionaryAdd',{
					    			rec:1
					    		}).showFor(this.upStateBack,this)
					    	},
					    	upStateBack:function(f){
					    		if(f){
	    	        				this.up('dictionarymgr').lookupI('dictionarytree').refresh();
					    		}
					    	}
					    },{
					    	text:'新增数据',
					    	itemId:'adddata',
					    	handler:function(btn){
					    		var grid = this.up('gridpanel');
					    		if(grid.params){
					    			if(grid.params.remark == '字典'){
					    				Rich.Msg.alert('提示','请不要选择根节点.');
					    			}else{
					    				Ext.create('Rich.view.dictionary.DictionaryAdd',{
				    						rec:grid.params
				    					}).showFor(this.upStateBack,this)
					    			}
					    		}else{
					    			Rich.Msg.alert('提示','先选取一个数据.');
					    		}
					    	},
					    	upStateBack:function(f){
					    		if(f){
	    	        				this.up('dictionarymgr').lookupI('list').getStore().reload();
					    		}
					    		
					    	}
					    }]
					}]
				}]
			}]
		});
		this.callParent(arguments);
	}
});
