/**
 *客户管理
 */
Ext.define('Rich.view.cust.Main', {
	requires:[
		'Ext.form.FieldContainer',
        'Ext.form.field.Trigger',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.Value',
        'Rich.Url',
		'Rich.model.Cust',
		'Rich.view.cust.PushMessageWindow',
		'Rich.view.cust.CustForm',
        'Rich.widget.CrudWindow'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.custmain',
    
    getWharfId:function(){
    	return this.wharf.get('id');
    },
     
	initComponent:function(){
		var me = this;
		var al = Rich.RightManager.hasRight(Rich.V.rest_custs);//列表加载的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_cust_id);//详情的权限
		var status = Rich.RightManager.hasRight(Rich.V.rest_cust_id_status);
		var actionItems = [];
		actionItems.push({
            icon: Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
            iconCls:'actioncolumn-margin',
            altText:'修改状态',
            tooltip:'修改状态',
            disabled:!status,
            getClass:function(metadata,rowIndex,colIndex,store){
            	var st = colIndex.data.status;
            	if(st == 0){
            		return 'actioncolumn-margin icons_8'; 
            	}else{
            		return 'actioncolumn-margin icons_16';
            		
            	}
            },
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').toUpdatastatus(rec);
            }
            
        });
        
        var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"失效"},
		        {"abbr":"1", "name":"生效"}
		    ]
		});
		
		var stat = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"1", "name":"未认证"},
		        {"abbr":"2", "name":"已申请"},
		        {"abbr":"3", "name":"认证成功"},
		        {"abbr":"4", "name":"认证失败"}
		    ]
		});
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Cust',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.custsListPath,	
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
        
		var itms = [{
	    	xtype:'form',
	    	style:{padding:"10px"},
	    	docked:'top',
	    	defaults:{
	    		xtype:'textfield',
	    		labelWidth:70,
	    		style:{float:"left",margin:"5px 0  5px 10px"}
	    	},
	    	layout:'auto',
			items: [{
			        fieldLabel: '客户姓名',
			        name: 'name'
			    },{
			        fieldLabel: '手机号',
			        name: 'phone'
			    },{
			    	fieldLabel: '客户状态',
					xtype:'combo',
			        name: 'status',
			        editable:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
			    	fieldLabel: '商家认证状态',
					xtype:'combo',
					labelWidth:90,
			        name: 'merchantStatus',
			        editable:false,
				    store: stat,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.wharf_add,
			    	style:{float:"right",margin:"5px 10px 5px 0"},
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    },{
			    	xtype:'button',
			    	text:'搜索',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.wharf_add,
			    	style:{float:"right",margin:"5px 10px 5px 10px"},
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    }]
			}];
		
		Ext.apply(me,{
			layout:'fit',
			items:[{
				xtype:'gridpanel',
				itemId:'grid',
				loadMask: true,					
				padding:'0',
				selModel:{selType:'checkboxmodel',mode:'MULTI'},
				selType: 'checkboxmodel',
		    	forceFit:true,
		    	store: store,
			   	bbar: Ext.create('Ext.PagingToolbar', {
		            store: store,
		            displayInfo: true,
		            displayMsg: '显示 {0} - {1} of {2}',
		            emptyMsg: "没有数据",
		            items:['-']
		        }),				  
			   	columnLines: true,
			   	columns: {
				   	defaults:{					       
				        sortable:false,
				        draggable:false,
				        enableColumnHide:false,
				        menuDisabled:true
				   	},
				   	items:[
				   		{ text: '客户账号', dataIndex: 'account',flex: 1 },
				        { text: '客户姓名', dataIndex: 'name',flex: 1 },
				        { text: '客户手机号', dataIndex: 'phone',flex: 1 },
				        { text: '客户邮箱', dataIndex: 'email',flex: 1 },
				        { text: '客户微信号', dataIndex: 'wechat',flex: 1 },
				        { text: '客户性别', dataIndex: 'sex',flex: 1,renderer:function(v){
			        		if(v == 1){
			        			return '男';
			        		}else if(v == 2){
			        			return '女';
			        		}else{
								return '未知';			        		
			        	}}},
				        { text: '客户微信号', dataIndex: 'wechat',flex: 1 },
				        { text: '注册时间', dataIndex: 'createTime',flex: 1 },
				        { text: '客户状态', dataIndex: 'status',flex: 1 ,renderer:function(v){
				        	if(v == 0){
				        		return '失效';
				        	}else{
				        		return '生效';
				        	}
				        }},
				        { text: '商家认证状态', dataIndex: 'merchantStatus',flex: 1 ,renderer:function(v){
				        	switch(v){
				        		case 1:
				        			return '未认证';
				        		case 2:
				        			return '已申请';
				        		case 3:
				        			return '认证成功';
				        		case 4:
				        			return '认证失败';
				        	}
				        }},{
				        	text:'操作',
				            xtype:'actioncolumn',
				            tdCls:'x-column-header-last',
				            items: actionItems
				        }
				]},
				
				pushMessage:function(rec){
					//debugger
					Ext.create('Rich.view.cust.PushMessageWindow').showById(rec.get('auditObjectId'));
				},
				
				lookDetail:function(rec){
					//Ext.create('Rich.view.cust.CustDetailWindow').showById(rec.data);
					Ext.create('Rich.widget.CrudWindow',{
						title:'客户详情',
						width:0.6,
						height:0.6,
						crudForm:{
							xtype:'custform',
							tid:rec.get('id')
						}
					}).showByParams({id:rec.get('id')},this.upStateBack,this);
				},
			    
			    toUpdatastatus:function(rec){
			    	var sta;
			    	if(rec.data.status == 0){
			    		var msg = '你确定启用这个账号吗?';
			    		sta = 1;
			    	}else{
			    		var msg = '你确定禁用这个账号吗?';
			    		sta = 0;
			    	}
			    	//debugger
			    	Ext.Msg.confirm('提示',msg,function(btn){
			        	if (btn == 'yes'){
			        		Rich.JsonAjax.request({
			        			method:'put',
		    	        		url:Rich.Url.custsChangeStatusPath+rec.get('id')+'/status/'+sta,
		    	        		callback:this.alert,
		    	        		scope:this
			        		});
			        	}
			    	},this);
			    },
			    
			    alert:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		Rich.Msg.alert('消息','修改成功');
    	        		this.getStore().reload();
    	        	}
			    },
			    
			    upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		Rich.Msg.alert('消息','删除成功');
    	        		this.getStore().reload();
    	        	}
			    },
			    
			    listeners:{//双击时事件 itemdblclick
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    },
			    dockedItems:itms
			}]
		});
		me.callParent(arguments);
	}
});
