Ext.define('Rich.view.admin.UserRole', {
	requires:[
		'Rich.JsonAjax',
		'Rich.widget.Message',
		'Ext.layout.container.Border',
		'Rich.view.admin.CRUDForms',
        'Rich.view.admin.OrgTree',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.model.Role',
        'Rich.model.User',
        'Rich.widget.PagingGrid'
    ],
    uses:['Rich.view.admin.OrgSelectorWindow','Rich.view.admin.RoleSelectorWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.userrole',
   
	getCrudForms:function(){
    	return this.getComponent('crudforms');
    },
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			//layout:'border',
			layout: {
		        type: 'hbox',
		        //pack: 'start',
		        align: 'stretch'
			},
			items:[{
				//region:'west',
				flex:3,
				xtype:'panel',
				layout: {
			        type: 'vbox',
			        //pack: 'start',
			        align: 'stretch'
			    },
			    margin: '10 10 10 10',
			    frame:true,
				items:[{
					xtype:'orgtree',
					itemId:'orgtree',
					title:'组织',
					//bodyStyle:'border-bottom:1px solid #ccc;',
					flex:4,
					tools:[{
					    type:'refresh',
					    tooltip: '刷新组织',
					    handler: function(event, toolEl, panelHeader) {
					        this.up('orgtree').refresh();
					    }
					}],
					listeners:{
						'select':function(me0, record, index, eOpts){
							this.ownerCt.getComponent('list').doRequest({'orgId':record.get('orgId'),'orgName':record.get('orgName')});
						}
					}
				},{
					xtype:'paginggrid',
					itemId:'list',
					title:'用户',
					//resizable:true,
			        flex:5,
					//frame:true,
					padding:'0',
					bodyStyle:'',
			    	forceFit:true,
			    	store:{
						model:'Rich.model.User',
				        pageSize: 50,
				        autoLoad:false,
				        proxy:{
					        type: 'ajax',
					        //getMethod:function(){return 'post'},
					        url: Rich.Url.searchUserByOrgIdPath
					    }
			    	},
			       	doRequest:function(params){
					    this.loadPage(1,params,{
						    scope: this,
						    callback: function(reds, o, f){
						    	if(f){
							        this.orgId = o.request.initialConfig.params.orgId;
									this.orgName = o.request.initialConfig.params.orgName;
									this.setTitle(this.orgName+' > 用户');
						    	}
						    }
						});
			       		return false;
			       },
				   //selType: 'checkboxmodel',
				   columnLines: true,
				   columns:{
					   	defaults:{
					        //height:26,
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        { text: '用户名', dataIndex: 'userName',width:120},
					        { text: '昵称', dataIndex: 'nickName',width:120 },
					        { text: '电子邮件', dataIndex: 'email',flex: 1 ,hidden:true},
					        { text: '所属组织', dataIndex: 'orgName',flex: 1 },
					        { text: '创建者', dataIndex: 'creater',flex: 1 ,hidden:true},
					        { text: '创建时间', dataIndex: 'createTime',width:140,hidden:true},
					        { text: '状态', dataIndex: 'status',width:50,hidden:true,renderer: function(value){
							        if (value === 1) {
							            return '启用';
							        }
							        return '禁用';
							    }
							 }
					]},
					listeners:{
						'select':function(me0, record, index, eOpts){
							this.up('userrole').getCrudForms().doRequest('list',{'userName':record.get('userName'),'nickName':record.get('nickName')});
						}
					},
					setValue:function(res){
						if(typeof res == 'string'){
							this.refresh();
						}
				    },
				    refresh:function(){
				    	if(this.orgId){
				    		this.up('crudforms').doRequest('list',{'orgId':this.orgId,'orgName':this.orgName});
				    	}
				    }
				}]
			},{
				//region:'center',
				flex:5,
				xtype:'crudforms',
				itemId:'crudforms',
				frame:true,
				margin: '10 10 10 0',
				//layout:'card',
				defaults:{
					xtype:'form',
					bodyStyle:'padding-top:10px',
					padding:'10 10 10 10'
				},
				requestBack:function(tar,o,f,r){
					if(f){
						var res = r.responseJson;
						if(tar=='create' || tar == 'delete'){
							this.setActiveByValue('list','refresh');
							//this.setActiveByValue('read',res.data);
						}else if(tar == 'list'){
							this.setActiveByValue('list',res,o.params);
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'paginggrid',
					url:Rich.Url.searchRoleByUserName,
					itemId:'list',
					title:'角色',
					bodyStyle:'',
					loadMask:true,
					//frame:true,
					padding:'0',
			    	forceFit:true,
					selType: 'checkboxmodel',
					columnLines: true,
					store:{
						model:'Rich.model.Role',
				        pageSize: 50,
				        autoLoad:false,
				        proxy: {
					        type: 'ajax',
					        //getMethod:function(){return 'post'},
					        url: Rich.Url.searchRoleByUserName
					    }
					},
			       	doRequest:function(params){
					    this.loadPage(1,params,{
						    scope: this,
						    callback: function(records, o, f) {
						    	if(f){
						    		this.params = o.request.initialConfig.params;
									this.setTitle(this.params.nickName+' > 角色');
						    	}
						    }
						});
			       		return false;
			       },
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
					        { text: '角色ID', hidden:true,dataIndex: 'roleId',flex: 1 },
					        { text: '角色名称', dataIndex: 'roleName',flex: 1 },
					        { text: '创建者', dataIndex: 'creater',rightId:Rich.V.display_creater,rightHidden:true,width:140 },
					        { text: '创建时间', dataIndex: 'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140 },
					        { text: '来源', dataIndex: 'orgName',width:140,renderer:function(v){
					        	if(!v){
					        		return '<div style="color:#c1c1c1;">私有<div>';
					        	}
					        	return v;
					        }},
					        {
					        	text:'操作',
					            xtype:'actioncolumn',
					            width:50,
					            items: [{
					                icon: Rich.Url.icons_2,
					                iconCls:'actioncolumn-margin',
					                text:'删除',
					                tooltip: '删除',
					                /*
					                isDisabled:function(view, rowIdx, colIdx, item, record){
					                	if(Rich.RightManager){
					                		return true;
					                	}
					                },
					                */
					                disabled:!Rich.RightManager.hasRight(Rich.V.admin_role_delRoleUser),
					                getClass:function(v, meta, record, rowIdx, colIdx, store, view){
					                	if(record.get('orgId')){
					                		return 'r-hidden';
					                	}
					                },
					                handler: function(gridView, rowIndex, colIndex) {
					                    var rec = gridView.getStore().getAt(rowIndex);
					                    var roleId = rec.get('roleId');
					                    gridView.ownerCt.deleteIds(roleId);
					                }
					            }]
					        }
					]},
					setValue:function(res,params){
						if(typeof res == 'string'){
							this.refresh();
						}
				    },
				    refresh:function(){
				    	if(this.params){
				    		this.up('crudforms').doRequest('list',this.params);
				    	}
				    },
				    addIds:function(ids){
				    	if(this.params){
				    		this.up('crudforms').doRequest('create',{userName:this.params.userName,roleIds:ids});
				    	}else{
				    		Rich.Msg.error('提示','请先选取用户.');
				    	}
				    },
				    deleteIds:function(ids){
				    	//var rec = grid.getStore().getAt(rowIndex);
	                    //var mob = rec.get('mobile');
	                    this.roleIds = ids;
	                    Ext.Msg.confirm('消息','确定移出这些角色？',function(bId){
				    		if(bId=='ok' || bId =='yes'){
				    			this.up('crudforms').doRequest('delete',{userName:this.params.userName,roleIds:this.roleIds});
				    		}
				    	},this);
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'添加角色到用户',
					    	rightId:Rich.V.admin_role_addRoleUser,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
					    		var g = this.up('gridpanel');
					    		if(g.params){
	                        		var win = Ext.create('Rich.view.admin.RoleSelectorWindow',{singleCheck:false});
	                        		win.showFor(this.valueBack,this);
					    		}else{
					    			Rich.Msg.alert('提示','先选取一个用户.');
					    		}
	                        },
	                        valueBack:function(roles){
	                        	if(roles && roles.length > 0)
	                        	{
	                        		var o,ids = [];
	                        		for(o in roles){
	                        			ids.push(roles[o].get('roleId'));
	                        		}
	                        		this.up('gridpanel').addIds(ids);
	                        	}
	                        }
					    }/*,{
					    	text:'移出用户角色',
					    	rightId:Rich.V.admin_role_delRoleUser,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
	                        	var grid = this.up('gridpanel');
	                        	var rs = grid.getSelectionModel().getSelection();
	                        	if(rs.length > 0){
	                        		var ids = [];
	                        		for(var o in rs){
	                        			ids.push(rs[o].get('roleId'));
	                        		}
	                        		grid.deleteIds(ids);
	                        	}else{
	                        		Rich.Msg.alert('提示','未选中任何角色.');
	                        	}
	                        }
					    }*/]
					}]
				},{
					itemId:'create',
					title:'新增角色',
					xtype:'box',
					url:Rich.Url.appendRoleToUser
					
				},{
					itemId:'delete',
					url:Rich.Url.removeRoleFromUser,
					xtype:'box',
					html:'删除成功'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
