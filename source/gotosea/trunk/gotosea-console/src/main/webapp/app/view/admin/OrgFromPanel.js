Ext.define('Rich.view.admin.OrgFromPanel', {
	requires:['Rich.JsonAjax','Ext.layout.container.Anchor','Ext.form.field.Text'],
    extend: 'Ext.form.Panel',
    alias:'widget.orgform',
    uses:[],
    orgId:null,
    formType:'delete',
    initComponent:function(){
    	var me = this;
    	
    	var fItems = [];
    	if(this.formType == 'add'){
    		
    	}
    	
    	Ext.apply(me,{
    		
    		padding:'10 10 10 10',
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
		        name: 'parentName'
		    },{
		        fieldLabel: '序列',
		        itemId:'seq',
		        name: 'seq'
		    },{
		        fieldLabel: '最后更新者',
		        name: 'modifier',
		        readOnly:true
		    },{
		        fieldLabel: '最后更新时间',
		        name: 'modifyTime',
		        readOnly:true
		    },{
		        fieldLabel: '创建者',
		        name: 'creater',
		        rightId:Rich.V.display_creater,rightHidden:true,
		        readOnly:true
		    },{
		        fieldLabel: '创建时间',
		        rightId:Rich.V.display_create_time,rightHidden:true,
		        name: 'createTime',
		        readOnly:true
		    }],
		    dockedItems: [{
		        xtype: 'toolbar',
		        itemId:'toolbar',
		        dock: 'bottom',
		        ui: 'footer',
		        items: ['->',{
			    	text:'确定',
			    	itemId:'save',
			    	hidden:true,
			    	handler:function(btn){
			    		btn.up('orgform').submit();
			    		//var md = btn.up('organization');
			    		//var win = Ext.create('Rich.view.admin.OrgEditorWindow');
			    		//win.showFor(md.addOrUpdateBack,md);
			    	}
			    },{
			    	text:'重置',
			    	itemId:'reset',
			    	hidden:true,
			    	handler:function(btn){
			    		btn.up('orgform').getForm().reset();
			    		
			    	}
			    },{
			    	text:'刷新',
			    	itemId:'refresh',
			    	hidden:true,
			    	handler:function(btn){
			    		btn.up('orgform').refresh();
			    	}
				}]
		    }]
    	});
    	me.callParent(arguments);
    },
    setItemsVisible:function(comp,pa){
    	for(var o in pa){
    		comp.getComponent(o).setVisible(pa[o]);
    	}
    },
    setStatus:function(status){
    	var tbar = this.getDockedComponent('toolbar');
    	if(status == 'select'){
    		this.setItemsVisible(tbar,{
    			'save':false,
    			'reset':false,
    			'refresh':true
    		});
    	}else if(status == 'add'){
    		this.setItemsVisible(tbar,{
    			'save':true,
    			'reset':false,
    			'refresh':false
    		});
    	}else if(status == 'update'){
    		this.setItemsVisible(tbar,{
    			'save':true,
    			'reset':true,
    			'refresh':false
    		});
    	}else if(status == 'delete'){
    		this.setItemsVisible(tbar,{
    			'save':false,
    			'reset':false,
    			'refresh':false
    		});
    	}
    	this.currentStatus = status;
    },
    refresh:function(){
    	this.loadInfo(this.currentOrgId,this.currentStatus);
    },
    loadInfo:function(orgId,forStatus){
		this.setLoading('加载中...');
		Rich.JsonAjax.request({
			url:Rich.Url.orgInfoPath,
			params:{
				id:orgId
			},
			argument:forStatus,
			callback:this.loadRequestBack,
			scope:this
		});
	},
	loadRequestBack:function(o,f,r){
		this.setLoading(false);
		if(f){
			var info = r.responseJson;
			if(info.orgId){
				this.getForm().setValues(info);
				this.currentOrgId = info.orgId;
				this.setStatus(o.argument);
			}
		}
		
	},
    submit:function(){
		if(!this.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return;
		}
		var vs = this.getValues();
		vs.textInfo = vs.textInfo;
		var ids = win.getTerminalIds();
		if(ids.length < 1){
			Rich.Msg.error('提示','请在目标车辆里面选择车辆.');
			return;
		}
		vs.mobiles = ids.join(',');
		//console.log(vs);
		this.setLoading('发送中...');
		Rich.JsonAjax.request({
			url:Rich.Url.textSendPath,
			params:vs,
			callback:this.requestBack,
			scope:this
		});
	},
	requestBack:function(o,f,r){
		this.setLoading(false);
		if(f){
			
		}
	}
});