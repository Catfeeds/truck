/**
 *客户管理
 */
Ext.define('Rich.view.activity.Main', {
	requires:[
		'Ext.form.FieldContainer',
        'Ext.form.field.Trigger',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.view.activity.ActivityForm',
        'Rich.Value',
        'Rich.Url',
		'Rich.model.Activity',
        'Rich.widget.CrudWindow'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.activitymain',
    
	initComponent:function(){
		var me = this;
		var al = Rich.RightManager.hasRight(Rich.V.rest_act_list);//列表加载的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_act_actId);//详情的权限
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
        });
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Activity',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.actiListPath,	
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
			        fieldLabel: '活动标题',
			        name: 'activityTitle'
			    },{
		            xtype      : 'fieldcontainer',
		            fieldLabel : '出发时间',
		            width:300,
		            defaults: {
		                hideLabel: true
		            },
		            layout: 'hbox',
		            items: [{
						xtype: 'datefield',
						flex:1,
					    anchor: '100%',
					    name: 'beginDate',
					    format:'Y-m-d'
					},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
						xtype: 'datefield',
						flex:1,
						name: 'endDate',
					    anchor: '100%',
					    format:'Y-m-d'
					}]
		        },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_act_list,
			    	style:{float:"right",margin:"5px 10px 5px 0"},
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    },{
			    	xtype:'button',
			    	text:'搜索',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_act_list,
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
				   		{ text: 'ID', dataIndex: 'id',flex: 0.3 },
				   		{ text: '活动标题', dataIndex: 'activityTitle',flex: 1 },
				        { text: '目的地', dataIndex: 'destination',flex: 1 },
				        { text: '活动天数', dataIndex: 'activityDays',flex: 1 },
				        { text: '活动简介', dataIndex: 'summary',flex: 1 },
				        { text: '计划时间', dataIndex: 'beginDate',flex: 1 ,renderer:function(e,rec){
				        	var data = rec.record.data.endDate;
				        	var end = data.substring(data.length-5);
				        	return e+' 至 '+end;
				        }},
				        { text: '状态', dataIndex: 'statusName',flex: 1 },
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            tdCls:'x-column-header-last',
				            items: actionItems
				        }
				]},
				
				lookDetail:function(rec){
					Ext.create('Rich.widget.CrudWindow',{
						title:'活动详情',
						width:0.6,
						height:0.6,
						crudForm:{
							xtype:'activityform',
							tid:rec.get('id')
						}
					}).showByParams({id:rec.get('id')},this.upStateBack,this);
				},
			    
			    upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		Rich.Msg.alert('消息','删除成功');
    	        		this.getStore().reload();
    	        	}
			    },
			    dockedItems:itms
			}]
		});
		me.callParent(arguments);
	}
});
