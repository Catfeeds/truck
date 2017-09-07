Ext.define('Rich.view.homepage.Main', {
	requires:[
        'Rich.Value',
        'Ext.grid.column.Action',
        'Ext.grid.Panel',
        'Rich.Url',
        'Ext.layout.container.Absolute'
    ],
   
    uses:[],
    extend: 'Ext.panel.Panel',
    alias:'widget.homepage',
     
	initComponent:function(){
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			itemId:'one',
			model:'Rich.model.Cust',
	        pageSize: 50,
	        autoLoad:true,
	        proxy: {
		        type: 'ajax',
		        url: Rich.Url.messagePushPath,
		        reader: {
		            type: 'json',
		            root: 'data.pageData',
		            totalProperty: 'data.totalRows'
		        }
		    }
		});
		
		
		Ext.apply(me,{
			layout:'absolute',
			//layout:'hbox',
			showFn:function(){
				Rich.Relax.add(this,'doMyLayout');
			},
			doMyLayout:function(){
				var ct = this.ownerCt;
            	var os = 30;
            	var cw = ct.body.getWidth();
            	var ch = ct.body.getHeight();
            	var pt = (cw - os*3)/7;

            	var hh = ch-os*2;
            	var itm = this.items.getAt(0);
            	itm.setSize(pt*3,hh);
            	itm.alignTo(this,'tl',[os,os]);
            	itm = this.items.getAt(1);
            	itm.setSize(pt*4,hh);
            	itm.alignTo(this,'tl',[os*2+pt*3,os]);
			},
			items:[{
	    	        title: '待办事项',
					xtype:'gridpanel',
					itemId:'list',
					//id:'test1',
					draggable:true,
					resizable:true,
					collapsible:true,
					width:500,
					height:500,
					frame:true,
					width:200,
					height:300,
					frame:true,
					loadMask: true,     
					padding:'0',
					id:'daibaishixiang',
			    	forceFit:true,
			    	store: store,
				    bbar: Ext.create('Ext.PagingToolbar', {
			            store: store,
			            displayInfo: true,
			            displayMsg: '{0} - {1}',
			            emptyMsg: "没数据",
			            items:['-']
			        }),
				  /* listeners:{
				    	 'render': function() {
						  this.clockGo();
						  }
				    },
				    clockGo:function(){
				    	var me = this;
					    Ext.TaskManager.start({
					    run: function() {
					    	me.getStore().reload();
					    },
					    interval: 120000
					  });
				    	
				    },*/
				 	columnLines: true,
				    columns: {
					   	defaults:{
					        sortable:false,
					        draggable:false,
					        enableColumnHide:false,
					        menuDisabled:true
					   	},
					   	items:[
					        { text: '标题', dataIndex: 'title',flex:50},
					        { text: '内容', dataIndex: 'alert',flex: 140 },
					        {
					        	text:'管理',
					            xtype:'actioncolumn',
					            items: [{
					                icon: 'resources/images/icons/8.png',
					                iconCls:'actioncolumn-margin',
					                altText:'标记为已办',
					                tooltip: '标记为已办',
					                handler: function(gridview, rowIndex, colIndex) {
					                    var rec = gridview.getStore().getAt(rowIndex);
					                    this.up('gridpanel').doUpdateState(rec);
					                }
					            }]
					        }
					]},
					doUpdateState:function(rec){
				    	this.el.mask('请稍后...');
    	        		Rich.JsonAjax.request({
    	        			method:'post',
	    	        		url:Rich.Url.messageReadPAth,
	    	        		params:{
	    	        			id:rec.get('id')
	    	        			
				        	},
	    	        		callback:this._upStateBack,
	    	        		scope:this
    	        		});
				    },
				    _upStateBack:function(o,f,r){
				    	this.el.unmask();
	    	        	if(f){
	    	        		this.getStore().reload();
	    	        	}
				    }
	    	    },{
				width:500,
				height:500,
				xtype:'sectionpanel',
				title:'行程',
				layout:'fit',
				icon:Rich.Url.icons_21,
				tools:[{
				    type:'refresh',
				    tooltip: '刷新',
				    handler: function(event, toolEl, panelHeader) {
				    	this.up('homecalendar').freshData();
				    }
				}],
				collapsible:true,
				frame:true,
				resizable:true,
				draggable:true,
				items:[{
	                ctype: 'Rich.view.homepage.Calendar',
	                showFn:function(){
	                	Rich.Relax.add(this,'freshData');
	                }
				}]
			},{
				xtype:'button',
				x:5,
				y:5,
				cls:'r-btn-transparent r-btn-small-thin',
				icon:Rich.Url.icons_22,
				handler:function(){
					this.up('homepage').doMyLayout();
				}
			}]
		});
		me.callParent(arguments);
	}
});
