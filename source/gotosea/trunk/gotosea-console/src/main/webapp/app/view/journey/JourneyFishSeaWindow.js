/*
 * 拼船取消行程及退款的窗口
 * */
Ext.define('Rich.view.journey.JourneyFishSeaWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.journeyfishseawindow',
    minWidth:300,
    minHeight:200,
    width:0.4,
    autoScroll:true,
    title:'退款信息',
 
    
    id:null,//行程ID
    showById:function(id){
    	this.id = id;
    	this.show();
    	this.el.mask('加载中');
    	Rich.JsonAjax.request({
			url:Rich.Url.journeyTuserPath,
			params:{
				type:1,
				id:id
			},
			method:'get',			        			
			callback:function(o,f,r){
				this.el.unmask();
				if(f){
					this.lookupI('drawBacks',true).applyValue(r.responseJson.data);
				}
			},
			scope:this
		});
    	
    },
    
    initComponent:function(){
    	var me = this;   
    	Ext.apply(me,{
    		layout:'fit',
    		items:[{
    			itemId:'form',
    			xtype:'form',
    			padding:'10 10 10 10',
				items:[{
				 	layout: {
				        type: 'hbox',
				        margin:'5 5 5 5',
				        align: 'stretch'
				    },
				 	items:[{    
				 		itemId:'drawBacks',
				       	flex:1,
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
		        	            margin:'5 5 5 5',
		        	            layout: {
							        type: 'hbox'
							    },
	        	            	items:[{
	    							xtype:'textfield',
	                				value:(v?v.orderId:null),
	                				hidden:true,
	    							name:'drawBacks_orderId'
	        	            	},{
	    							xtype:'textfield',
	                				value:(v?v.statusId:null),
	                				hidden:true,
	    							name:'drawBacks_statusId'
	        	            	},{
	    							xtype:'textfield',
	                				value:(v?v.id:null),
	                				hidden:true,
	                				flex:1,
	                				labelWidth:40,
	    							name:'drawBacks_userId'
	        	            	},{
	    							xtype:'textfield',
	                				value:(v?v.name:null),
	                				readOnly:true,
	                				flex:1,
	                				labelWidth:40,
	                				fieldLabel: '姓名',
	    							name:'drawBacks_name'
	        	            	},{
					                xtype:'numberfield',
					                flex:1,
			                		readOnly:true,
			                		value:(v?v.payFee:null),
					                fieldLabel: '已收金额',
					                labelWidth:60,
					                name: 'payFee'
					            },{
					                xtype:'numberfield',
					                flex:1,
			                		allowblank:false,
			                		value:(v?v.sale:null),
					                fieldLabel: '退款金额',
					                itemable:'drawBacks_drawBack',
					                labelWidth:60,
					                name: 'drawBacks_drawBack'
					            }]
							};
						},
				        	layout: {
						        type: 'vbox',
						        align: 'stretch'
						    }
						}]
	        		},{
		        		xtype:'htmleditor',
		                margin:'5 5 5 5',
		                fieldLabel: '原因',
		                labelWidth:40,
		                itemId:'reason',
		                flex:1,
		                height:150,
		                allowBlank:false,
		                name: 'reason'
		            }]
    		}],
    		buttons:[{
    			text:'确定',
    			handler:function(btn){
    				this.up('window').toSubmit();
    			}
    		}]
    	});
    	me.callParent(arguments);
    },
    toSubmit:function(){
    	var fm = this.lookupI('form');
    	if(!fm.isValid()){
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = fm.getForm().getValues();
    	vas.jourId = this.id;
    	vas.userId = vas.drawBacks_userId;
    	vas = this.fixValues(vas,['drawBacks_userId','drawBacks_statusId','drawBacks_orderId','drawBacks_drawBack']);    	  
		Rich.JsonAjax.request({
			method:'post',
    		url:Rich.Url.journeyFishCalPath,
    		params:vas,
    		callback:this.removeBack,
    		scope:this
		});
    },
	removeBack:function(o,f,r){
    	this.returnCallback(null);
    },
    
    returnCallback:function(records){
		Rich.Relax.add(this,'close');
		if(this.callback){
		    this.callback.call(win.scope || window,records);
		}
	},
    
	fixValues:function(va,keys){
    	var i,j,k,kv,arr;
    	for(i=0;i<keys.length;i++){
    		k = keys[i];
    		arr = va[k];
    		if(!Ext.isEmpty(arr) && !Ext.isArray(arr)){
    			arr = [arr];
    		}
    		if(!Ext.isArray(arr)){
    			continue;
    		}
    		kv = k.split('_');
    		for(j=0;j<arr.length;j++){
	    		va[kv[0]+'['+j+'].'+kv[1]] = arr[j];
    		}
    		delete va[k];
    	}
    	return va;
    }
});