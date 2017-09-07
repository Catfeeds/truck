
Ext.define('Rich.view.ship.TagForm',{
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
    alias:'widget.tagform',
    minWidth:400,
    minHeight:400,
    width:0.6,
    height:0.6,
    
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
    	
		var tagTypeStore = Ext.create('Ext.data.Store',{
	        proxy: {  
	            type: 'ajax',  
	            url: Rich.Url.shipTagTypePath+'1002',   
	            reader: {  
	                type: 'json', 
	                rootProperty: 'data'
	            }  
	        },
	        fields: ["id", "name"] 
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
						return {
	        	            xtype : 'fieldcontainer',
	        	            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
	        	            items:[{
	        	            	xtype:'combobox',
	        	            	fieldLabel: '选择服务',
							    store:tagTypeStore,
							    queryMode: 'remote',
							  	valueField: 'id',
							    displayField: 'name',
							    name:'pubResourceId',
							    editable:false
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
	    						xtype:'button',
	    						iconCls:'r-button-close',
	    						margin:'0 0 0 5',
	    						handler:function(btn){
	    							var pi = btn.up('fieldcontainer');
	    							pi.getOwnerCt().remove(pi);
	    						}
	    					}]
						}
					},
		        	dockedItems:{
		        		docked:'top',
		        		ui:'light',
		        		xtype:'toolbar',
		        		items:[{
		        			text:'添加计划服务',
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
    	var ServiePubReso = [];
    	if(Ext.isArray(vas.pubResourceId) && vas.pubResourceId.length > 0){
	    	for(var i = 0,j = 0;i<vas.pubResourceId.length;i++){
	    		for( j = i+1;j<vas.pubResourceId.length;j++){
	    			if(vas.pubResourceId[i] == vas.pubResourceId[j]){
						Rich.Msg.alert('提示','服务类型重复');
						return;
					}
	    		}
	    	};
    		
    		for(var i = 0;i<vas.pubResourceId.length;i++){
    			ServiePubReso.push({pubResourceId:vas.pubResourceId[i],marketPrice:vas.marketPrice[i]*100,
    				preferPrice:vas.preferPrice[i]*100,costPrice:vas.costPrice[i]*100})
    		};
    	}else{
			ServiePubReso.push({pubResourceId:vas.pubResourceId,marketPrice:vas.marketPrice*100,
			preferPrice:vas.preferPrice*100,costPrice:vas.costPrice*100})
		};
    	vas.pubResos = ServiePubReso;
    	return Ext.encode(vas);
    },
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.shipTagAddPath;
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
	    	
	    	}else if(s=='c'){
	    		this.loadById(this.userId);
	    	}
    	}
    }
});