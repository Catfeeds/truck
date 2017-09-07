 /**
 * 文章的form
 */
Ext.define('Rich.view.essay.EssayForm',{
	requires:[
	'Ext.form.field.ComboBox',
	'Ext.form.FieldContainer',
	'Ext.form.CheckboxGroup',
	'Ext.form.field.Hidden',
	'Ext.form.field.Number',
	'Ext.form.field.Text',
	'Rich.component.DicComboBox',
	'Ext.form.field.HtmlEditor',
	'Rich.component.FileUpload'
	],
    extend: 'Rich.widget.CrudForm',
    alias:'widget.essayform',
    minWidth:300,
    minHeight:200,
    
    loadById:function(id){
    	this.uid = id;
		this.doRetrieve({id:id});
	},
    initComponent:function(){
    	var me = this;
    	
		var states = Ext.create('Ext.data.Store', {
		    fields: ['abbr', 'name'],
		    data : [
		        {'abbr':"0", 'name':"公共"},
		        {'abbr':"1", 'name':"海钓"},
		        {'abbr':"2", 'name':"海岛游"}
		    ]
		});
		
    	 
	    Ext.apply(me,{
	    	cls:'r-highlight-disabled',
	    	//cls:'essayform-innerCt',
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
	        	layout:'hbox',
	        	items:[{
	        		layout:'form',
	        		flex:1,
	        		items:[{
		            	xtype:'hiddenfield',
		            	name:'id'
		            },{
		                xtype:'textfield',
		                fieldLabel: '标题',
		                itemId:'title',
		                name: 'title'
		            },{
		                xtype:'textareafield',
		                fieldLabel: '概要',
		                itemId:'summary',
		                name: 'summary'
		            },{
					    xtype:'combobox',
				    	fieldLabel:'业务类型',
				    	store: states,
				    	editable:false,
					    queryMode: 'local',
					    displayField: 'name',
					    valueField: 'abbr',
					    itemId:'businessUnitId',
				    	name:'businessUnitId'
				    }]
	        	},{
			    	xtype:'fileupload',
					margin:'0 0 0 10',
					itemId:'thumbnail',
					name:'thumbnail',
					width:200,
					height:200,
					labelHidden:true,
					fieldLabel: '缩略图',
					labelWidth:60,
					url:Rich.Url.upLoadArticlePath,
					buttonText: '上传图片'
				}]
	        },{
                xtype:'htmleditor',
                fieldLabel: '正文',
                flex:1,
                labelWidth:70,
                itemId:'htmlFile',
                name: 'htmlFile',
                url:Rich.Url.upLoadArticlePath,
                createLinkText:'创建超链接',//创建连接的提示信息  
	            defaultLinkValue:'http://www.',//链接的默认形式  
	            fontFamilies:['宋体','隶书','黑体']//字体列表 
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
    	return Ext.encode(vas);
    },
    getUrl:function(sta){
    	if(sta == 'c'){
    		return Rich.Url.essayAllPath;
    	}else if(sta == 'r'){
    		return Rich.Url.essayAllPath+'/'+this.tid;
    	}else if(sta == 'u'){
    		return Rich.Url.essayAllPath;
    	}else if(sta == 'd'){
    		return this.dUrl;
    	}
    },
    toStatus:function(st){
    	this.callParent(arguments);
    	this.setItemDisabled(['title','summary','businessUnitId','thumbnail','htmlFile'],st=='r')
    },
    setItemDisabled:function(items,dis){
    	for(var i = 0;i< items.length;i++){
    		this.lookupI(items[i]).setDisabled(dis);
    	}
    },
    applyValue:function(va){
		this.getForm().setValues(va);
		this.lookupI('thumbnail').setValue(this.src,va.thumbnail);
	},
    callback:function(o,f,r,s){
    	if(f){
	    	if(s == 'u'){
	    		var aa = this.userId?this.userId:o.params.id;
	    		Rich.Msg.alert('提示','修改成功')
	    		this.loadById(aa);
	    	}else if(s=='r'){
	    		if(r.responseJson.data){
	    			this.applyValue(r.responseJson.data);
	    			this.toStatus(s);
	    		}else{
	    			this.toStatus('c');
	    		}
	    	}else if(s=='c'){
	    	}
    	}
    }
});