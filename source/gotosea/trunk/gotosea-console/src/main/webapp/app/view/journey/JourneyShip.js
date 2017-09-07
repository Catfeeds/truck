﻿/**
 * 行程的船舶信息
 */
Ext.define('Rich.view.journey.JourneyShip', {
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
		'Rich.view.journey.JourneyCancelWindow',
		'Rich.view.ship.ShipInfoWindow',
		'Rich.view.journey.ShipDispatchWindow',
		'Rich.view.route.RouteDetailWindow',
        'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox'
    ],
   
    extend: 'Ext.panel.Panel',
    alias:'widget.journeyship',
    
    idd:null,
    showById:function(id){
    	this.idd = id;
		this.show();
		Rich.JsonAjax.request({
    		url:Rich.Url.journeyChuanBoPath,
    		method:'get',
    		params:{
        		id:this.idd
        	},
    		callback:this.searchBack,
    		scope:this
		});
    },
     searchBack:function(o,f,r){
    	this.el.unmask();
    	if(f){
    		if(r.responseJson.data){
				var fm = this.lookupI('form');
				fm.getForm().setValues(r.responseJson.data.shipInfo);
				var btnZP = fm.lookupI('btnZP');
				var zpV = r.responseJson.data.canZP;
				btnZP.valueZP = zpV;
				if(zpV == 0){
					btnZP.setDisabled(false);
					btnZP.setText('指派船只');
					btnZP.setVisible(true);
				}else if(zpV == 1){
					btnZP.setDisabled(false);
					btnZP.setText('修改船只');
					btnZP.setVisible(true);
				}else if(zpV == 2){
					btnZP.setVisible(false);
				}   				
    		}
    	}
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
		        	bodyStyle: 'padding:20px 0',
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '接单方式',
		                name: 'modelDesc'
		            },{
		                xtype:'textfield',
		                fieldLabel: '接单时间',
		                name: 'orderTime'
		            },{
		                xtype:'hiddenfield',
		                fieldLabel: '船只id',
		                itemId:'shipId',
		                name: 'shipId'
		            }]
		        },{xtype:'box',flex:0.3},{
		        	bodyStyle: 'padding:20px 0',
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '船舶订单',
		                disabled:true,
		                name: 'orderNo'				                
		            },{
	    	            xtype      : 'fieldcontainer',
	    	            fieldLabel : '接单船只',	        	            
	    	            layout: 'hbox',
	    	            disabled:false,
	    	            items: [{
								xtype: 'triggerfield',
								flex:1,
								editable:false,
								itemId:'shipNo',
								disabled:false,
							    name: 'shipName',
							    disabled:!Rich.RightManager.hasRight(Rich.V.ship_detail),
							    onTriggerClick: function(e){
							    	var os = this.up('form').lookupI('shipId').getValue();
							        Ext.create('Rich.view.ship.ShipInfoWindow').showByShipId(os);
							    }
							}]
	    	        	}]
		        },{
			        xtype:'panel',
			        flex:0.3,
			    	items:[{
			        	xtype:'button',
			        	hidden:true,
			        	rightId:Rich.V.journey_alter_ship,
			        	itemId:'btnZP',
			        	text:'指派船只',
			        	anchor: '80%',
			        	x:20,
			        	y:5,
			        	removeBack:function(f){
		    	        	if(f){
		    	        		var jId = this.up('journeyship').idd;
		    	        		this.up('journeyship').showById(jId);
		    	        	}
		    	        },
			        	handler:function(btn){
			        		var vZP = btn.valueZP;
			        		var jId = this.up('journeyship').idd;
			        		var titl = vZP == 1?'修改船只':'指派船只';
			        		Ext.create('Rich.view.journey.ShipDispatchWindow',{
			        			valueZP:vZP,
			        			jourId:jId
							}).showFor(this.removeBack,this);
			        	}
			        }]
		        }]
    		}]
    	    	
    	});
		this.callParent(arguments);
	}
});
