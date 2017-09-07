/**
 * 拼船行程信息
 */
Ext.define('Rich.view.journey.JourneyPieceDetail', {
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
		'Rich.view.route.RouteDetailWindow',
		'Rich.view.journey.JourneyFishSeaWindow',
		'Ext.form.FieldSet',
        'Ext.layout.component.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Paging',
        'Rich.component.DicComboBox'
    ],
    extend: 'Ext.panel.Panel',
    alias:'widget.journeypiecedetail',
    
    idd:null,
    fromType:null,
    showById:function(id,fromType){
    	this.idd = id;
    	this.fromType = fromType;
		this.show();
		Rich.JsonAjax.request({
			url:Rich.Url.journeyDetailPath,
			method:'get',
			params:{
				id:this.idd,
				fromType:this.fromType
			},
			callback:function(o,f,r){
				this.lookupI('form').getForm().setValues(r.responseJson.data);
				var state = r.responseJson.data.state;
				if(state == 3 || state == 4 || state == 5){
					this.lookupI('cancel',true).setVisible(false);
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
		        items: [{xtype:'box',flex:0.1},{
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
			                xtype:'hiddenfield',
			                itemId:'userId',
			                name: 'userId'
			            },{
			                xtype:'textfield',
			                fieldLabel: '行程编号',
			                name: 'number'
			            }, {
			                xtype:'textfield',
			                fieldLabel: '路线管理员',
			                name: 'creator'
			            },{
					    	xtype:'diccombo',
					        fieldLabel: '线路类型',
					        name: 'routeType',
					        editable:false,
					        typeName:'route_type'
					    },{
			                xtype:'textfield',
			                fieldLabel: '线路编号',
			                disabled:true,
			                itemId:'routeNo',
			                name: 'routeNo'
			            }]
		        },{xtype:'box',flex:0.1},{
		        	defaults:{disabled:true,anchor: '100%'},
		            items: [{
			                xtype:'textfield',
			                fieldLabel: '行程名称',
			                disabled:true,
			                name: 'name'
			            },{
			                xtype:'textfield',
			                fieldLabel: '创建日期',
			                disabled:true,
			                name: 'createTime'
			            },{
			                xtype:'textfield',
			                fieldLabel: '船家账号',
			                disabled:true,
			                itemId:'ownerUserNa',
			                name: 'ownerUserNa'
			            },{
			                xtype:'hiddenfield',
			                itemId:'orderId',
			                name: 'orderId'
			            },{
	        	            xtype      : 'fieldcontainer',
	        	            fieldLabel : '行程日期',
	        	            defaults: {
	        	                hideLabel: true
	        	            },
	        	            layout: 'hbox',
	        	            items: [{
	    							xtype: 'textfield',
	    							flex:1,
	    							itemId:'departureTime',
	    						    name: 'departureTime',
									editable:false,
									disabled:true
	    						},{xtype:'label',text:'-',style:{'line-height': '25px;'}},{
	    							xtype: 'textfield',
	    							flex:1,
	    							itemId:'endTime',
	    						    name: 'endTime',
	    						    disabled:true
	    						}]
	        	        },{
			                xtype:'hiddenfield',
			                itemId:'routeId',
			                fieldLabel: '线路id',
			                name: 'routeId'
			            },{
			                xtype:'hiddenfield',
			                itemId:'id',
			                fieldLabel: '行程id',
			                disabled:true,
			                name: 'id'
			            }]
		        },{xtype:'box',flex:0.1}],
		        buttons:['->',{
		    	    	text:'取消行程',
		    	    	itemId:'cancel',
		    	    	handler:function(btn){
		    	    		btn.up('form').cancel();
		    	    	}
		    	    }],
	    	        cancel:function(){
	    	        	var ids = this.up('journeypiecedetail').idd;
	        			Ext.create('Rich.view.journey.JourneyFishSeaWindow').showById(ids);
	    	        }
    		}]
    	    	
    	});
		this.callParent(arguments);
	}
});
