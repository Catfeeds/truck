Ext.define('Rich.view.sys.Auser', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
        'Rich.view.sys.OrgTree',
        'Ext.form.Panel',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Rich.model.Auser',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Rich.component.DicComboBox'
    ],
    uses:'Rich.view.sys.OrgSelectorWindow',
    extend: 'Ext.panel.Panel',
    alias:'widget.auser',
    getCrudForms:function(){
    	return this.lookupI('crudforms');
    },
	initComponent:function(){
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Auser',
	        pageSize: 50,
	        autoLoad:true,
	        proxy: {
		        type: 'ajax',
		        getMethod:function(){return "post"},
		        url:Rich.Url.orgAuserListPath,
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
		            totalProperty: 'data.totalRows'
		        }
		    }
		});
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
						this.up('auser').getCrudForms().doRequest('list',{'orgId':record.get('orgId'),'orgName':record.get('orgName')});
					},
					'itemdblclick0':function(me0,record,item,index,e,eOpts){
	            		me0.up('auser').getCrudForms().doRequest('list',{'orgId':record.get('orgId'),'orgName':record.get('orgName')});
            		}
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
				xtype:'panel',
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
				setActiveByValue:function(itemId,va,va2){
			    	var f = this.getComponent(itemId);
			    	if(f.setValue){
			    		f.setValue(va,va2);
			    	}
			    	this.getLayout().setActiveItem(f);
			    },
				doRequest:function(target,params){
					var tar = target;
					if(typeof tar == 'string'){
						tar = this.getComponent(tar);
					}
					if(tar.getItemId() == 'list'){
						tar.doRequest(params);
						return;
					}
					this.setLoading('');
					Rich.JsonAjax.request({
						url:tar.url,
						params:params,
						argument:target,
						callback:this.requestBack_,
						scope:this
					});
				},
				requestBack_:function(o,f,r){
					this.setLoading(false);
					var tar = o.argument;
					var cel = false;
					if(typeof this.requestBack == 'function'){
						cel = this.requestBack(tar,o,f,r) === false;
					}
					if(!cel){
						if(typeof tar == 'string'){
							tar = this.getComponent(tar);
						}
						if(typeof tar.requestBack == 'function'){
						 	tar.requestBack.call(tar,o,f,r);
						}
					}
				},
				requestBack:function(tar,o,f,r){
					if(f){
						var res = r.responseJson;
						if(tar=='create' || tar=='update'){
							this.doRequest('list',{'orgId':res['orgId'],'orgName':res['orgName']});
							//this.setActiveByValue('read',res.data);
						}else if(tar == 'delete'){
							this.setActiveByValue('list','refresh');
						}else if(tar == 'list'){
							this.setActiveByValue('list',res);
						}else if(tar == 'loginout'){
						
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
					}
					return false;
				},
				items:[{
					xtype:'gridpanel',
					itemId:'list',
					title:'用户',
					//frame:true,
					padding:'0',
					bodyStyle:'',
			    	forceFit:true,
			    	store:store,
			    	bbar: Ext.create('Ext.PagingToolbar', {
			            store: store,
			            displayInfo: true,
			            displayMsg: '显示 {0} - {1} of {2}',
			            emptyMsg: "没有数据",
			            items:['-']
			        }),
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
					        { text: '用户名', dataIndex: 'userName',flex: 1 },
					        { text: '昵称', dataIndex: 'nickName',flex: 1 },
					        { text: '电子邮件', dataIndex: 'email',flex: 1 },
					        { text: '手机号', dataIndex: 'phone',flex: 1 },
					        { text: '创建时间', dataIndex: 'createTime',width:140 },
					        { text: '状态', dataIndex: 'statusDesc',width:70},
					        {
					        	text:'操作',
					            xtype:'actioncolumn',
					            hidden:!Rich.RightManager.hasRight(['admin-user-update','admin-user-force']),
					            width:70,
					            items: [{
					                icon:Rich.Url.icons_27,
					                iconCls:'actioncolumn-margin',
					                altText:'修改',
					                disabled:!Rich.RightManager.hasRight('admin-user-update'),
					                tooltip: '修改',
					                handler: function(grid, rowIndex, colIndex) {
					                    var rec = grid.getStore().getAt(rowIndex);
					                    this.up('auser').getCrudForms().setActiveByValue('update',rec.getData());
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
					                icon: 'resources/images/icons/fam/connect.png',
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
					doRequest:function(params){
						
						this.getOwnerCt().getLayout().setActiveItem(this);
						var sto = this.getStore();
						sto.getProxy().extraParams = params;
					    sto.loadPage(1);
					    this.orgId = params.orgId;
						this.orgName = params.orgName;
						this.setTitle(params.orgName+' > 用户');
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
           	        				Ext.core.DomHelper.insertHtml('beforeEnd', tel.dom, '<center><div style="color:red;background-color:#C1DDF1;">没有用户<div></center>');
           	        			}
							}
						}
				    },
				    refresh:function(){
				    	if(this.orgId){
				    		this.getOwnerCt('crudforms').doRequest('list',{'orgId':this.orgId,'orgName':this.orgName});
				    	}
				    },
				    toCreate:function(){
				    	this.getOwnerCt('crudforms').setActiveByValue('create',{'orgId':this.orgId,'orgName':this.orgName});
				    },
				    dockedItems:[{
				    	xtype:'toolbar',
				    	docked:'top',
				    	items:[{
					    	text:'新建用户',
					    	rightId:'admin-user-create',
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
					rightId:'admin-user-update',
					url:Rich.Url.auserUpdatePath,
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
				        allowBlank:false,
				        name: 'nickName'
				    },{
				        fieldLabel: '手机号',
				        itemId:'phone',
				        allowBlank:false,
				        maxLength:11,
				        minLength:11,
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
				        allowBlank:false,
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
                        	var win = Ext.create('Rich.view.sys.OrgSelectorWindow',{singleCheck:true});
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
				    	xtype:'diccombo',
				        fieldLabel: '状态',
				        itemId:'status',
				        name: 'status',
				        editable:false,
				        typeName:'status'
				    },{
				    	xtype:'fieldset',
				    	itemId:'pwdFieldset',
				        //columnWidth: 0.5,
				        title: '重置密码',
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
					    		btn.getOwnerCt('crudforms').getLayout().setActiveItem('list');
					    	}
					    },'->',{
					    	text:'提交',
					    	rightId:'admin-user-update',
					    	itemId:'save',
					    	handler:function(btn){
					    		var fm = btn.up('form');
								if(!fm.isValid())
								{
									Rich.Msg.error('错误','有不合法的输入.');
									return;
								}
								var vs = fm.getValues();
								var fs = fm.getComponent('pwdFieldset');
								if(fs.collapsed || (vs["password"] == "" && vs["password2"] == "")){
									delete vs["password"];
									delete vs["password2"];
								}else{
									if(vs["password"] != vs["password2"]){
										Rich.Msg.error('错误','重置密码操作，两次密码不相同.');
										return;
									}
								}
								this.getOwnerCt('crudforms').doRequest('update',vs);
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
					rightId:'admin-user-create',
					url:Rich.Url.auserAddPath,
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
				        value:'a123456',
				        maxLength:16,
				        minLength:8,
				        allowBlank:false,
				        name: 'password'
				    },{
				        fieldLabel: '昵称',
				        itemId:'nickName',
				        allowBlank:false,
				        name: 'nickName'
				    },{
				        fieldLabel: '手机号',
				        itemId:'phone',
				        allowBlank:false,
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
                        	var win = Ext.create('Rich.view.sys.OrgSelectorWindow',{singleCheck:true});
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
				    	xtype:'diccombo',
				        fieldLabel: '状态',
				        itemId:'status',
				        value:0,
				        name: 'status',
				        editable:false,
				        typeName:'status'
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
					    		btn.getOwnerCt('crudforms').getLayout().setActiveItem('list');
					    	}
					    },'->',{
					    	text:'保存',
					    	itemId:'save',
					    	rightId:'admin-user-create',
					    	handler:function(btn){
					    		var fm = btn.up('form');
								if(!fm.isValid())
								{
									Rich.Msg.error('错误','有不合法的输入.');
									return;
								}
								var vs = fm.getValues();
								this.getOwnerCt('crudforms').doRequest('create',vs);
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
