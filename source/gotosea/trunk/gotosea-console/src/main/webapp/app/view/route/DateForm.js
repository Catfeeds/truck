
Ext.define('Rich.view.route.DateForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.dateform',
    minWidth:300,
    minHeight:200,
    userType:'all',
    
    id:null,
    
    loadById:function(id){
    	this.id = id;
		this.doRetrieve({id:id});
	},
    
    initComponent:function(){
    	var me = this;
    	var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"可出行"},
		        {"abbr":"1", "name":"不可出行"}
		    ]
		});
    	
    	Ext.apply(me,{
	    	cls:'r-highlight-disabled',
	    	bodyStyle:'overflow-x:hidden;overflow-y:auto;',
	        fieldDefaults: {
	            labelAlign: 'left',		           
	            msgTarget: 'side'
	        },
	        layout: {
		        type: 'hbox',
		        align: 'stretchmax'
		    },
		    defaults: {
	            border: false,
	            xtype: 'panel',
	            flex: 1,
	            layout: 'anchor'
	        },
	        items: [{
	        	itemId:'leftCt',
	        	margin:'10 10 10 20',
	        	defaults:{anchor:'100%'},
	            items:[{
					itemId:'notices',
					layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
			        flex:1,
			        margin:'5 0 0 0',
					padding:'0 5 5 5',
					applyValue:function(v,notClean){
						if(!notClean){
				 			this.removeAll();
				 		}
				 		if(Ext.isArray(v) && v.length > 0){
						 	var its = [],it;
						 	for(var i = 0;i < v.length;i++){
						 		its.push(this.createItemByValue(v[i]));
						 	}
						 	this.add(its);
				 		}
					},
					createItemByValue:function(v){
						if(v == undefined){
							var date = null;
							var items = this.items.items;
							if(items.length > 0){
								var it = this.getComponent(items.length - 1);
								var dt = it.lookupI('offerDate').getValue();
								date = Ext.Date.format(Ext.Date.add(dt, Ext.Date.DAY, 1),'Y-m-d');
							}
							if(date==null){
								date = new Date();
							}
						}else{
							var date = v.offerDate;
						}
						
						return {
	        	            xtype : 'fieldcontainer',
	        	            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
	        	            items:[{
	        	            	xtype:'hiddenfield',
	        	            	value:(v?v.numToSale:0),
	        	            	name:'numToSale'
	        	            },{
    							xtype:'datefield',
    							fieldLabel: '出行日期',
    							format:'Y-m-d',
    							name:'offerDate',
    							itemId:'offerDate',
    							value:date,  
    							allowBlank:false,
    							flex:1
	        	            },{
	        	            	padding:'0 0 0 10',
    							xtype:'numberfield',
    							fieldLabel: '市场价',
    							emptyText:'单位(元)',
    							name:'marketPrice',
    							minValue: 0,
							    decimalPrecision:0,
    							labelWidth:60,
    							allowBlank:false,
    							value:(v?v.marketPrice:null),
    							flex:0.7
	        	            },{
	        	            	padding:'0 0 0 10',
    							xtype:'numberfield',
    							fieldLabel: '优惠价',
    							name:'preferPrice',
    							emptyText:'单位(元)',
    							labelWidth:60,
    							minValue: 0,
							    decimalPrecision:0,
    							allowBlank:false,
    							value:(v?v.preferPrice:null),
    							flex:0.7
	        	            },{
	        	            	padding:'0 0 0 10',
    							xtype:'numberfield',
    							fieldLabel: '成本价',
    							name:'costPrice',
    							emptyText:'单位(元)',
    							labelWidth:60,
    							minValue: 0,
							    decimalPrecision:0,
    							allowBlank:false,
    							value:(v?v.costPrice:null),
    							flex:0.7
	        	            },{
	        	            	padding:'0 0 0 10',
						    	fieldLabel: '状态',
								xtype:'combo',
								labelWidth:40,
						        itemId:'statu',
						        name: 'status',
						        value:0,
						        flex:0.7,
						        editable:false,
							    store: states,
							    queryMode: 'local',
							    displayField: 'name',
							    valueField: 'abbr'
						    }]
						};
					},
		        	dockedItems:{
		        		docked:'top',
		        		ui:'light',
		        		xtype:'toolbar',
		        		items:[{
		        			text:'添加计划日期',
		        			handler:function(btn){
		        				var ct = btn.getOwnerCt('notices');
		        				ct.add(ct.createItemByValue());
		        			}
		        		}]
		        	}
		        }]
			}]
    	});
    	me.callParent(arguments);
    },
    getFormValues:function(){
    	if(!this.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getValues();
    	vas.serviceId = this.tid;
    	var plans = [];
    	if(Ext.isArray(vas.status) && vas.status.length > 0){
    		for(var i = 0;i<vas.status.length;i++){
	    		if(vas.status[i] != 1){
	    			plans.push({offerDate:vas.offerDate[i],marketPrice:vas.marketPrice[i]*100,
	    			preferPrice:vas.preferPrice[i]*100,costPrice:vas.costPrice[i]*100,numToSale:vas.numToSale[i]});
	    		}
	    	}
    	}else{
    		plans.push({offerDate:vas.offerDate,marketPrice:vas.marketPrice,
	    	preferPrice:vas.preferPrice,costPrice:vas.costPrice,numToSale:vas.numToSale});
    	}
    	
    	vas.plans = plans;
    	return Ext.encode(vas);
    },
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.routeSaleAPath;
    	}else if(sta == 'r'){
    		return Rich.Url.routeSaleDPath+this.tid;
    	}else if(sta == 'u'){
    		return Rich.Url.tuserBankUpdatePath;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    },
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		this.loadById(this.userId);
	    	}else if(s=='r'){
	    		this.getForm().setValues(r.responseJson.data.content);
    			this.lookupI('notices').applyValue(r.responseJson.data.content);
    			this.toStatus(s);
	    	}else if(s=='c'){
	    		this.loadById(this.userId);
	    	}
    	}
    }
});