Ext.define('Rich.view.admin.Organization', {
	requires:[
		'Rich.widget.Message',
        'Rich.view.admin.CRUDForms',
        'Rich.view.admin.OrgTree',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger','Ext.form.field.Number'
    ],
    uses:'Rich.view.admin.OrgSelectorWindow',
    extend: 'Ext.panel.Panel',
    alias:'widget.organization',
    getOrgForms:function(){
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
				flex:1,
				root:{
					expanded: true,
					children: [{
						orgName: "",
					    leaf: true
					}]
				},
				tools:[{
				    type:'refresh',
				    tooltip: '刷新组织',
				    handler: function(event, toolEl, panelHeader) {
				        this.up('orgtree').refresh();
				    }
				}/*,
				{
				    type:'help',
				    tooltip: 'Get Help',
				    callback: function(panel, tool, event) {
				        // show help here
				    }
				}*/],
				listeners:{
					'select':function(me0, record, index, eOpts){
						this.up('organization').getOrgForms().doRequest('read',{'orgId':record.get('orgId')});
					},
					'itemdblclick0':function(me0,record,item,index,e,eOpts){
	            		me0.up('organization').getOrgForms().doRequest('read',{'orgId':record.get('orgId')});
            		}
				},
				tbar:[{
				    	text:'新增',
				    	rightId:Rich.V.admin_org_add,
				    	handler:function(btn){
				    		var rds = this.up('orgtree').getSelectionModel().getSelection();
				    		var va = null;
				    		if(rds.length > 0){
				    			va = {
				    				'parentId':rds[0].get('orgId'),
				    				'parentName':rds[0].get('orgName')
				    			};
				    		}
				    		btn.up('organization').getOrgForms().setActiveByValue('create',va);
				    		//var win = Ext.create('Rich.view.admin.OrgEditorWindow');
				    		//win.showFor(md.addOrUpdateBack,md);
				    		//Rich.Msg.alert('提示','未选择任何项.');
				    	}
				    }]
			},{
				xtype:'crudforms',
				itemId:'crudforms',
				frame:true,
				margin: '10 10 10 0',
				layout:'card',
				flex: 1,
				defaults:{
					xtype:'form',
					bodyStyle:'padding-top:10px',
					padding:'10 10 10 10'
				},
				requestBack:function(tar,o,f,r){
					if(f){
						var res = r.responseJson;
						if(tar == 'read' || tar=='create' || tar=='update'){
							this.setActiveByValue('read',res.data);
						}else if(tar == 'delete'){
							this.setActiveByValue('delete',null);
						}else{
							Rich.Msg.error('错误','错误的状态数据.');
						}
						if(tar != 'read'){
							this.up('organization').getComponent('orgtree').refresh();
						}
					}
					return false;
				},
				items:[{xtype:'box'},{
					itemId:'read',
					title:'组织信息',
					url:Rich.Url.orgInfoPath,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%',
				        readOnly:true
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '组织ID',
				        itemId:'orgId',
				        xtype:'hidden',
				        name: 'orgId'
				    },{
				        fieldLabel: '组织名称',
				        itemId:'orgName',
				        name: 'orgName'
				    },{
				        fieldLabel: '组织描述',
				        itemId:'orgDescription',
				        name: 'orgDescription'
				    },{
				        fieldLabel: '所属组织ID',
				        itemId:'parentId',
				        xtype:'hidden',
				        name: 'parentId'
				    },{
				        fieldLabel: '所属组织',
				        itemId:'parentName',
				        name: 'parentName'
				    },{
				    	//xtype:'numberfield',
				        fieldLabel: '序列',
				        itemId:'seq',
				        name: 'seq'
				    }/*,{
				        fieldLabel: '最后更新者',
				        name: 'modifier'
				    },{
				        fieldLabel: '最后更新时间',
				        name: 'modifyTime'
				    }*/,{
				        fieldLabel: '创建者',
				        rightId:Rich.V.display_creater,rightHidden:true,
				        name: 'creater'
				    },{
				        fieldLabel: '创建时间',
				        rightId:Rich.V.display_create_time,rightHidden:true,
				        name: 'createTime'
				    }],
				    setValue:function(va){
				    	this.data = va;
						this.getForm().setValues(va);
						this.getDockedComponent('toolbar').setVisible(true);
				    },
				    toModify:function(){
				    	this.up('crudforms').setActiveByValue('update',this.data);
				    },
				    toRemove:function(){
				    	Ext.Msg.confirm('消息','确定删除？',function(bId){
				    		if(bId=='ok' || bId =='yes'){
				    			this.up('crudforms').doRequest('delete',this.data);
				    		}
				    	},this);
				    },
				    dockedItems: [{
				        xtype: 'toolbar',
				        itemId:'toolbar',
				        hidden:true,
				        dock: 'bottom',
				        ui: 'footer',
				        items: ['->',{
					    	text:'修改',
					    	rightId:Rich.V.admin_org_update,
					    	itemId:'modify',
					    	handler:function(btn){
					    		btn.up('form').toModify();
					    	}
					    },{
					    	text:'删除',
					    	hidden:true,
					    	itemId:'remove',
					    	rightId:Rich.V.admin_org_del,
					    	handler:function(btn){
					    		btn.up('form').toRemove();
					    	}
					    }]
				    }]
				},{
					itemId:'update',
					title:'修改组织',
					url:Rich.Url.editOrgPath,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '组织ID',
				        itemId:'orgId',
				        xtype:'hidden',
				        name: 'orgId'
				    },{
				        fieldLabel: '组织名称',
				        itemId:'orgName',
				        name: 'orgName',
				       	allowBlank: false
				    },{
				        fieldLabel: '组织描述',
				        itemId:'orgDescription',
				        name: 'orgDescription'
				    },{
				        fieldLabel: '所属组织ID',
				        itemId:'parentId',
				        xtype:'hidden',
				        name: 'parentId'
				    },{
				        fieldLabel: '所属组织',
				        itemId:'parentName',
				        name: 'parentName',
				        msgTarget:'side',
        	    		xtype:'triggerfield',
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
                        		this.ownerCt.getComponent('parentId').setValue(rd.get('orgId'));
                        	}
                        }
				    },{
				    	xtype:'numberfield',
				        fieldLabel: '序列',
				        itemId:'seq',
				        name: 'seq'
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
					    		btn.up('crudforms').getLayout().setActiveItem('read');
					    	}
					    },'->',{
					    	text:'确定',
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
					title:'新建组织',
					url:Rich.Url.addOrgPath,
					layout: 'anchor',
				    defaults: {
				        anchor:'100%'
				    },
				    defaultType: 'textfield',
				    items: [{
				        fieldLabel: '组织名称',
				        itemId:'orgName',
				        name: 'orgName',
				        allowBlank: false
				    },{
				        fieldLabel: '组织描述',
				        itemId:'orgDescription',
				        name: 'orgDescription'
				    },{
				        fieldLabel: '所属组织ID',
				        itemId:'parentId',
				        xtype:'hidden',
				        name: 'parentId'
				    },{
				        fieldLabel: '所属组织',
				        itemId:'parentName',
				        name: 'parentName',
				        msgTarget:'side',
        	    		xtype:'triggerfield',
        	    		//allowBlank:false,
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
                        		this.ownerCt.getComponent('parentId').setValue(rd.get('orgId'));
                        	}
                        }
				    },{
				    	xtype:'numberfield',
				        fieldLabel: '序列',
				        itemId:'seq',
				        name: 'seq'
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
					    		btn.up('crudforms').getLayout().setActiveItem('read');
					    	}
					    },'->',{
					    	text:'确定',
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
					url:Rich.Url.delOrgPath,
					xtype:'box',
					html:'删除成功'
				}]
			}]
		});
		this.callParent(arguments);
	}
});