/*
 * 文件上传组件
 * */
Ext.define('Rich.component.FileUpload', {
    extend: 'Ext.panel.Panel',
    requires:[
    'Rich.Url',
    'Ext.form.field.Hidden',
    'Ext.form.Panel',
    'Ext.Img',
	'Ext.form.field.File',
	'Rich.widget.Message',
	'Ext.layout.container.Absolute'
	],
    alias:'widget.fileupload',
    
    //
    //url:Rich.Url.upLoadPath,
    name:'cover',//表单提交值用
    fieldLabel: '照片',
    labelWidth:100,
	buttonText: '选择图片',
	hideLabel:false,
	value:null,
	src:null,
    
	setValue:function(va,img){
		this.lookupI('valueField').setValue(img);
		this.lookupI('displayField').setSrc(img);
	},
    style:{'border':'1px solid #b5b8c8'},
   	getUrl:function(){
   		return this.url;
   	},
    initComponent:function(){
    	
    	var me = this;
    	Ext.apply(me,{		
        	layout:'absolute',
        	items:[{
        		itemId:'valueField',
        		xtype:'hiddenfield',
        		name:me.name,
        		value:me.value
        	},{
        		xtype:'image',
        		itemId:'displayField',
        		x:0,
		        y:0,
		        src:me.src,
		        alt:'图片',
		        anchor:'100% 100%'
        	},{
	        	x:0,
			    y:0,
			    anchor: '100% 100%',
				xtype:'form',
				bodyStyle:{
					'background':'transparent',
					'padding':'5px'
				},
				items:[{
					xtype:'filefield',
					name: 'file',
					buttonOnly:true,
					style:{
						'background':'transparent'
					},
					frame:true,
					fieldLabel: me.fieldLabel,
					labelWidth:me.labelWidth,
					hideLabel: me.hideLabel,
					buttonText: me.buttonText,
					listeners:{
						change:function(){
							//debugger
							var form = this.up('form').getForm();
							var url = this.up('fileupload').getUrl();
				            if(form.isValid()){
				                form.submit({
				                    url: url,
				                    waitMsg: '上传中...',
				                    success: function(fm,act) {
				                    	var data = act.result.data;
				                    	if(data){
				                    		fm.owner.up('fileupload').setValue(data.url,data.fullUrl);
				                    	}else{
				                    		Rich.Msg.alert('提示','返回结果有误.');
				                    	}
				                    },
				                    failure:function(fm,act){
				                    	var data = act.result.data;
				                    	if(data){
				                    		fm.owner.up('fileupload').setValue(data.url,data.fullUrl);
				                    	}else{
				                    		Rich.Msg.alert('提示','返回结果有误.');
				                    	}
				                    }
				                });
				            }
						}
					}
				}]
        	}]
    	});
    	
    	me.callParent(arguments);
    }
});