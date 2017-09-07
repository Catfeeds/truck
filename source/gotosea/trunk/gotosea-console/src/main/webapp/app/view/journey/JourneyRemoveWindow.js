﻿/*
 * 
 * */
Ext.define('Rich.view.journey.JourneyRemoveWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.journeyremovewindow',
   
    minWidth:300,
    minHeight:200,
    width:400,
    height:300,
    autoScroll:true,
    title:'移除参与人',
    
    jourId:null,
    statusId:null,
    userId:null,
    userType:null,
    getJourneyId:function(){
    	return this.jourId;
    },
    getStatusId:function(){
    	return this.statusId;
    },
   	getUserId:function(){
   		return this.userId;
   	},
   	getUserType:function(){
   		return this.userType;
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
	                xtype:'textarea',
	                fieldLabel: '移除原因',
	                itemId:'reason',
	                anchor:'100%',
	               	labelWidth:60,
	                allowBlank:false,
	                name: 'reason'
    			},{					
	                xtype:'numberfield',
	                fieldLabel: '退款金额',
	                itemId:'drawBack',
	                anchor:'100%',
	                minValue:0,
	                labelWidth:60,
	                decimalPrecision:2,
	                allowBlank:false,
	                name: 'drawBack'
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
		vs.userType = this.getUserType();
		vs.userId = this.getUserId();
		Rich.JsonAjax.request({
			method:'post',
    		url:Rich.Url.journeyTuserDelPath,
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