/**
 * 行程的人员
 */
Ext.define('Rich.view.journey.JourneyUser', {
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
        'Rich.model.Tuser',
        'Rich.view.journey.JourneyRemoveWindow',
        'Rich.view.game.GameAddParticipant',
        'Ext.form.FieldSet',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.journeyuser',
	
    id:null,
    ft:null,
    state:null,
    type:null,
    tid:null,
    loadById:function(id,ft,state){
    	this.id = id;
    	this.ft = ft;
    	this.state = state;
		var sto = this.lookupI('list').getStore();
		sto.getProxy().extraParams = {id:id,fromType:ft,type:0};
		sto.loadPage(1);
	},
	initComponent:function(){
		var me = this;
		var remove = Rich.RightManager.hasRight(Rich.V.journey_alter_user);//移除参与人权限
		var actionItems = [{
            icon: Rich.Url.icons_2,
            iconCls:'actioncolumn-margin',
            altText:'移除人员',
            tooltip: '移除人员',
            disabled:!remove,
            handler: function(gridview, rowIndex, colIndex) {
                var rec = gridview.getStore().getAt(rowIndex);
                this.up('gridpanel').lookDetail(rec);
            }
        }];
        
		var itms = [{
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
		        fieldLabel: '姓名',
		        name: 'name'
		    },{
		        fieldLabel: '手机号',
		        name: 'phone'
		    },{
			    xtype:'diccombo',
			    fieldLabel: '个人状态',
			    itemId:'myStatus',
			    name: 'myStatus',
			    editable:false,
			    typeName:'journey_user_state'
			},{
		    	xtype:'fieldcontainer',
		    	layout:'hbox',
		    	style:{float:"right",margin:"5px 10px 5px 10px"},
		    	width:90,
		    	items:[{
			    	xtype:'button',
			    	text:'搜索',
			    	margin:'0 6 0 0',
			    	cls:'r-btn-font-normal',
			    	handler:function(btn){
			    		var vs = this.up('form').getForm().getValues();
			    		vs.id = this.up('journeyuser').id;
			    		vs.fromType = this.up('journeyuser').ft;
			    		vs.type = 0;
			    		var sto = this.up('gridpanel').getStore();
			    		sto.getProxy().extraParams = vs;
			    		sto.loadPage(1);
			    	}
			    },{
			    	xtype:'button',
			    	text:'重置',
			    	cls:'r-btn-font-normal',
			    	handler:function(btn){
			    		this.up('form').getForm().reset();
			    	}
			    }]
		    }]
		}];
		if(this.tid == 1){
			itms.unshift({
				xtype:'toolbar',
				ui:'footer',
				itemId:'addPeople',
				items:[{
				xtype:'button',
				text:'添加人员',
				handler:function(btn){
					var jouId = this.up('journeyuser').id
					Ext.create('Rich.widget.CrudWindow',{
						title:this.text,
						width:600,
						height:400,
						crudForm:{
							xtype:'gameaddparticipant',
							tid:jouId,
							buttons:['c']
						}
					}).showFor(btn.returnFn,btn);
				},
				returnFn:function(){
					this.up('journeyuser').lookupI('list').getStore().reload();
				}
			}]
		});
		}
		
        var store = Ext.create('Ext.data.Store', {
				model:'Rich.model.Tuser',
		        pageSize: 50,
		        autoLoad:false,
		        proxy: {
			        type: 'ajax',
			        getMethod:function(){return 'get'},
			        url: Rich.Url.journeyTuserPath,
			        reader: {
			            type: 'json',
			            root: 'data',
			            totalProperty: 'data.totalRows',
			            idProperty: 'id'
			        }
			    }
			});
		Ext.apply(me,{
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[{
				flex:1,
				xtype:'gridpanel',
				itemId:'list',
				id:'yichu',
				loadMask: true,					
				padding:'0',
				bodyStyle:'',
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
				   	items:[{ text: '姓名', dataIndex: 'name',flex: 1 },
					        { text: '昵称', dataIndex: 'nickName',flex: 1 },
					        { text: '年龄', dataIndex: 'age',flex: 1},
					        { text: '性别', dataIndex: 'sexDesc',flex: 1},
					        { text: '手机号',    dataIndex: 'phone',flex: 1 },
					        { text: '身份证号', dataIndex: 'idCard',width:240 },					       
					        { text: '状态',    dataIndex: 'myStatusDesc',flex: 1 },
					        { text: '身份',    dataIndex: 'userType',flex: 1 ,renderer:function(v){
					        	if(v == 0){
					        		return '发起人';
					        	}else if(v == 1){
					        		return '参与人';
					        	}else{
					        		return '随行人员'
					        	}
				        	}},
				        	{ text: '已收金额',    dataIndex: 'payFee',flex: 1 },
				        	{ text: '退款金额',    dataIndex: 'drawBack',flex: 1 },
					       	{
					        	text:'操作',
					            xtype:'actioncolumn',
					            width:110,
					            items: actionItems
					        }
						]},
					lookDetail:function(rec){
						if((this.up('journeyuser').ft) == 3){
							this.toDoRemoveMem(rec);
						}else{
							this.doRemoveMem(rec);
						}
					},
					toDoRemoveMem:function(rec){
						Ext.create('Rich.view.journey.JourneyRemoveWindow',{
		        				jourId:this.up('journeyuser').id,
		        				statusId:rec.get('statusId'),
		        				userType:rec.get('userType'),
		        				userId:rec.get('id')
							}).showFor(this.removeBack,this);
				    	},
				    	
			    	doRemoveMem:function(rec){
						if(rec){
						Ext.Msg.prompt('删除', '确定删除这个参与人吗？\n请输入原因:',function(btn, text){
						    if(text && text !=''){
							    if (btn == 'ok'){
							        this.el.mask('删除中...');
			    	        		Rich.JsonAjax.request({
			    	        			method:'post',
				    	        		url:Rich.Url.journeyTuserDelPath,
				    	        		params:{
				    	        			reason:text,
				    	        			userType:rec.get('userType'),
							        		userId:rec.get('id'),
							        		jourId:this.up('journeyuser').id
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
		        		 Ext.getCmp('yichu').getStore().reload();
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
		this.callParent(arguments);
	}
});
