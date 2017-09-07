/**
 * 评价界面
 */
Ext.define('Rich.view.journey.JourneyEvaluate', {
	requires:[
		'Rich.widget.Message',
		'Ext.grid.Panel',
		'Ext.form.Panel',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action', 
        'Ext.form.field.File',
        'Rich.view.journey.JourneyEvaluateDetail',
        'Ext.toolbar.Paging',
        'Rich.model.Evaluate',
        'Rich.component.DicComboBox',
        'Rich.Value',
        'Rich.Url'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.journeyevaluate',
    id:null,
    loadById:function(id){
    	this.id = id;
		var sto = this.lookupI('grid').getStore();
		sto.getProxy().extraParams = {itemId:id};
		sto.loadPage(1);
	},
	
	initComponent:function(){
		var me = this;
		var detail = Rich.RightManager.hasRight(Rich.V.evaluate_detail);//评价的详情
		var remove = Rich.RightManager.hasRight(Rich.V.evaluate_delete);//评价删除
		var reply = Rich.RightManager.hasRight(Rich.V.evaluate_reply);//评价回复
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
        	icon: 'resources/images/icons/27.png',
	        iconCls:'actioncolumn-margin',
	        altText:'回复评论',
	        tooltip: '回复评论',
	        disabled:!reply,
	        handler: function(gridview, rowIndex, colIndex) {
	            var rec = gridview.getStore().getAt(rowIndex);
	            this.up('gridpanel').reply(rec);
	        	}
	     },{ 
	        icon: 'resources/images/icons/2.png',
            iconCls:'actioncolumn-margin',
            altText:'删除人员',
            tooltip: '删除人员',
            disabled:!remove,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').removeMem(rec);
            	}
            }];
		var store = Ext.create('Ext.data.Store', {
			model:'Rich.model.Evaluate',
	        pageSize: 50,
	        autoLoad:false,
	        proxy: {
		        type: 'ajax',
		        url: Rich.Url.journeyEvaluatePath,
		        reader: {
		            type: 'json',
		            idProperty: 'id',
		            root: 'data.pageData'
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
					        { text: '评论人', dataIndex: 'userName',flex: 1 },
					        { text: '总评分', dataIndex: 'raty',flex: 1 },
					        { text: '评分日期', dataIndex: 'time',flex: 1},
					        { text: '评论内容', dataIndex: 'content',flex: 1},
					        { text: '回复内容',    dataIndex: 'replyContent',flex: 1 },
					       	{
					        	text:'操作',
					            xtype:'actioncolumn',
					            width:110,
					            items: actionItems
					        }
					]},
					
					lookDetail:function(rec){
						var id = rec.get('id');
						Ext.create('Rich.view.journey.JourneyEvaluateDetail').showByJourneyId(id);
				    },
				    reply:function(rec){
						if(rec){
						Ext.Msg.prompt('回复', '请输入回复:',function(btn, text){
						    if(text && text !=''){
							    if (btn == 'ok'){
							        this.el.mask('回复...');
			    	        		Rich.JsonAjax.request({
			    	        			method:'post',
				    	        		url:Rich.Url.journeyEvaluateReplyPath,
				    	        		params:{
				    	        			content:text,
							        		evaluateId:rec.get('id')
							        	},
				    	        		callback:this.removeBack,
				    	        		scope:this
			    	        		});
							    }
						    }else{
						    	Rich.Msg.alert('提示','你取消了回复.');
						    	return false;
						    }
						},this);
						}
				    },
				    removeMem:function(rec){
						if(rec){
						Ext.Msg.prompt('删除', '确定删除这条评论吗？\n请输入原因:',function(btn, text){
						    if(text && text !=''){
							    if (btn == 'ok'){
							        this.el.mask('删除中...');
			    	        		Rich.JsonAjax.request({
			    	        			method:'post',
				    	        		url:Rich.Url.journeyEvaluateDeletePath,
				    	        		params:{
							        		id:rec.get('id')
							        	},
				    	        		callback:this.removeBack,
				    	        		scope:this
			    	        		});
							    }
						    }else{
						    	Rich.Msg.alert('提示','原因是必须输入的.');
						    	return false;
						    }
						},this);
							
						}
				    },
				    removeBack:function(o,f,r){
	    	        	this.el.unmask();
	    	        	if(f){
	    	        		this.getStore().reload();
	    	        	}
	    	        },
	    	        listeners:{
				    	"itemdblclick0":function(gd,record, item, index, e, eOpts){
				    		this.lookDetail(record.get('userName'));
				    	}
				    }
				}]
		});
		me.callParent(arguments);
	}
});
