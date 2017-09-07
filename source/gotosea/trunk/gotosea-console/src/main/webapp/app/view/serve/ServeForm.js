 /**
 * 资源的form
 */
Ext.define('Rich.view.serve.ServeForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Rich.component.FileUpload'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.serveform',
    minWidth:300,
    minHeight:200,
    autoScroll:true,
    
    id:null,
    loadById:function(id){
    	this.id = id;
		this.doRetrieve({id:id});
	},
    initComponent:function(){
    	var me = this;
    	
		var store = Ext.create('Ext.data.Store', {
			autoLoad:true,
			proxy:{
				type:'ajax',
				url:Rich.Url.locatLabelPath,
				reader:{
					type:'json',
					rootProperty:'data'
				},
				fields : ['id','name'] 
			}
		});
		var store1 = Ext.create('Ext.data.Store', {
			autoLoad:true,
			proxy:{
				type:'ajax',
				url:Rich.Url.prodLabelPath,
				reader:{
					type:'json',
					rootProperty:'data'
				},
				fields : ['key','value'] 
			}
		});
	    Ext.apply(me,{
	    	cls:'r-highlight-disabled',
	    	bodyStyle:'overflow-x:hidden;overflow-y:auto;',
	        fieldDefaults: {
	            labelAlign: 'left',		           
	            msgTarget: 'side'
	        },
	        layout:{
	        	type:'vbox',
	        	align: 'stretch'
	        },
	        defaults:{anchor:'100%',margin:'5 10 5 10'},
	        items: [{
            	xtype:'hiddenfield',
            	name:'id'
            },{
            	xtype:'textfield',
            	fieldLabel: '资源名称',
            	allowBlank:false,
            	itemId:'name',
            	name:'name'
            },{
				xtype: 'triggerfield',
				fieldLabel: '选择商家',
				editable:false,
				allowBlank:false,
			    name: 'custName',
			    itemId:'custName',
			    onTriggerClick: function(e){
			    	var idd = this.up('serveform').id;
			        Ext.create('Rich.view.serve.CustSearchWindow').showFor(function(record){
			        	this.setValue(record.data.name);
			        	this.up('form').down('hiddenfield[name=custId]').setValue(record.id);
			        },this);
			    }
			},{
            	xtype:'hiddenfield',
            	name:'custId'
            },{
		    	fieldLabel : '选择类型',
				xtype:'combobox',
		        name: 'merchantResourceTypeId',
		        itemId:'merchantResourceTypeId',
		        store: store1,
		        allowBlank:false,
			    displayField: 'value',
			    valueField: 'key',
		        editable:false
		    },{
		    	fieldLabel : '选择地点',
				xtype:'combobox',
		        name: 'locatorId',
		        itemId:'locatorId',
		        store: store,
			    valueField: 'id',
			    displayField: 'name',
			    allowBlank:false,
		        editable:false
		    },{
                xtype:'textareafield',
                fieldLabel: '资源简介',
                height:150,
                allowBlank:false,
                itemId:'introduction',
                name: 'introduction'
            },{
	            xtype      : 'fieldcontainer',
	            fieldLabel : '图示',
	            layout: 'hbox',
	            items: [{
	            	margin:'5 5 5 0',
	                xtype:'fileupload',
	                fieldLabel: '资源图片',
	                itemId:'pic0',
	                height:300,
	                url:Rich.Url.upLoadProdPath,
	                flex:1,
	                name: 'pic0'
	            },{
	            	margin:'5 5 5 0',
	                xtype:'fileupload',
	                fieldLabel: '资源图片',
	                itemId:'pic1',
	                height:300,
	                url:Rich.Url.upLoadProdPath,
	                flex:1,
	                name: 'pic1'
	            },{
	            	margin:'5 5 5 0',
	                xtype:'fileupload',
	                fieldLabel: '资源图片',
	                itemId:'pic2',
	                height:300,
	                url:Rich.Url.upLoadProdPath,
	                flex:1,
	                name: 'pic2'
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
		};
    	var vas = this.getValues();
    	vas.pictures = vas.pic0+','+vas.pic1+','+vas.pic2;
    	return Ext.encode(vas);
    },
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.prodAddPath;
    	}else if(sta == 'r'){
    		return Rich.Url.essayAllPath+'/'+this.uid;
    	}else if(sta == 'u'){
    		return Rich.Url.essayAllPath;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    toStatus:function(st){
    	this.callParent(arguments);
    	this.setItemDisabled(['name','custName','merchantResourceTypeId','locatorId','introduction','pic0','pic1','pic2'],st=='r')
    },
     setItemDisabled:function(items,dis){
    	for(var i = 0;i< items.length;i++){
    		this.lookupI(items[i]).setDisabled(dis);
    	}
    },
    applyValue:function(va){
		this.getForm().setValues(va);
		for(var i = 0;i<va.pictureArr.length;i++){
    		var src = '';
    		this.lookupI('pic'+i).setValue(src,va.pictureArr[i]);
    	};
	},
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		var aa = this.userId?this.userId:o.params.id;
	    		this.loadById(aa);
	    	}else if(s=='r'){
	    		this.applyValue(r);
	    		this.toStatus(s);
	    	}else if(s=='c'){
	    	}
    	}
    }
});