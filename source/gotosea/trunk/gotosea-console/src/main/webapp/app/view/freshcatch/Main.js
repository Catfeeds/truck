/**
 * 渔获main
 */
Ext.define('Rich.view.freshcatch.Main', {
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
        'Rich.model.FreshCatch',
        'Ext.form.field.File',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox',
        'Rich.view.freshcatch.FishCatchForm',
        'Rich.Value',
        'Rich.Url',
        'Rich.widget.CrudWindow'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.freshcatchmain',
    
     getWharfId:function(){
    	return this.wharf.get('id');
    },
     
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.fish_detail);//详情权限
		var del = Rich.RightManager.hasRight(Rich.V.fish_del);//删除权限
		var al = Rich.RightManager.hasRight(Rich.V.fish_page);
		var actionItems = [{
            icon: 'resources/images/icons/6.png',
            iconCls:'actioncolumn-margin',
            altText:'查看详情',
            tooltip: '查看详情',
            disabled:!detail,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        },{
    		icon: 'resources/images/icons/2.png',
            iconCls:'actioncolumn-margin',
            altText:'删除',
            tooltip: '删除',
            disabled:!del,
    		handler:function(gridview, rowIndex, colIndex){
	            var rec = gridview.getStore().getAt(rowIndex);
	            this.up('gridpanel').remove(rec);
    		}
	    	}];
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
		        fieldLabel: '渔获名称',
		        name: 'name'
		    },{
		    	xtype:'button',
		    	text:'重置',
		    	cls:'r-btn-font-normal',
		    	rightId:Rich.V.fish_page,
		    	style:{float:"right",margin:"5px 10px 5px 0"},
		    	handler:function(btn){
		    		this.up('form').getForm().reset();
		    	}
		    },{
		    	xtype:'button',
		    	text:'搜索',
		    	cls:'r-btn-font-normal',
		    	style:{float:"right",margin:"5px 10px 5px 10px"},
		    	rightId:Rich.V.fish_page,
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
					text:'新建鱼的品种',
					rightId:Rich.V.fish_add,
					handler:function(btn){
						Ext.create('Rich.widget.CrudWindow',{
							title:this.text,
							width:0.4,
							height:0.6,
							crudForm:{
								xtype:'fishcatchform',
								userType:btn.userType,
								buttons:['c']
							}
						}).showFor(btn.returnFn,btn);
					},
					returnFn:function(){
						this.up('freshcatchmain').lookupI('grid',true).getStore().reload();
					}
				}]
			});
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.FreshCatch',
	        pageSize: 50,
	        autoLoad:al,	        
	        proxy: {
		        type: 'ajax',		       
		       	url: Rich.Url.fishcatchPagPath,	
		        reader: {
		            type: 'json',
		            rootProperty: 'data.pageData',
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
				loadMask: true,					
				padding:'0',
				bodyStyle:'',
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
				        { text: '渔获名称', dataIndex: 'name',flex: 1 },
				        { text: '摘要', dataIndex: 'digest',flex: 1 },
				        { text: '内容', dataIndex: 'content',flex: 1},
				        {
				        	text:'操作',
				            xtype:'actioncolumn',
				            width:70,
				            items: actionItems
				        }
				]},
				
				lookDetail:function(record){
					Ext.create('Rich.widget.CrudWindow',{
						title:'鱼获详情',
						width:0.4,
						height:0.6,
						crudForm:{
							xtype:'fishcatchform',
							buttons:['u']
						}
					}).showByParams({id:record.get('id')},this.upStateBack,this);
			    },
			    
			   	remove:function(record){
			   		Rich.JsonAjax.request({
	        			method:'post',
    	        		url:Rich.Url.fishcatchDelPath,
    	        		params:{
    	        			ids:record.get('id')
    	        		},
    	        		callback:this.removeBack,
    	        		scope:this
	        		});
			   	},
			    removeBack:function(o,f,r){
    	        	this.el.unmask();
    	        	if(f){
    	        		this.getStore().reload();
    	        	}
    	        },
			    listeners:{
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
