/*
 * 查询船只窗体
 * */
Ext.define('Rich.view.freshcatch.FishSearchWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	,'Rich.model.FreshCatch'],
    extend: 'Rich.widget.Window',
    alias:'widget.fishsearchwindow',
    minWidth:300,
    minHeight:200,
    widthPercent:0.5,
    heightPercent:0.5,
    autoScroll:true,
    title:'查询渔获',
    
    callback:null,
    scope:null,
    multiSelect:false,
    
    initComponent:function(){
    	var me = this;
    	var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.FreshCatch',
	        pageSize: 50,
	        autoLoad:true,	        
	        proxy: {
		        type: 'ajax',		       
		       	url: Rich.Url.fishcatchPagPath,	
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
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
					selModel:{selType:'checkboxmodel',mode:(me.multiSelect?'MULTI':'SINGLE')},
					selType: 'checkboxmodel',
					loadMask: true,					
					padding:'0',
					bodyStyle:'',
			    	forceFit:true,
			    	store: store,
			    	dockedItems:[{
		    			docked:'top',
		    			xtype:'form',
		    			style:{padding:"10px"},
				    	docked:'top',
				    	defaults:{
				    		xtype:'textfield',
				    		labelWidth:70,
				    		style:{float:"left",margin:"5px 0  5px 10px"}
				    	},
				    	layout:'auto',
		    			items:[{
					        fieldLabel: '渔获名称',
					        name: 'name'
					    },{
		    				xtype:'button',
		    				text:'搜索',
		    				handler:function(btn){
		    					var vas = this.up('form').getForm().getValues();
					    		var sto = this.up('gridpanel').getStore();
					    		sto.getProxy().extraParams = vas;
					    		sto.loadPage(1);
		    				}
		    			}]
		    		}],
					bbar:Ext.create('Ext.PagingToolbar', {
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
					        { text: '内容', dataIndex: 'content',flex: 1}  
					]}
    		}],
    		
    		returnCallback:function(records){
    			Rich.Relax.add(win,'close');
    			if(this.callback){
				    this.callback.call(win.scope || window,records);
    			}
    		},
    		
    		buttons:[{
    			text:'确定',
    			handler:function(btn){
    				win = btn.up('fishsearchwindow');
    				var records = win.lookupI('grid').getSelectionModel().getSelection();
    				if(win.multiSelect){
    					win.returnCallback(records);
    				}else{
    					if(records.length > 0){
    						win.returnCallback(records[0]);
    					}else{
    						win.returnCallback(null);
    					}
    				}
    			}
    		}]
    	});
    	me.callParent(arguments);
    }
});