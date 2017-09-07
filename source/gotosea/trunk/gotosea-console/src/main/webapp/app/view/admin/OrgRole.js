Ext.define('Rich.view.admin.OrgRole', {
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
        'Rich.widget.PagingGrid'
    ],
    uses:['Rich.view.admin.RoleSelectorWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.orgrole',
    
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
				xtype:'orgtree',
				itemId:'orgtree',
				resizable:{
		        	handles:'e'
		        },
				frame:true,
				title:'组织',
				margin: '10 10 10 10',
				flex:2,
				tools:[{
				    type:'refresh',
				    tooltip: '刷新组织',
				    handler: function(event, toolEl, panelHeader) {
				        this.up('orgtree').refresh();
				    }
				}],
				listeners:{
					'select':function(me0, record, index, eOpts){
						this.up('orgrole').getCrudForms().doRequest('list',{'orgId':record.get('orgId'),'orgName':record.get('orgName')});
					}
				}
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
					itemId:'list',
					title:'角色',
					bodyStyle:'',
					//frame:true,
					padding:'0',
			    	forceFit:true,
				   store:{
				   		model:'Rich.model.Role',
				        pageSize: 50,
				        proxy:{
					        type: 'ajax',
					        url: Rich.Url.searchRoleByOrgId
					    }
				   	},
			       	doRequest:function(params){
					    this.loadPage(1,params,{
						    scope: this,
						    callback: function(records, o, f) {
						    	if(f){
						    		this.params = o.request.initialConfig.params;
							        this.orgId = this.params.orgId;
									this.orgName = this.params.orgName;
									this.setTitle(this.params.orgName+' > 角色');
						    	}
						    }
						});
			       		return false;
			       },
				   selType: 'checkboxmodel',
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
					        { text: '角色ID', hidden:true,dataIndex: 'roleId'},
					        { text: '角色名称', dataIndex: 'roleName',flex: 1 },
					        { text: '创建者', dataIndex: 'creater',rightId:Rich.V.display_creater,rightHidden:true,width:140 },
					        { text: '创建时间', dataIndex: 'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140 }
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
				    		this.up('crudforms').doRequest('create',{orgId:this.params.orgId,roleIds:ids});
				    	}else{
				    		Rich.Msg.error('提示','请先选取组织.');
				    	}
				    },
				    deleteIds:function(ids){
				    	//var rec = grid.getStore().getAt(rowIndex);
	                    //var mob = rec.get('mobile');
				    	var msg = ids.length > 1?'确定从当前组织中移出这些角色？':'确定从当前组织中移出此角色？';
				    	
	                    this.roleIds = ids;
	                    Ext.Msg.confirm('消息',msg,function(bId){
				    		if(bId=='ok' || bId =='yes'){
				    			this.up('crudforms').doRequest('delete',{orgId:this.params.orgId,roleIds:this.roleIds});
				    		}
				    	},this);
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'添加角色到组织',
					    	rightId:Rich.V.admin_role_addRoleOrg,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
					    		var g = this.up('gridpanel');
					    		if(g.params){
	                        		var win = Ext.create('Rich.view.admin.RoleSelectorWindow',{singleCheck:false});
	                        		win.showFor(this.valueBack,this);
					    		}else{
					    			Rich.Msg.alert('提示','先选取一个组织.');
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
					    },{
					    	text:'移出组织角色',
					    	right:Rich.V.admin_role_delRoleOrg,
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
					    }]
					}]
				},{
					itemId:'create',
					title:'新增角色',
					xtype:'box',
					url:Rich.Url.appendRoleToOrg
					
				},{
					itemId:'delete',
					url:Rich.Url.removeRoleFromOrg,
					xtype:'box',
					html:'删除成功'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
