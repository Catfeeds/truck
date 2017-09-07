﻿/**
 * 优惠券
 */
Ext.define('Rich.view.coupon.Main', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
        'Rich.model.Coupon',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Rich.view.coupon.CouponDetailWindow',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Ext.grid.feature.Grouping',
		'Ext.grid.plugin.CellEditing',
		'Ext.form.field.ComboBox',
		'Rich.view.coupon.CouponForm'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.couponmain',
    
   
    
	initComponent:function(){		
		var me = this;
		var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"可用"},
		        {"abbr":"1", "name":"不可用"}
		    ]
		});
		
		var statu = Rich.RightManager.hasRight(Rich.V.rest_coup_state);//生效失效权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_coup_detail);//详情的权限
		var al = Rich.RightManager.hasRight(Rich.V.rest_coup_all);
		var itms = [{
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
            disabled:!statu,
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
            
        }];
        
		var itm = [{
	    	xtype:'form',
	    	style:{padding:"10px"},
	    	docked:'top',
	    	defaults:{
	    		xtype:'textfield',
	    		labelWidth:70,
	    		anchor:'100%',
	    		style:{float:"left",margin:"5px 0  5px 10px"}
	    	},
	    	layout:'auto',
		    items: [{
		        fieldLabel: '名称',
		        name: 'name'
		    },{
		    	fieldLabel: '状态',
				xtype:'combo',
		        itemId:'statu',
		        name: 'status',
		        editable:false,
			    store: states,
			    queryMode: 'local',
			    displayField: 'name',
			    valueField: 'abbr'
		    },{
		    	xtype:'fieldcontainer',
		    	layout:'hbox',
		    	style:{float:"right",margin:"5px 10px 5px 0"},
		    	width:120,
		    	items:[{
			    	xtype:'button',
			    	text:'搜索',
			    	margin:'0 6 0 0',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.coupon_temp_page,
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.coupon_temp_page,
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    }]
		    }]
		}];
		
		itm.unshift({
			xtype:'toolbar',
			ui:'footer',
			items:[{
				xtype:'button',
				text:'新建优惠劵',
				rightId:Rich.V.rest_coup,
				handler:function(btn){
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:800,
						height:600,
						crudForm:{
							xtype:'couponform',
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('couponmain').lookupI('grid').getStore().reload();
				}
			}]
		});
		
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Coupon',
	        pageSize: 50,
	        autoLoad:al,
	        proxy: {
		        type: 'ajax',
		        method:'post',
		        url:Rich.Url.conponListPath,
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalRows',
		            idProperty: 'id'
		        }
		    }
		});
		
		Ext.apply(me,{
			layout:'fit',
			items:[{
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
				        draggable:true,
				        resizable :true,
				        enableColumnHide:false,
				        menuDisabled:true
				   	},
				   	items:[
				   	    { text: '名称', dataIndex: 'name',flex: 1 },  
				        { text: '面额', dataIndex: 'amount',flex: 1 ,renderer:function(v){
				        	return v+'分';
				        }},
				        { text: '消费下限', dataIndex: 'consumptionMin',flex: 1,renderer:function(v){
				        	return v+'元';
				        }},	
				        { text: '计划发行量', dataIndex: 'planNum',flex:1 ,renderer:function(v){
				        	return v+'张';
				        }},
				       	{ text: '已发数量', dataIndex: 'suppliedNum',flex:1 ,render:function(v){
				       		return v+'张';
				       	}},
				        { text: '有效月份', dataIndex: 'validityMonths',flex: 1},		
				        { text: '状态',    dataIndex: 'status',flex:1,renderer:function(v){
				        	return v == 0?'失效':'生效';
				        }},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:120,
				            items:itms
				        }
				]},
				
				toUpdatastatus:function(reds){
			    	var vas = {};
			    	vas.id = reds.get('id');
					var msg,sta;
					if(reds.get('status') == 0){
						msg = '确定要生效 ?';
						sta = 'Y';
					}else{
						msg = '确定要失效 ?';
						sta = 'N';
					};
					vas.state = sta;
					var va = Ext.encode(vas);
			    	Ext.Msg.confirm('提示',msg,function(btn){
			    		if(btn == 'yes'){
					    	this.el.mask('...');
			        		Rich.JsonAjax.request({
			        			method:'PUT',
		    	        		url:Rich.Url.conponStatusPath,
		    	        		params:va,
		    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
		    	        		callback:this.upStateBack,
		    	        		scope:this
			        		});
			    		}
			    	},this)
			    },
			    
			     upStateBack:function(o,f,r){
			    	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
			    },
			    
				lookDetail:function(record){
					Ext.create('Rich.view.coupon.CouponDetailWindow',{rec:record.data}).showFor(this.upStateBack,this);
			    },
			    
			    listeners:{
			    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
			    		this.lookDetail(record);
			    	}
			    },
			    dockedItems:itm
			}]
		
		});
		this.callParent(arguments);
	}
});
