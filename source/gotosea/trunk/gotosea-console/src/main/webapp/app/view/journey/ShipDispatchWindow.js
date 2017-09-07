﻿/*
 * 
 * */
Ext.define('Rich.view.journey.ShipDispatchWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	//,'Rich.model.Ship'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.shipDispatchWindow',
   
    minWidth:300,
    minHeight:200,
    width:400,
    height:300,
    autoScroll:true,
    title:'指派船舶',
    getJourneyId:function(){
    	return this.jourId;
    },
    getValueZP:function(){
    	return this.valueZP;
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
	                xtype:'textfield',
	                id:'reasonField',
	                hidden:(me.getValueZP() == 0),
	                fieldLabel: '更改原因',
	                itemId:'reason',
	                anchor:'100%',
	                name: 'reason'
    			},{			
	                xtype:'hiddenfield',
	                allowBlank:false,
	                itemId:'shipId',
	                name: 'shipId'
    			},{
					xtype: 'triggerfield',
					anchor:'100%',
					fieldLabel: '选择船只',
					allowBlank:false,
					editable:false,
					itemId:'journeyOrder',
				    name: 'shipName',
				    onTriggerClick: function(e){
				        Ext.create('Rich.view.ship.ShipSearchWindow',{
				        	sizeTarget:'viewport',
				        	callback:function(rd){
				        		if(rd){
				        			this.setValue(rd.get('name'));
				        			this.up('form').lookupI('shipId').setValue(rd.get('id'));
				        		}
				        	},
						    scope:this
						}).show();
				    }
    			}]
    		}],
    		buttons:[{
    			text:'确定',
    			handler:function(btn){
    				var vs = this.up('window').toSubmit();
    			}
    		}]
    	});
    	me.callParent(arguments);
    },
     toSubmit:function(){
    	var fm = this.lookupI('form');
    	
    	if(!fm.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
		
		var vs = fm.getForm().getValues();
		vs.jourId = this.getJourneyId();
		Rich.JsonAjax.request({
			method:'post',
    		url:Rich.Url.journeyShipOrderPath,
    		params:vs,
    		callback:this._submitBack,
    		scope:this
		});
    },
     _submitBack:function(o,f,r){
    	if(f){
    		this.close(true);
    		this.returnValue(f);
    	}
    }
});