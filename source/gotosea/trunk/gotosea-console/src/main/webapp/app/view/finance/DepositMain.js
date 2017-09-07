/**
 * 退款
 */
Ext.define('Rich.view.finance.DepositMain', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Ext.grid.feature.Grouping',
		'Ext.grid.plugin.CellEditing',
		'Rich.view.finance.AuthWindow',
		'Rich.model.Withdral',
		'Ext.form.field.ComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.depositmain',
   
    
	initComponent:function(){	 	
		var me = this;
		var al = Rich.RightManager.hasRight(Rich.V.rest_withdraws);
		var batch = Rich.RightManager.hasRight(Rich.V.rest_withdraw_id);
		var actionItems = [{
            icon: Rich.Url.icons_8,
            iconCls:'actioncolumn-margin',
            altText:'标记为待处理',
            tooltip: '标记为待处理',
            diasbled:!batch,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').doUpdateState(rec);
            }
        },{
            icon: Rich.Url.icons_46,
            iconCls:'actioncolumn-margin',
            altText:'提现结构',
            tooltip: '提现结构',
            diasbled:!batch,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').toCheck(rec);
            }
        }];
	    
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Withdral',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        method:'post',
		        url: Rich.Url.withdrawListPath,
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalElements'
		        }
		    }
		});
		
		Ext.apply(me,{
			layout:'fit',
			items:[{
				margin:'2 0 0 0',
				xtype:'gridpanel',
				itemId:'grid',
				selModel:true,
				selType: 'checkboxmodel',
				loadMask: true,
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
				   		{ text: '提现人', dataIndex: 'realName',flex: 1 },
				   		{ text: '持卡人', dataIndex: 'accountName',flex: 1 },
				   		{text: '钱包总额', dataIndex: 'reqMoney',flex: 1},
				        {text: '提现金额', dataIndex: 'reqMoney',flex: 1},
				        {text: '卡号', dataIndex: 'cardNo',flex: 1},
				        {text: '所属银行', dataIndex: 'cardTypeName',flex: 1},
				        {text: '申请时间', dataIndex: 'reqTime',flex: 1},
				        { text: '状态', dataIndex: 'status',flex:1,renderer:function(v){
								return v == 1?'已提交待审核':'已审核待处理';
				        }},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:120,
				            items:actionItems
				        }
				]},
				
				toCheck:function(rec){
					Ext.create('Rich.view.finance.AuthWindow',{title:'提现结果'}).showById(rec.get('id'));
				},
				
				doUpdateState:function(rec,st){
					Ext.Msg.confirm('提示','将提现状态标记为待处理',function(btn){
			        	if (btn == 'yes'){
			        		this.el.mask('...');
			        		Rich.JsonAjax.request({
			        			method:'put',
		    	        		url:Rich.Url.withdrawStatusPathL+rec.get('id')+'/'+1,
		    	        		callback:this.upStateBack,
		    	        		scope:this
			        		});
					    }
			    	},this);
				},
			     upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		//Rich.Msg.alert('提示','修改成功!')
    	        		this.getStore().reload();
    	        	}
			    },
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    }
			}]
		
		});
		this.callParent(arguments);
	}
});
