
Ext.define('Rich.view.page.RecommendForm',{
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
    alias:'widget.recommendform',
    minWidth:300,
    minHeight:200,
    tid:null,
    
    loadById:function(id,it){
    	this.userId = id;
    	this.tid = it;
		this.doRetrieve({id:id});
	},
    initComponent:function(){
    	var me = this;
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
	            	xtype:'hiddenfield',
	            	name:'isUsed'
	            },{
	            	xtype:'hiddenfield',
	            	name:'id'
	            },{
	            	xtype:'hiddenfield',
	            	name:'itemType'
	            },{
					xtype: 'triggerfield',
					fieldLabel:this.tid== 1 ? '选择线路':'选择船舶',
					editable:false,
					itemId:'name',
				    name: 'name',
				    onTriggerClick: function(e){
				    	var ft = this.up('recommendform').tid;
				    	if(ft == 1){
				    		Ext.create('Rich.view.route.RouteSearchWindow',{
				        	fromType:0,
				        	sizeTarget:'viewport',
				        	callback:function(rd){
				        		if(rd){
				        			this.setValue(rd.get('name'));
				        			this.up('form').lookupI('itemId').setValue(rd.get('id'));
				        		}
				        	},
						    scope:this
						}).show();
				    	}else{
				    		Ext.create('Rich.view.ship.ShipSearchWindow',{
				        	sizeTarget:'viewport',
				        	callback:function(rd){
				        		if(rd){
				        			this.setValue(rd.get('name'));
				        			this.up('form').lookupI('itemId').setValue(rd.get('id'));
				        		}
				        	},
						    scope:this
						}).show();
				    	}
				       
				    }
				},{
	                xtype:'textfield',
	                fieldLabel: '排序编号位置',
	                itemId:'sort',
	                name: 'sort'
	            },{
	            	xtype:'hiddenfield',
	            	itemId:'itemId',
	            	name:'itemId'
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
    	if(!vas.itemType){
    		vas.itemType = this.tid;
    	}
    	return vas;
    },
    cUrl:Rich.Url.recommendAddPath,
    rUrl:Rich.Url.recommendDetPath,
    uUrl:Rich.Url.recommendUpdPath,
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
    },
    applyValue:function(va){
		this.getForm().setValues(va);
	},
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		this.loadById(this.userId);
	    	}else if(s=='r'){
	    		if(r.responseJson.data){
	    			this.applyValue(r.responseJson.data);
	    			var tp = r.responseJson.data.itemType;
	    			this.lookupI('name').setFieldLabel(tp == 1 ? '选择线路':'选择船舶');
	    			this.toStatus(s);
	    		}else{
	    			this.toStatus('c');
	    		}
	    	}else if(s=='c'){
	    	}
    	}
    }
});