Ext.define('Rich.view.ship.ShipForm', {
	requires:[
		'Rich.widget.Message',
		'Rich.component.DicComboBox',
		'Ext.button.Split',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.form.FieldContainer',
        'Ext.form.field.Hidden',
        'Ext.form.field.Trigger',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.column.Action',
        'Ext.form.FieldSet',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.component.FieldSet',
        'Rich.ux.HtmlEditor',
        'Rich.component.FileUpload', 
        'Ext.form.field.Checkbox',
        'Ext.form.field.File'
    ],
   
    extend: 'Rich.widget.CrudForm',
    alias:'widget.shipform',
    autoScroll:true,
   
    urls:null,
    loadById:function(id){
		this.doRetrieve({id:id});
	},
	initComponent:function(){
		var me = this;
		
		var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {"abbr":"0", "name":"否"},
		        {"abbr":"1", "name":"是"}
		    ]
		});
		
		var store = Ext.create('Ext.data.Store',{
			autoLoad:true,
			fields: ['abbr', 'name'],
			data : [
				{"abbr":"1001", "name":"租船"}
		    ]
		});
		
		var store1 = Ext.create('Ext.data.Store',{
			fields: ['key','value'],
			proxy: {
		        type: 'ajax',	       
		       	url: Rich.Url.routeUnitPath,	
		        reader: {
		            type: 'json',
		            rootProperty:'data'
		        }
		    },
		    autoLoad:true
		});
		
		Ext.apply(me,{
			cls:'r-highlight-disabled',
        	//bodyStyle:'overflow-x:hidden;overflow-y:auto;',
        	layout: {
		        type: 'hbox',
		        align: 'stretchmax'
		    },
		    defaults: {
	            border: false,
	            xtype: 'form',
	            itemId: 'form',
	            flex: 1,
	            layout: 'anchor'
	        },
	        items: [{
	        	itemId:'leftCt',
	        	margin:'10 10 10 10',
	        	defaults:{anchor: '100%',labelWith:100},        	
	            items: [{
	            	xtype:'hiddenfield',
	            	name:'id'
	            },{
	            	xtype:'combo',
	            	name:'serviceTypeId',
	            	displayField: 'name',
	            	store:store,
	            	allowBlank:false,
    	    		editable:false,
    	    		value:1001,
	            	queryMode:'remote',
				    valueField: 'abbr',
	            	fieldLabel:'服务类型'
	            },{
	            	xtype:'combo',
	            	name:'businessUnitId',
	            	displayField: 'value',
	            	store:store1,
	            	allowBlank:false,
    	    		editable:false,
	            	queryMode:'remote',
				    valueField: 'key',
	            	fieldLabel:'业务板块类型'
	            },{
	            	xtype:'textfield',
	            	name:'name',
	            	allowBlank:false,
	            	fieldLabel:'服务名称'
	            },{
	            	xtype:'hiddenfield',
	            	itemId:'custId',
	            	name:'custId'
	            },{
			        fieldLabel:'归属商家',
			        name:'merchantName',
			        itemId:'merchantName',
    	    		xtype:'triggerfield',
    	    		allowBlank:false,
    	    		editable:false,
    	    		emptyText:'请选择归属商家',
                    onTriggerClick:function(){
                    	var win = Ext.create('Rich.view.merchant.MerchantSearchWindow').showFor(this.valueBack,this);
                    },
                    valueBack:function(rds){
                    	if(rds && rds.length > 0){
                    		var rd = rds[0];
                    		this.setValue(rd.get('merchant'));
                    		this.up('form').down('hiddenfield[name=custId]').setValue(rd.get('custId'));
                    	}
                    }
	            },{
    	            xtype : 'fieldcontainer',
    	            fieldLabel:'默认定价',
    	            layout: 'hbox',
    	            items: [{
		            	xtype:'textfield',
		            	name:'marketPrice',
		            	flex:1,
		            	allowBlank:false,
		            	labelWidth:50,
		            	fieldLabel:'市场价'
		            },{
		            	padding:'0 0 0 10',
		            	xtype:'textfield',
		            	name:'preferPrice',
		            	labelWidth:50,
		            	flex:1,
		            	allowBlank:false,
		            	fieldLabel:'优惠价'
		            },{
		            	padding:'0 0 0 10',
		            	xtype:'textfield',
		            	name:'costPrice',
		            	labelWidth:50,
		            	flex:1,
		            	allowBlank:false,
		            	fieldLabel:'成本价'
		            }]
            	},{
            		xtype:'textfield',
            		fieldLabel:'显示价格',
            		allowBlank:false,
            		name:'price'
            	},{
            		xtype:'textfield',
            		name:'priceUnit',
            		allowBlank:false,
            		fieldLabel:'定价单位'
            	},{
    	            xtype      : 'fieldcontainer',
    	            layout: 'hbox',
    	            items: [{
		            	xtype:'textfield',
		            	name:'minPersons',
		            	fieldLabel:'人数下限',
		            	flex:1,
		            	allowBlank:false
		            },{
		            	padding:'0 0 0 10',
		            	xtype:'textfield',
		            	name:'maxPersons',
		            	fieldLabel:'人数上限',
		            	labelWidth:60,
		            	allowBlank:false,
		            	flex:1
		            }]
            	},{
            		xtype:'textfield',
            		fieldLabel:'提前预定天数',
            		name:'advanceDays'
            	},{
			    	fieldLabel: '是否需要购买保险',
					xtype:'combo',
			        name: 'insurance',
			        editable:false,
			        allowBlank:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
			    	fieldLabel: '是否支持优惠券',
					xtype:'combo',
			        name: 'coupon',
			        editable:false,
			        allowBlank:false,
				    store: states,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
			    	fieldLabel: '标签',
					xtype:'combo',
			        name: 'aa',
			        editable:false,
			        allowBlank:false,
				    store: states,
				    value:1,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'abbr'
			     },{
    	            xtype      : 'fieldcontainer',
    	            fieldLabel:'封面图',
    	            labelWith:100,
    	            layout: 'hbox',
    	            items: [{
				     	xtype:'fileupload',
				     	maxWidth:300,
				     	labelWidth:60,
				     	fieldLabel:'封面图',
				     	height:200,
				     	itemId:'picture',
				     	name:'picture'
				     }]
            	},{
    	            xtype      : 'fieldcontainer',
    	            margin:'5 0',
    	            fieldLabel:'相册',
    	            layout: 'hbox',
    	            items: [{
				     	xtype:'fileupload',
				     	flex:1,
				     	labelWidth:60,
				     	fieldLabel:'图片',
				     	height:200,
				     	itemId:'carouselPic1',
				     	name:'carouselPic'
				     },{
				     	margin:'0 5',
				     	xtype:'fileupload',
				     	flex:1,
				     	labelWidth:60,
				     	fieldLabel:'图片',
				     	height:200,
				     	itemId:'carouselPic2',
				     	name:'carouselPic'
				     }]
            	},{
    	            xtype      : 'fieldcontainer',
    	            fieldLabel:'相册',
    	            margin:'5 0',
    	            layout: 'hbox',
    	            items: [{
				     	xtype:'fileupload',
				     	flex:1,
				     	labelWidth:60,
				     	fieldLabel:'图片',
				     	height:200,
				     	itemId:'carouselPic3',
				     	name:'carouselPic'
				     },{
				     	margin:'0 5',
				     	xtype:'fileupload',
				     	flex:1,
				     	labelWidth:60,
				     	fieldLabel:'图片',
				     	height:200,
				     	itemId:'carouselPic4',
				     	name:'carouselPic'
				     }]
            	}]
    	   },{
    	   		itemId:'rightCt',
    	   		margin:'10 30 10 10',
	        	defaults:{anchor: '100%'},
	            items: [{
    	            xtype      : 'fieldcontainer',
    	            layout: 'hbox',
    	            items: [{
	    	            xtype:'htmleditor',
		            	fieldLabel:'亮点介绍',
		            	name:'itemContent1',
		            	itemId:'itemContent1',
		            	allowBlank:false,
		            	height:200
	            	},{
	            		xtype:'hiddenfield',
	            		name:'seq1',
	            		value:1
	            	},{
		            	xtype:'hiddenfield',
		            	name:'itemName1',
		            	value:'亮点介绍'
	            	}]
            	},{
    	            xtype      : 'fieldcontainer',
    	            layout: 'hbox',
    	            items: [{
	    	            xtype:'htmleditor',
		            	fieldLabel:'行程安排',
		            	allowBlank:false,
		            	name:'itemContent2',
		            	itemId:'itemContent2',
		            	height:200
	            	},{
	            		xtype:'hiddenfield',
	            		name:'seq2',
	            		value:2
	            	},{
		            	xtype:'hiddenfield',
		            	name:'itemName2',
		            	value:'行程安排'
	            	}]
            	},{
    	            xtype      : 'fieldcontainer',
    	            layout: 'hbox',
    	            items: [{
	    	            xtype:'htmleditor',
		            	fieldLabel:'费用说明',
		            	allowBlank:false,
		            	name:'itemContent3',
		            	itemId:'itemContent3',
		            	height:200
	            	},{
	            		xtype:'hiddenfield',
	            		name:'seq3',
	            		value:3
	            	},{
		            	xtype:'hiddenfield',
		            	name:'itemName3',
		            	value:'费用说明'
	            	}]
            	},{
    	            xtype      : 'fieldcontainer',
    	            layout: 'hbox',
    	            items: [{
	    	            xtype:'htmleditor',
		            	fieldLabel:'出行须知',
		            	allowBlank:false,
		            	name:'itemContent4',
		            	itemId:'itemContent4',
		            	height:200
	            	},{
	            		xtype:'hiddenfield',
	            		name:'seq4',
	            		value:4
	            	},{
		            	xtype:'hiddenfield',
		            	name:'itemName4',
		            	value:'出行须知'
	            	}]
            	}]
	      }]
		});
		me.callParent(arguments);
	},
	valueFields:['carouselPic1','carouselPic2','carouselPic3','carouselPic4'],
	applyValue:function(va){
		this.down('form').getForm().setValues(va);
		this.lookupI('picture').setValue('',va.picture);
		this.lookupI('merchantName').setValue(va.custId.merchant);
		this.lookupI('custId').setValue(va.custId.custId);
		var a = 'carouselPic';
		for(var j = 0;j<va.carouselPics.length;j++){
			this.lookupI(a+(j+1)).setValue('',va.carouselPics[j]);
		};
		for(var i = 0;i<va.infos.length;i++){
			switch(va.infos[i].seq){
				case 1:
					this.lookupI('itemContent1').setValue(va.infos[i].itemContent);
					break;
				case 2:
					this.lookupI('itemContent2').setValue(va.infos[i].itemContent);
					break;
				case 3:
					this.lookupI('itemContent3').setValue(va.infos[i].itemContent);
					break;
				case 4:
					this.lookupI('itemContent4').setValue(va.infos[i].itemContent);
					break;
			}
		}
	},
    getFormValues:function(s){
    	if(!this.isValid())
		{
			Rich.Msg.error('错误','有不合法的输入.');
			return null;
		}
    	var vas = this.getValues();
    	var carouselP = '';
    	for(var i =0;i<vas.carouselPic.length;i++){
    		if(vas.carouselPic[i]){
    			if(i == 0){
    				carouselP = vas.carouselPic[i];
    			}else{
    				carouselP += ','+vas.carouselPic[i];
    			}
    		}
    	}
    	vas.carouselPics  = carouselP;
    	vas.areaId = vas.area;
    	var infos = [{seq:vas.seq1,itemName:vas.itemName1,itemContent:vas.itemContent1},
    				 {seq:vas.seq2,itemName:vas.itemName2,itemContent:vas.itemContent2},
    				 {seq:vas.seq3,itemName:vas.itemName3,itemContent:vas.itemContent3},
    				 {seq:vas.seq4,itemName:vas.itemName4,itemContent:vas.itemContent4}];
    	vas.infos = infos;
    	return Ext.encode(vas);
    },
    uUrl:Rich.Url.routeUpdatePath,
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.shipListPath;
    	}else if(sta == 'r'){
    		return Rich.Url.shipDetailPath+this.tid;
    	}else if(sta == 'u'){
    		return Rich.Url.shipUpdatePathL;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    
    toStatus:function(st){
    	this.callParent(arguments);
    	this.lookupI('leftCt').setDisabled(st=='r');
		this.lookupI('rightCt').setDisabled(st=='r');
    },
    callback:function(o,f,r,s){
    	if(s == 'u'){
    		Rich.Msg.alert('提示','修改成功');
    		this.loadById(o.params.id);
    	}else if(s=='r'){
    		this.applyValue(r.responseJson.data);
			this.toStatus(s);
    	}else if(s=='c'){
    	}
    }
});
