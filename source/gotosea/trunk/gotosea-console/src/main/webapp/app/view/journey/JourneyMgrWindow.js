﻿/*
 * 钓点管理窗体
 * */
Ext.define('Rich.view.journey.JourneyMgrWindow',{
	requires:[
	'Ext.form.field.ComboBox',
	'Rich.view.journey.JourneyDetail',
	'Rich.view.journey.JourneyUser',
	'Rich.view.journey.JourneyWeather',
	'Rich.view.journey.JourneyEvaluate',
	'Rich.view.journey.JourneyPieceDetail',
	'Rich.view.journey.JourneyShip', 
	'Rich.view.journey.JourneyOrder', 
	'Rich.view.Log'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.journeymgrwindow',
    uses:['Rich.view.wharf.WharfForm'],
    minWidth:300,
    minHeight:200,
    width:0.8,
    height:0.8,
    autoScroll:true,
    title:'行程详情',
    
    fId:null,
    fromType:null,
    state:null,
    showById:function(fId,state){
    	this.fId = fId;
    	this.state = state;
    	this.show();
    },
    initComponent:function(){
    	var me = this;
    	var ft = me.fromType;
    	var detail = Rich.RightManager.hasRight(Rich.V.journey_detail);//详情权限
    	var ship = Rich.RightManager.hasRight(Rich.V.journey_ship);//船舶权限
    	var order = Rich.RightManager.hasRight(Rich.V.order_query_user);//订单权限
    	var weather = Rich.RightManager.hasRight(Rich.V.journey_weather);//天气权限
    	var user = Rich.RightManager.hasRight(Rich.V.journey_users);//人员权限
    	var evaluate = Rich.RightManager.hasRight(Rich.V.evaluate_user);//评价权限
    	var itms =  [];
    	if(ft == 1 || ft == 2){//渔家乐+游艇
    		if(detail){
	    		itms.push({
					title:'行程信息', //包船行程的行程信息
					xtype:'journeydetail',
					itemId:'journeydetail',
					showFn:function(){
						var sId = this.up('window').fId;
						var type = this.up('window').fromType;
						var state = this.up('window').state;
						this.showById(sId,type,state);
					}
				})
    		}
    		
    		if(ship){
    			itms.push({
					title:'船舶信息',//行程的船舶信息
					xtype:'journeyship',
					itemId:'journeyship',
					showFn:function(){
						var sId = this.up('window').fId;
						this.showById(sId);
					}
    			})
    		}
    		
    	}else if(ft == 3 || ft == 4){//海钓+海岛游
    		if(detail){
	    		itms.push({
					title:'行程信息', //拼船行程的行程信息
					xtype:'journeypiecedetail',
					itemId:'journeypiecedetail',
					showFn:function(){
						var sId = this.up('window').fId;
						var type = this.up('window').fromType;
						var state = this.up('window').state;
						this.showById(sId,type,state);
					}
				})
    		}
    		
			if(order){
				itms.push({
					title:'订单信息',//行程的海钓行程的订单
					xtype:'journeyorder',
					itemId:'journeyorder',
					showFn:function(){
						var sId = this.up('window').fId;
						this.loadById(sId);
					}
				})
	    	}
    	}
    	
    	if(user){
    		itms.push({
				title:'人员信息',//行程人员信息
				xtype:'journeyuser',
				itemId:'journeyuser',
				showFn:function(){
					var sId = this.up('window').fId;
					var ft = this.up('window').fromType;
					var state = this.up('window').state;
					this.loadById(sId,ft,state);
				}
    		})
    	}
    	
    	if(weather){
    		itms.push({
				title:'天气信息',//行程的天气信息
				xtype:'journeyweather',
				itemId:'journeyweather',
				showFn:function(){
					var sId = this.up('window').fId;
					this.loadById(sId);
				}
			})
    	}
    	
    	if(evaluate){
    		itms.push({
				title:'评价信息',//行程的评价信息
				xtype:'journeyevaluate',
				itemId:'journeyevaluate',
				showFn:function(){
					var sId = this.up('window').fId;
					this.loadById(sId);
				}
    		})
    	}
    	
    	itms.push({
	    	xtype:'log',
	    	paramType:4,
	    	showFn:function(){
	    		this.loadByParam(this.up('window').fId);
	    	}
	    })
    	
    	Ext.apply(me,{
    		layout:'fit',
    		items:[{
    			xtype:'tabpanel',
    			items:itms
    		}]
    	});
    	me.callParent(arguments);
    }
});