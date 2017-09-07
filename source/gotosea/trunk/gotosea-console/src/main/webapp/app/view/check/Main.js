/**
 *客户管理
 */
Ext.define('Rich.view.check.Main', {
	requires:[
		'Ext.form.FieldContainer',
        'Ext.form.field.Trigger',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.model.Check',
        'Rich.Value',
        'Rich.Url',
        'Rich.view.cust.CustForm',
        'Rich.view.check.AuthWindow',
        'Rich.widget.CrudWindow'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.checkmain',
    
	initComponent:function(){
		var me = this;
		var al = Rich.RightManager.hasRight(Rich.V.rest_audit_merchants);//列表加载的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_cust_detail);//详情的权限
		var status = Rich.RightManager.hasRight(Rich.V.rest_cust_id_audit_status);
		var actionItems = [{
            icon: Rich.Url.icons_6,
            iconCls:'actioncolumn-margin',
            altText:'查看资料',
            tooltip: '查看资料',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
            icon: Rich.Url.icons_8,
            iconCls:'actioncolumn-margin',
            altText:'审核',
            tooltip: '审核',
            disabled:!status,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').checkStatus(rec);
            }
        }];
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Check',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.merchantCheckListPath,	
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
	    	}
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
				   		//{ text: 'ID', dataIndex: 'id',flex: 0.3 },
				   		{ text: '真实姓名', dataIndex: 'realName',flex: 1 },
				   		{ text: '手机号', dataIndex: 'phone',flex: 1 },
				   		{ text: '身份证号', dataIndex: 'idNum',flex: 1 },
				   		{ text: '申请描述', dataIndex: 'applyRemark',flex: 1 },
				        { text: '申请时间', dataIndex: 'applyTime',flex: 1 },
				        { text: '认证描述', dataIndex: 'auditRemark',flex: 1 },
				        { text: '认证时间', dataIndex: 'auditTime',flex: 1 },
				        { text: '状态', dataIndex: 'status',flex: 1 ,renderer:function(v){
				        	switch(v){
				        		case 0:
				        			return '已提交待审核';
				        			break;
				        		case 1:
				        			return '审核通过';
				        			break;
				        		case 2:
				        			return '审核失败';
				        			break;
				        	}
				        }},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            tdCls:'x-column-header-last',
				            items: actionItems
				        }
				]},
				
				lookDetail:function(rec){
					Ext.create('Rich.widget.CrudWindow',{
						title:'商家详情',
						width:0.6,
						height:0.6,
						crudForm:{
							xtype:'custform',
							tid:rec.get('auditObjectId')
						}
					}).showByParams({id:rec.get('id')},this.upStateBack,this);
				},
			    
				checkStatus:function(rec){
					Ext.create('Rich.view.check.AuthWindow',{id:rec.get('id')}).ShowFor(this.checkBack,this);
				},
				
				checkBack:function(o,f,r){
					if(f){
						this.getStore().reload();
					}
				},
				
			    upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
			    },
			    dockedItems:itms
			}]
		});
		me.callParent(arguments);
	}
});
