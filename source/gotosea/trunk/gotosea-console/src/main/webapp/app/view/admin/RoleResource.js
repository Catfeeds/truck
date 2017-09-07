Ext.define('Rich.view.admin.RoleResource', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Rich.view.admin.CRUDForms',
        'Rich.view.admin.OrgTree',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.model.Role',
        'Rich.model.Resource',
        'Rich.ux.GridGrouping',
        'Ext.grid.feature.Grouping',
        'Ext.form.field.Checkbox',
        'Ext.selection.CheckboxModel'
    ],
    uses:'Rich.view.admin.ResourceSelectorWindow',
    extend: 'Ext.panel.Panel',
    alias:'widget.roleresource',
	getCrudForms:function(){
    	return this.getComponent('crudforms');
    },
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			layout: {
		        type: 'hbox',
		        //pack: 'start',
		        align: 'stretch'
		    },
			items:[{
				xtype:'crudforms',
				itemId:'rolecrudforms',
				frame:true,
				margin: '10 0 10 10',
				layout:'card',
				flex:3,
				defaults:{
					xtype:'form',
					bodyStyle:'padding-top:10px',
					padding:'10 10 10 10',
					trackResetOnLoad:true
				},
				requestBack:function(tar,o,f,r){
					if(f){
						var res = r.responseJson;
						if(tar=='create' || tar=='update'){
							this.doRequest('list',{});
							this.setActiveByValue('list','refresh');
						}else if(tar == 'delete'){
							this.setActiveByValue('list','refresh');
						}else if(tar == 'list'){
							this.setActiveByValue('list',res.data);
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'gridpanel',
					url:Rich.Url.searchAllRoles,
					itemId:'list',
					title:'角色',
			    	forceFit:true,
			    	store: {
				        model:'Rich.model.Role',
				        sorters: [{property:'createTime',direction:'desc'}]
				    },
				    bodyStyle:'',
					padding:'',
					tools:[{
					    type:'refresh',
					    tooltip: '刷新角色',
					    handler: function(event, toolEl, panelHeader) {
					        this.up('gridpanel').refresh();
					    }
					}],
				   //selType: 'checkboxmodel',
				    columnLines:true,
				    columns: {
					   	defaults:{
					        //height:26,
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        { text: '角色ID', hidden:true,dataIndex:'roleId',flex: 1 },
					        { text: '角色名称', dataIndex: 'roleName',flex: 3 },
					        { text: '创建者', dataIndex: 'creater',rightId:Rich.V.display_creater,rightHidden:true,flex: 2 },
					        { text: '创建时间', dataIndex: 'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140 },
					        { text: '状态', dataIndex: 'status',width:50,renderer: function(value){
							        if (value === 1) {
							            return '启用';
							        }
							        return '禁用';
							    }
							},{
					        	text:'操作',
					            xtype:'actioncolumn',
					            //hidden:!Rich.RightManager.hasRight('admin-roleres-roleupdate'),
					            width:60,
					            items: [{
					                icon: Rich.Url.icons_27,
					                disabled:!Rich.RightManager.hasRight(Rich.V.admin_role_update),
					                iconCls:'actioncolumn-margin',
					                text:'修改',
					                tooltip: '修改',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    this.up('crudforms').setActiveByValue('update',{"roleId":rec.get('roleId'),"roleName":rec.get('roleName'),"status":rec.get('status')});
					                }
					            },{
					                icon: Rich.Url.icons_2,
					                disabled:!Rich.RightManager.hasRight(Rich.V.admin_role_del),
					                iconCls:'actioncolumn-margin',
					                text:'删除',
					                tooltip: '删除',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    var roleName = rec.get('roleName');
					                    this.roleId = rec.get('roleId');
					                    Ext.Msg.confirm('消息','确定删除该角色"'+roleName+'"？',function(bId){
								    		if(bId=='ok' || bId =='yes'){
								    			this.up('crudforms').doRequest('delete',{'roleId':this.roleId});
								    		}
								    	},this);
					                }
					            }]
					        }
					]},
					listeners:{
						'select':function(me0, record, index, eOpts){
							this.up('roleresource').getCrudForms().doRequest('list',{'roleId':record.get('roleId'),'roleName':record.get('roleName')});
						}
					},
					setValue:function(res){
						if(typeof res == 'string'){
							this.refresh();
						}else{
							this.getStore().loadData(res);
							if(res.length == 0){
								var tel = this.getView().getTargetEl();
           	        			if(tel){
           	        				Ext.core.DomHelper.insertHtml('beforeEnd', tel.dom, '<center><div style="color:red;background-color:#C1DDF1;">没有角色<div></center>');
           	        			}
							}
						}
				    },
				    refresh:function(){
				    	this.up('crudforms').doRequest('list',{});
				    },
				    toCreate:function(){
				    	this.up('crudforms').setActiveByValue('create',{'orgId':this.orgId,'orgName':this.orgName});
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'新建角色',
					    	rightId:Rich.V.admin_role_add,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(btn){
					    		//var md = btn.up('users');
					    		this.up('gridpanel').toCreate();
					    	}
					    }]
					}]
				},{
					itemId:'update',
					title:'修改角色信息',
					rightId:Rich.V.admin_role_update,
					url:Rich.Url.editRole,
					layout:'anchor',
				    defaults:{
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '角色ID',
				        xtype: 'hiddenfield',
				        itemId:'roleId',
				        allowBlank:false,
				        name: 'roleId'
				    },{
				        fieldLabel: '角色名称',
				        itemId:'roleName',
				        allowBlank:false,
				        name: 'roleName'
				    },{
				    	xtype:'combo',
				        fieldLabel: '状态',
				        itemId:'status',
				        name: 'status',
				        allowBlank:false,
				        editable:false,
				        displayField: 'display',
				        valueField: 'value',
				        queryMode: 'local',
				        store:Ext.create('Ext.data.Store', {
						    fields: [
						       {name: 'display', type: 'string'},
						       {name: 'value', type: 'int'}
						    ],
						    data:[{'display':'启用','value':1},{'display':'禁用','value':0}]
						})
				    }],
				    setValue:function(va){
						this.getForm().setValues(va);
				    },
				    dockedItems: [{
				        xtype: 'toolbar',
				        itemId:'toolbar',
				        dock: 'bottom',
				        ui: 'footer',
				        items: [{
					    	text:'返回',
					    	itemId:'back',
					    	handler:function(btn){
					    		btn.up('crudforms').getLayout().setActiveItem('list');
					    	}
					    },'->',{
					    	text:'提交',
					    	itemId:'save',
					    	handler:function(btn){
					    		var fm = btn.up('form');
								if(!fm.isValid())
								{
									Rich.Msg.error('错误','有不合法的输入.');
									return;
								}
								var vs = fm.getValues();
								this.up('crudforms').doRequest('update',vs);
					    	}
					    },{
					    	text:'重置',
					    	itemId:'reset',
					    	handler:function(btn){
					    		btn.up('form').getForm().reset();
					    		
					    	}
					    }]
				    }]
				},{
					itemId:'create',
					title:'新建角色',
					url:Rich.Url.addRole,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '角色名称',
				        itemId:'roleName',
				        allowBlank:false,
				        name: 'roleName'
				    },{
				    	xtype:'combo',
				        fieldLabel: '状态',
				        itemId:'status',
				        name: 'status',
				        allowBlank:false,
				        editable:false,
				        displayField: 'display',
				        valueField: 'value',
				        queryMode: 'local',
				        value:0,
				        store:Ext.create('Ext.data.Store', {
						    fields: [
						       {name: 'display', type: 'string'},
						       {name: 'value', type: 'int'}
						    ],
						    data:[{'display':'启用','value':1},{'display':'禁用','value':0}]
						})
				    }],
				    setValue:function(va){
						this.getForm().setValues(va);
				    },
				    dockedItems: [{
				        xtype: 'toolbar',
				        itemId:'toolbar',
				        dock: 'bottom',
				        ui: 'footer',
				        items: [{
					    	text:'返回',
					    	itemId:'back',
					    	handler:function(btn){
					    		btn.up('crudforms').getLayout().setActiveItem('list');
					    	}
					    },'->',{
					    	text:'保存',
					    	itemId:'save',
					    	handler:function(btn){
					    		var fm = btn.up('form');
								if(!fm.isValid())
								{
									Rich.Msg.error('错误','有不合法的输入.');
									return;
								}
								var vs = fm.getValues();
								this.up('crudforms').doRequest('create',vs);
					    	}
					    },{
					    	text:'重置',
					    	itemId:'reset',
					    	handler:function(btn){
					    		btn.up('form').getForm().reset();
					    		
					    	}
					    }]
				    }]
				},{
					itemId:'delete',
					url:Rich.Url.delRole,
					xtype:'box',
					html:'删除角色成功'
				}]
			},{
				xtype:'crudforms',
				itemId:'crudforms',
				frame:true,
				margin: '10 10 10 10',
				layout:'card',
				flex:4,
				defaults:{
					xtype:'form',
					bodyStyle:'padding-top:10px',
					padding:'10 10 10 10'
				},
				requestBack:function(tar,o,f,r){
					if(f){
						if(tar=='create' || tar == 'delete'){
							this.setActiveByValue('list','refresh');
						}else if(tar == 'list'){
							this.setActiveByValue('list',r.responseJson,o.params);
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'gridpanel',
					url:Rich.Url.searchRoleResourceRef,
					itemId:'list',
					title:'权限',
					bodyStyle:'',
					emptyText:'没有数据',
					//frame:true,
					padding:'0',
			    	forceFit:true,
			    	store: {
				        //storeId:'userliststore',
				        model:'Rich.model.Resource',
				        sorters: ['resDesc'],
				        groupField: 'groupName'
				   },
				   selType: 'checkboxmodel',
				   features: [{
				        ftype: 'grouping',
				        groupHeaderTpl: '{groupValue} ({rows.length})',
				        hideGroupedHeader: true,
				        startCollapsed: true
				        //,id: 'featuresGroupName'
				   }],
				   columnLines: true,
				   columns: {
					   	defaults:{
					        //height:26,
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        /*{ text: '终端ID', dataIndex: 'terminalId',flex: 1 },*/
					        { text: '权限ID', dataIndex: 'resId',hidden:true},
					        { text: '权限名称', dataIndex: 'resName',width:180 },
					        { text: '权限描述', dataIndex: 'resDesc',flex:1 },
					        { text: '分组名称', dataIndex: 'groupName',width:140 },
					        { text: '创建者', dataIndex: 'creater',rightId:Rich.V.display_creater,rightHidden:true,width:120 },
					        { text: '创建时间', dataIndex: 'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140 },
					        { text: '关系', dataIndex: 'resAddDele',width:50,renderer: function(value){
							        if (value === 1) {
							            return '无';
							        }
							        return '有';
							    }
							}
					]},
					setValue:function(res,params){
						if(typeof res == 'string'){
							this.refresh();
						}else{
							this.params = params;
							this.setTitle(params.roleName+' > 权限');
							this.getStore().loadData(res.data);
						}
				    },
				    refresh:function(){
				    	if(this.params){
				    		this.up('crudforms').doRequest('list',this.params);
				    	}
				    },
				    addIds:function(ids,c){
				    	if(this.params){
				    		this.up('crudforms').doRequest('create',{roleId:this.params.roleId,resIds:ids,delOrAdd:(c?1:0)});
				    	}else{
				    		Rich.Msg.error('提示','请先选取角色.');
				    	}
				    },
				    deleteIds:function(ids){
				    	//var rec = grid.getStore().getAt(rowIndex);
	                    //var mob = rec.get('mobile');
	                    this.resIds = ids;
	                    Ext.Msg.confirm('消息','确定从角色中移出所选权限?',function(bId){
				    		if(bId=='ok' || bId =='yes'){
				    			this.up('crudforms').doRequest('delete',{roleId:this.params.roleId,resIds:this.resIds});
				    		}
				    	},this);
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'添加权限到角色',
					    	rightId:Rich.V.admin_role_addRoleResource,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
					    		var g = this.up('gridpanel');
					    		if(g.params){
	                        		var win = Ext.create('Rich.view.admin.ResourceSelectorWindow',{singleCheck:false});
	                        		win.showFor(this.valueBack,this);
					    		}else{
					    			Rich.Msg.alert('提示','先在左边选取一个角色.');
					    		}
	                        },
	                        valueBack:function(roles,b){
	                        	if(roles && roles.length > 0)
	                        	{
	                        		var o,ids = [];
	                        		for(o in roles){
	                        			ids.push(roles[o].get('resId'));
	                        		}
	                        		this.up('gridpanel').addIds(ids,b);
	                        	}
	                        }
					    },{
					    	text:'移出角色权限',
					    	rightId:Rich.V.admin_role_delRoleResource,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
	                        	var grid = this.up('gridpanel');
	                        	var rs = grid.getSelectionModel().getSelection();
	                        	if(rs.length > 0){
	                        		var ids = [];
	                        		for(var o in rs){
	                        			ids.push(rs[o].get('resId'));
	                        		}
	                        		grid.deleteIds(ids);
	                        	}else{
	                        		Rich.Msg.alert('提示','未选取任何权限.');
	                        	}
	                        }
					    }]
					}]
				},{
					itemId:'create',
					title:'增加权限',
					xtype:'box',
					url:Rich.Url.addRoleResourceRef
					
				},{
					itemId:'delete',
					url:Rich.Url.delRoleResourceRef,
					xtype:'box',
					html:'删除成功'
				}]
			}]
		});
		setTimeout(function(){
    		me.getComponent('rolecrudforms').doRequest('list',{});
    	},50);
		this.callParent(arguments);
	}
});
