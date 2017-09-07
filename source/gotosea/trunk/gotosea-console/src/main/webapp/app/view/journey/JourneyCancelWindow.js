﻿/*
 * 包船取消行程及退款的窗口
 * */
Ext.define('Rich.view.journey.JourneyCancelWindow',{
	requires:['Ext.form.Panel'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.journeycancelwindow',
   
    minWidth:300,
    minHeight:200,
    width:400,
    height:300,
    autoScroll:true,
    title:'取消行程',
    
    getJourneyId:function(){
    	return this.jourId;
    },
    getuserId:function(){
    	return this.userId;
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
	                xtype:'hiddenfield',
	                value:0,
	                name: 'drawBacks[0].statusId'
    			},{					
	                xtype:'textarea',
	                fieldLabel: '取消原因',
	                itemId:'reason',
	                anchor:'100%',
	                allowBlank:false,
	                name: 'reason'
    			},{					
	                xtype:'numberfield',
	                fieldLabel: '退款金额',
	                itemId:'drawBack',
	                anchor:'100%',
	                minValue:0,
	                decimalPrecision:2,
	                allowBlank:false,
	                name: 'drawBacks[0].drawBack'
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
    	if(!fm.isValid()){
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
		var vs = fm.getForm().getValues();
		vs.jourId = this.getJourneyId();
		Rich.JsonAjax.request({
			method:'post',
    		url:Rich.Url.journeycancelPath+'?drawBacks[0].userId='+this.getuserId(),
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