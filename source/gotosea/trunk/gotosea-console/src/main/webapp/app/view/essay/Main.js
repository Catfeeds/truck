/**
 * 文章管理列表
 */
Ext.define('Rich.view.essay.Main', {
	requires:[
		'Ext.grid.Panel',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Date',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.form.field.File',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.view.essay.EssayForm',
        'Rich.Value',
        'Rich.Url',
        'Rich.model.Essay',
        'Rich.widget.CrudWindow'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.essaymain',
    
    getWharfId:function(){
    	return this.wharf.get('id');
    },
     
	initComponent:function(){
		var me = this;
		var al = Rich.RightManager.hasRight(Rich.V.rest_art_list);//列表加载的权限
		var detail = Rich.RightManager.hasRight(Rich.V.rest_art_detail);//详情的权限
		var status = Rich.RightManager.hasRight(Rich.V.rest_art_status);//发布的权限
		var delet = Rich.RightManager.hasRight(Rich.V.rest_art_delete);//删除的权限
		var actionItems = [];
		actionItems.push({
			width:50,
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
            
        },{
            icon: Rich.Url.icons_2,
            iconCls:'actioncolumn-margin',
            altText:'删除',
            tooltip: '删除',
            disabled:!delet,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').toDelete([rec]);
            }
        });
        
        var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"公共"},
		        {"abbr":"1", "name":"海钓"},
		        {"abbr":"2", "name":"海岛游"}
		    ]
		});
        
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Essay',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.essayPagePath,
		       	method:'post',
		        limitParam: "size",
		        reader: {
		            type: 'json',
		            rootProperty: 'data.content',
		            totalProperty: 'data.totalElements',
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
			        fieldLabel: '文章标题',
			        name: 'keyword'
			    },{
			    	fieldLabel: '任务类型',
					xtype:'combo',
			        itemId:'statu',
			        name: 'bizId',
			        editable:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
		            xtype      : 'fieldcontainer',
		            fieldLabel : '创建日期',
		            width:400,
		            defaults: {
		                hideLabel: true
		            },
		            layout: 'hbox',
		            items: [{
						xtype: 'datefield',
						flex:1,
					    anchor: '100%',
					    name: 'startTime',
					    format:'Y-m-d'
					},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
						xtype: 'datefield',
						flex:1,
						name: 'endTime',
					    anchor: '100%',
					    format:'Y-m-d'
					}]
		        },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_art_list,
			    	style:{float:"right",margin:"5px 10px 5px 0"},
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    },{
			    	xtype:'button',
			    	text:'搜索',
			    	cls:'r-btn-font-normal',
			    	rightId:Rich.V.rest_art_list,
			    	style:{float:"right",margin:"5px 10px 5px 10px"},
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    }]
			}];
		
		itms.unshift({
			xtype:'toolbar',
			ui:'footer',
			items:[{
				xtype:'button',
				text:'添加文章',
				rightId:Rich.V.rest_art_add,
				handler:function(btn){
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:0.6,
						height:0.8,
						crudForm:{
							xtype:'essayform',
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('essaymain').lookupI('grid').getStore().reload();
				}
			}]
		});
		
		
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
				        { text: 'ID', dataIndex: 'id',flex: 1},
				        { text: '文章标题', dataIndex: 'title',flex: 1 },
				        { text: '概要', dataIndex: 'summary',flex: 1 },
				        { text: '阅读量', dataIndex: 'readQuantity',flex: 1 },
				        { text: '点赞量', dataIndex: 'thumbQuantity',flex: 1 },
				        { text: '创建日期', dataIndex: 'releaseDate',flex: 1 },
				        { text: '状态', dataIndex: 'status',flex: 1,renderer:function(v){
			        		if(v == 0){
			        			return '未发布';
			        		}else{
			        			return '已发布';
			        		}}
				        },{
				        	text:'操作',
				            xtype:'actioncolumn',
				            tdCls:'x-column-header-last',
				            items: actionItems
				        }
				]},
				
				lookDetail:function(record){
					Ext.create('Rich.widget.CrudWindow',{
						title:'文章详情',
						width:0.6,
						height:0.8,
						crudForm:{
							xtype:'essayform',
							tid:record.get('id'),
							buttons:['u']
						}
					}).showByParams({id:record.get('id')},this.upStateBack,this);
			    },
			    
			    toDelete:function(reds){
			    	var ids = [];
			    	for(var i=0;i<reds.length;i++){
			    		ids.push({id:reds[i].get('id')});
			    	}
			    	var idss = Ext.encode(ids);
			    	Ext.Msg.confirm('提示','确定删除这篇文章?',function(btn){
			        	if (btn == 'yes'){
			        		Rich.JsonAjax.request({
			        			method:'DELETE',
		    	        		url:Rich.Url.essayAllPath,
		    	        		params:idss,
		    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
		    	        		callback:this.upStateBack,
		    	        		scope:this
			        		});
			        	}
			    	},this);
			    },
			    
			    toUpdatastatus:function(rec){
			    	var data = rec.data;
			    	var sta = data.status;
			    	if(sta == 0){
			    		var msg = '你确定发布这篇文章吗?';
			    		data.status = 1;
			    	}else{
			    		var msg = '你确定撤回这篇文章吗?';
			    		data.status = 0;
			    	}
			    	Ext.Msg.confirm('提示',msg,function(btn){
			    		var dat = Ext.encode(data);
			        	if (btn == 'yes'){
			        		Rich.JsonAjax.request({
			        			method:'put',
		    	        		url:Rich.Url.essayAllPath,
		    	        		headers:{'Content-Type':'application/json;charset=UTF-8'},
		    	        		params:dat,
		    	        		callback:this.alert,
		    	        		scope:this
			        		});
			        	}
			    	},this);
			    },
			    
			    alert:function(o,f,r){
			    	this.el.unmask();
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
