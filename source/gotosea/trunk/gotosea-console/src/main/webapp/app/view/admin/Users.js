Ext.define('Rich.view.admin.Users', {
	requires:[
		'Rich.widget.Message',
		'Rich.view.admin.CRUDForms',
        'Rich.view.admin.OrgTree',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.model.User',
        'Ext.form.FieldSet',
        'Rich.widget.PagingGrid',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox'
    ],
    uses:'Rich.view.admin.OrgSelectorWindow',
    extend: 'Ext.panel.Panel',
    alias:'widget.users',
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
						this.up('users').getCrudForms().doRequest('list',{'orgId':record.get('orgId'),'orgName':record.get('orgName')});
					}/*,
					'itemdblclick0':function(me0,record,item,index,e,eOpts){
	            		me0.up('users').getCrudForms().doRequest('list',{'orgId':record.get('orgId'),'orgName':record.get('orgName')});
            		}*/
				}/*,
				tbar:[{
				    	text:'新增',
				    	handler:function(btn){
				    		var rds = this.up('orgtree').getSelectionModel().getSelection();
				    		var va = null;
				    		if(rds.length > 0){
				    			va = {
				    				'org.parentId':rds[0].get('orgId'),
				    				'org.parentName':rds[0].get('orgName')
				    			};
				    		}
				    		btn.up('organization').getCrudForms().setActiveByValue('create',va);
				    	}
				    }]*/
			},{
				xtype:'crudforms',
				itemId:'crudforms',
				frame:true,
				margin: '10 10 10 0',
				layout:'card',
				flex:5,
				defaults:{
					xtype:'form',
					bodyStyle:'padding-top:10px',
					padding:'10 10 10 10',
					trackResetOnLoad:true
				},
				requestBack:function(tar,o,f,r){
					if(f){
						var res = r.responseJson.data;
						if(tar=='create' || tar=='update'){
							this.setActiveByValue('list','refresh');
							//this.doRequest('list',{'orgId':res['orgId'],'orgName':res['orgName']});
							//this.setActiveByValue('read',res.data);
						}else if(tar == 'delete'){
							this.setActiveByValue('list','refresh');
						}else if(tar == 'list'){
							this.setActiveByValue('list',r.responseJson);
						}else if(tar == 'loginout'){
						
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'paginggrid',
					//url:Rich.Url.searchUserByOrgIdPath,
					itemId:'list',
					title:'用户',
					loadMask: true,
					//frame:true,
					padding:'0',
					bodyStyle:'',
			    	forceFit:true,
			    	/*
			    	store: {
				        model:'Rich.model.User',
				        reader: {
				            type: 'json',
				            root: 'data.pageData',
				            totalProperty: 'data.totalRows'		           
				        }
				   },
				   */
				   	store:{
				   		model:'Rich.model.User',
				        pageSize: 50,
				        proxy:{
					        type: 'ajax',
					        //getMethod:function(){return 'post'},
					        url: Rich.Url.searchUserByOrgIdPath
					    }
				   	},
			       	doRequest:function(params){
			       		this.up('crudforms').setActiveByValue('list',null);
					    this.loadPage(1,params,{
						    scope: this,
						    callback: function(records, o, f) {
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
				   columns: {
					   	defaults:{
					        //height:26,
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        { text: '用户名', dataIndex: 'userName',width:120},
					        { text: '昵称', dataIndex: 'nickName',flex: 1 },
					        { text: '手机号', dataIndex: 'phone',flex: 1 },
					        { text: '电子邮件', dataIndex: 'email',flex: 1 },
					        { text: '所属组织', dataIndex: 'orgName',flex: 1 },
					        { text: '创建者', dataIndex: 'creater',rightId:Rich.V.display_creater,rightHidden:true,width:120 },
					        { text: '创建时间', dataIndex: 'createTime',rightId:Rich.V.display_create_time,rightHidden:true,width:140 },
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
					            //hidden:!Rich.RightManager.hasRight(['admin-user-update','admin-user-force']),
					            width:70,
					            items: [{
					                icon: Rich.Url.icons_27,
					                iconCls:'actioncolumn-margin',
					                altText:'修改',
					                rightHidden:true,
					                disabled:!Rich.RightManager.hasRight(Rich.V.admin_user_update),
					                tooltip: '修改',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    this.up('crudforms').setActiveByValue('update',rec.getData());
					                }
					            }/*,{
					                icon: 'resources/images/icons/fam/delete.png',
					                text:'删除',
					                tooltip: '删除',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    var username = rec.get('userName');
					                    this.userName = username;
					                    Ext.Msg.confirm('消息','确定删除用户"'+username+'"？',function(bId){
								    		if(bId=='ok' || bId =='yes'){
								    			this.up('crudforms').doRequest('delete',{'user.userName':this.userName});
								    		}
								    	},this);
					                }
					            },{
					                altText:'踢出登录',
					                disabled:!Rich.RightManager.hasRight('admin-user-force'),
					                icon: Rich.Url.icons_15,
					                iconCls:'actioncolumn-margin',
					                tooltip: '踢出登录',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    var username = rec.get('user.userName');
					                    this.userName = username;
					                    Ext.Msg.confirm('消息','确定要注销"'+username+'"的登录状态？',function(bId){
								    		if(bId=='ok' || bId =='yes'){
								    			this.up('crudforms').doRequest('loginout',{'userName':this.userName});
								    		}
								    	},this);
					                }
					            }*/]
					        }
					]},
					setValue:function(res){
						if(typeof res == 'string'){
							this.refresh();
						}
				    },
				    refresh:function(){
				    	if(this.orgId){
				    		this.up('crudforms').doRequest('list',{'orgId':this.orgId,'orgName':this.orgName});
				    	}
				    },
				    toCreate:function(){
				    	this.up('crudforms').setActiveByValue('create',{'orgId':this.orgId,'orgName':this.orgName});
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'新建用户',
					    	rightId:Rich.V.admin_user_add,
					    	cls:'r-btn-highlight r-btn-transparent',
					    	handler:function(btn){
					    		//var md = btn.up('users');
					    		this.up('gridpanel').toCreate();
					    	}
					    }]
					}]
				},{
					itemId:'update',
					title:'修改用户信息',
					rightId:Rich.V.admin_user_update,
					url:Rich.Url.editUserPath,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '用户名',
				        itemId:'userName',
				        readOnly:true,
				        name: 'userName'
				    },{
				        fieldLabel: '昵称',
				        itemId:'nickName',
				        name: 'nickName'
				    },{
		            	xtype:'numberfield',
		                fieldLabel: '手机号',
		                minLength:11,
			            maxLength:11,
		                itemId:'phone',
		                name: 'phone'
		            },{
				        fieldLabel: '电子邮件',
				        itemId:'email',
				        name: 'email',
				        vtype:'email',
            			tooltip: '输入您的电子邮件'
				    },{
				        fieldLabel: '所属组织ID',
				        itemId:'orgId',
				        xtype:'hidden',
				        name: 'orgId'
				    },{
				        fieldLabel: '所属组织',
				        itemId:'orgName',
				        name: 'orgName',
				        msgTarget:'side',
        	    		xtype:'triggerfield',
        	    		allowBlank:false,
        	    		editable:false,
        	    		emptyText:'请选择组织',
        	    		triggerCls: Ext.baseCSSPrefix + 'form-trigger',
                        onTriggerClick:function(){
                        	var win = Ext.create('Rich.view.admin.OrgSelectorWindow',{singleCheck:true});
                        	win.showFor(this.valueBack,this);
                        },
                        valueBack:function(rds){
                        	if(rds && rds.length > 0)
                        	{
                        		var rd = rds[0];
                        		this.setValue(rd.get('orgName'));
                        		this.ownerCt.getComponent('orgId').setValue(rd.get('orgId'));
                        	}
                        }
				    },{
				    	xtype:'combo',
				        fieldLabel: '状态',
				        itemId:'status',
				        name: 'status',
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
				    },{
				    	xtype:'fieldset',
				    	itemId:'pwdFieldset',
				        //columnWidth: 0.5,
				        title: '修改密码',
				        checkboxName:'isUpdatePwd',
				        checkboxToggle:true,
				        collapsible: true,
				        collapsed:true,
				        defaultType: 'textfield',
				        defaults: {anchor:'100%',inputType:'password'},
				        layout: 'anchor',
				        items :[{
				            fieldLabel: '密码',
				            name: 'password'
				        }, {
				            fieldLabel: '重复密码',
				            name: 'password2'
				        }]
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
								var vas = fm.getValues();
								
								if(vas.isUpdatePwd == 'on'){
				    	    		if(vas.password && vas.password2 && vas.password == vas.password2){
				    	    		}else{
				    	    			Rich.Msg.error('错误','两次密码不一致！')
				    	    			return;
				    	    		}
				    	    	}else{
				    	    		delete vas.password;
				    	    		delete vas.password2;
				    	    	}
								
								
								this.up('crudforms').doRequest('update',vas);
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
					title:'新建用户',
					rightId:Rich.V.admin_user_add,
					url:Rich.Url.addUserPath,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '用户名',
				        itemId:'userName',
				        allowBlank:false,
				        name: 'userName'
				    },{
				        fieldLabel: '密码',
				        itemId:'password',
				        value:'123456',
				        name: 'password'
				    },{
				        fieldLabel: '昵称',
				        itemId:'nickName',
				        name: 'nickName'
				    },{
		            	xtype:'numberfield',
		                fieldLabel: '手机号',
		                minLength:11,
			            maxLength:11,
		                itemId:'phone',
		                disabled:true,
		                name: 'phone'
		            },{
				        fieldLabel: '电子邮件',
				        itemId:'email',
				        name: 'email',
				        vtype:'email',
            			tooltip: '输入您的电子邮件'
				    },{
				        fieldLabel: '所属组织ID',
				        itemId:'orgId',
				        xtype:'hidden',
				        name: 'orgId'
				    },{
				        fieldLabel: '所属组织',
				        itemId:'orgName',
				        name: 'orgName',
				        msgTarget:'side',
        	    		xtype:'triggerfield',
        	    		allowBlank:false,
        	    		editable:false,
        	    		emptyText:'请选择组织',
        	    		triggerCls: Ext.baseCSSPrefix + 'form-trigger',
                        onTriggerClick:function(){
                        	var win = Ext.create('Rich.view.admin.OrgSelectorWindow',{singleCheck:true});
                        	win.showFor(this.valueBack,this);
                        },
                        valueBack:function(rds){
                        	if(rds && rds.length > 0)
                        	{
                        		var rd = rds[0];
                        		this.setValue(rd.get('orgName'));
                        		this.ownerCt.getComponent('orgId').setValue(rd.get('orgId'));
                        	}
                        }
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
					url:Rich.Url.delUserPath,
					xtype:'box',
					html:'删除成功'
				},{
					itemId:'loginout',
					url:Rich.Url.forceUserPath,
					xtype:'box',
					html:'踢出成功'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
