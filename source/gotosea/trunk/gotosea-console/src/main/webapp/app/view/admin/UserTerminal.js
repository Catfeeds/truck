Ext.define('Rich.view.admin.UserTerminal', {
	requires:[
		'Rich.JsonAjax',
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.layout.container.Border',
		'Rich.view.admin.CRUDForms',
        'Rich.view.admin.OrgTree',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.view.admin.TerminalModel',
        'Rich.model.User'
    ],
    uses:['Rich.view.admin.OrgSelectorWindow','Rich.view.terminal.SelectorWindow'],
    extend: 'Ext.panel.Panel',
    alias:'widget.userterminal',
   
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
							this.ownerCt.getComponent('list').doRequest({'searchValue.orgId':record.get('orgId'),'searchValue.orgName':record.get('orgName')});
						}
					}
				},{
					xtype:'gridpanel',
					itemId:'list',
					title:'用户',
					//resizable:true,
			        flex:5,
					//frame:true,
					padding:'0',
					bodyStyle:'',
			    	forceFit:true,
			    	store: {
				        model:'Rich.model.User'
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
					        { text: '用户名', dataIndex: 'user.userName',flex: 1 },
					        { text: '昵称', dataIndex: 'user.nickName',flex: 1 },
					        { text: '电子邮件', dataIndex: 'user.email',flex: 1 ,hidden:true},
					        { text: '创建者', dataIndex: 'user.creater',flex: 1 ,hidden:true },
					        { text: '创建时间', dataIndex: 'user.createTime',width:140  ,hidden:true},
					        { text: '状态', dataIndex: 'user.status',width:50,hidden:true,renderer: function(value){
							        if (value === 1) {
							            return '启用';
							        }
							        return '禁用';
							    }
							 }
					]},
					listeners:{
						'select':function(me0, record, index, eOpts){
							this.up('userterminal').getCrudForms().doRequest('list',{'userName':record.get('user.userName')});
						}
					},
					setValue:function(res){
						if(typeof res == 'string'){
							this.refresh();
						}else{
							this.orgId = res.orgId;
							this.orgName = res.orgName;
							this.setTitle(res.orgName+' > 用户');
							this.getStore().loadData(res.data);
							if(res.data.length == 0){
								var tel = this.getView().getTargetEl();
	       	        			if(tel){
	       	        				Ext.core.DomHelper.insertHtml('beforeEnd', tel.dom,'<center><div style="color:red;background-color:#C1DDF1;">没有用户<div></center>');
	       	        			}
							}
						}
				    },
				    doRequest:function(params){
						this.setLoading('');
						Rich.JsonAjax.request({
							url:Rich.Url.searchUserByOrgIdPath,
							params:params,
							callback:this.requestBack_,
							scope:this
						});
					},
					requestBack_:function(o,f,r){
						this.setLoading(false);
						if(f){
							var res = r.responseJson;
							this.setValue(res);
						}
					},
				    refresh:function(){
				    	if(this.orgId){
				    		this.up('crudforms').doRequest('list',{'searchValue.orgId':this.orgId,'searchValue.orgName':this.orgName});
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
							this.setActiveByValue('list',res.data,o.params);
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'gridpanel',
					url:Rich.Url.searchTerminalByUserNamePath,
					itemId:'list',
					title:'车辆',
					bodyStyle:'',
					//frame:true,
					padding:'0',
			    	forceFit:true,
			    	store: {
				        //storeId:'userliststore',
				        model:'Rich.view.admin.TerminalModel'
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
					        /*{ text: '终端ID', dataIndex: 'terminalId',flex: 1 },*/
					        { text: 'SIM卡号', dataIndex: 'mobile',flex: 1 },
					        { text: '车牌号', dataIndex: 'plateNum',flex: 1 },
					        { text: '别名', dataIndex: 'aliasName',flex: 1 },
					        { text: '创建时间', dataIndex: 'createTime',width:140 },
					        { text: '状态', dataIndex: 'status',width:50,renderer: function(value){
							        if (value === 1) {
							            return '启用';
							        }
							        return '禁用';
							    }
							 },
					        {
					        	text:'操作',
					            xtype:'actioncolumn',
					            hidden:!Rich.RightManager.hasRight('admin-usertmnl-delete'),
					            width:50,
					            items: [/*{
					                icon: 'resources/images/icons/fam/page_white_edit.png',  // Use a URL in the icon config
					                text:'修改',
					                tooltip: '修改',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    this.up('crudforms').setActiveByValue('update',rec.getData());
					                }
					            },*/{
					                icon: 'resources/images/icons/fam/delete.png',
					                text:'删除',
					                tooltip: '删除',
					                handler: function(gridView, rowIndex, colIndex) {
					                    var rec = gridView.getStore().getAt(rowIndex);
					                    var mob = rec.get('mobile');
					                    gridView.ownerCt.deleteIds(mob);
					                }
					            }]
					        }
					]},
					setValue:function(res,params){
						if(typeof res == 'string'){
							this.refresh();
						}else{
							this.params = params;
							this.setTitle(params.userName+' > 车辆');
							this.getStore().loadData(res);
							if(res.length == 0){
								var tel = this.getView().getTargetEl();
           	        			if(tel){
           	        				Ext.core.DomHelper.insertHtml('beforeEnd', tel.dom, '<center><div style="color:red;background-color:#C1DDF1;">没有车辆<div></center>');
           	        			}
							}
						}
				    },
				    refresh:function(){
				    	if(this.params){
				    		this.up('crudforms').doRequest('list',this.params);
				    	}
				    },
				    addIds:function(ids){
				    	if(this.params){
				    		this.up('crudforms').doRequest('create',{userName:this.params.userName,mobiles:ids});
				    	}else{
				    		Rich.Msg.error('提示','请先选取用户.');
				    	}
				    },
				    deleteIds:function(ids){
				    	//var rec = grid.getStore().getAt(rowIndex);
	                    //var mob = rec.get('mobile');
	                    this.mobs = ids;
	                    Ext.Msg.confirm('消息','确定移出车辆"'+ids+'"？',function(bId){
				    		if(bId=='ok' || bId =='yes'){
				    			this.up('crudforms').doRequest('delete',{userName:this.params.userName,mobiles:this.mobs});
				    		}
				    	},this);
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'添加车辆到用户',
					    	rightId:'admin-usertmnl-create',
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
	                        	var win = Ext.create('Rich.view.terminal.SelectorWindow',{singleCheck:false});
	                        	win.showFor(this.valueBack,this);
	                        },
	                        valueBack:function(ids){
	                        	if(ids && ids.length > 0)
	                        	{
	                        		this.up('gridpanel').addIds(ids.join(','));
	                        	}
	                        }
					    },{
					    	text:'移出车辆',
					    	rightId:'admin-usertmnl-delete',
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(){
	                        	var grid = this.up('gridpanel');
	                        	var rs = grid.getSelectionModel().getSelection();
	                        	if(rs.length > 0){
	                        		var ids = [];
	                        		for(var o in rs){
	                        			ids.push(rs[o].get('mobile'));
	                        		}
	                        		grid.deleteIds(ids.join(','));
	                        	}else{
	                        		Rich.Msg.alert('提示','未选中任何车辆.');
	                        	}
	                        }
					    }]
					}]
				},{
					itemId:'create',
					title:'新增车辆',
					xtype:'box',
					url:Rich.Url.addTerminalUserRefPath
					
				},{
					itemId:'delete',
					url:Rich.Url.delTerminalUserRefPath,
					xtype:'box',
					html:'删除成功'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
