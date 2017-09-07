﻿/*
 * 评价详情窗体
 * */
Ext.define('Rich.view.journey.JourneyEvaluateDetail',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.journeyevaluatedetail',
    minWidth:300,
    minHeight:200,
    widthPercent:0.6,
    heightPercent:0.6,
	title:'评论详情',
 
    
    journeyId:null,//订单ID
  
    orderType:0,
    showByJourneyId:function(jourId){
    	this.journeyId = jourId;
    	this.show();
    	
    	var url = Rich.Url.journeyEvaluateDetailPath;
    	this.el.mask('加载中');
    	Rich.JsonAjax.request({
			url:url,
			params:{
				id:jourId
			},
			method:'get',			        			
			callback:function(o,f,r){
				this.el.unmask();
				if(f){
					this.lookupI('form').getForm().setValues(r.responseJson.data);
					this.lookupI('eimgs').applyValue(r.responseJson.data.eimgs);
					this.lookupI('cimgs').applyValue(r.responseJson.data.cimgs);
				}
			},
			scope:this
		});
    	
    },
    
    initComponent:function(){
    	var me = this;   
    	Ext.apply(me,{
    		layout:'fit',
    		dockedItems:{
    			docked:'top',
    			itemId:'topToolbar',
    			xtype:'toolbar',
    			items:['->']
    		},
    		items:[{
				xtype:'form',
				itemId:'form',
				cls:'r-highlight-disabled',
		        defaults: {
		            border: false,
		            xtype: 'panel',
		            flex: 1,
		            layout: 'anchor',
		            defaults:{
		            	anchor: '80%'			            
		            }
		        },
		        layout: 'hbox',
		        items: [{xtype:'box',flex:0.3},{
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '评论人账号',
		                name: 'userName'
		            
		            },{
		                xtype:'textfield',
		                fieldLabel: '昵称',
		                name: 'nickName'
		            },{
		                xtype:'textfield',
		                fieldLabel: '手机号',
		                name: 'phone'
		            },{
		                xtype:'textfield',
		                fieldLabel: '评论时间',
		                name: 'time'
		            },{
		                xtype:'textfield',
		                fieldLabel: '船只编号',
		                name: 'shipNo'
		            },{
		                xtype:'textarea',
		                fieldLabel: '评价内容',
		                name: 'evaluate'
		            },{
				        itemId:'eimgs',	 
				        name:'eimgs',
			        	layout: {
					        type: 'hbox',
					        align: 'stretch'
					   	},
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
							var se = this.seed++;

	        				return {
	        	            	items:[{
	    							xtype:'hiddenfield',
	    							name:'eimgs_imgUrl',
	    							value:se
	        	            	},{
	    							xtype:'image',
	    							src:(v?v.fullUrl:null),
	    							height:135,
	    							width:135
	        	            	}]
							};
						}
		            }]
		        },{xtype:'box',flex:0.3},{
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{		            	
		                xtype:'textfield',
		                fieldLabel: '行程编号',
		                name: 'jourNo'		           
		            },{
		                xtype:'textfield',
		                fieldLabel: '总评分',
		                name: 'raty'
		            },{
		                xtype:'textfield',
		                fieldLabel: '描述相符',
		                name: 'ratyDescribe'
		            },{
		                xtype:'textfield',
		                fieldLabel: '游玩体验',
		                name: 'ratyExperience'
		            },{
		                xtype:'textfield',
		                fieldLabel: '船家服务',
		                name: 'ratyService'
		            },{
		                xtype:'textarea',
		                fieldLabel: '投诉内容',
		                name: 'complaint'
		            },{
				        itemId:'cimgs',	 
				        name:'cimgs',
			        	layout: {
					        type: 'vbox',
					        align: 'stretch'
					   	},
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
							var se = this.seed++;

	        				return {
	        	            	items:[{
	    							xtype:'hiddenfield',
	    							name:'cimgs_imgUrl',
	    							value:se
	        	            	},{
	    							xtype:'image',
	    							src:(v?v.fullUrl:null),
	    							height:150,
	    							width:150,
	    							handler:function(){
	    								
	    							}
	        	            	}]
							};
						}
		            }]
		        },{xtype:'box',flex:0.3}]
    		}],
    	applyValue:function(va){
			var o,t,c,vf = this.valueFields;
			for(o in vf){
				t = vf[o];
				c = this.lookupI(t);
				if(c.applyValue){
					c.applyValue(va[t]);
				}else{
					c.setValue(va[t]);
				}
			}
		}
    	});
    	me.callParent(arguments);
    }
});