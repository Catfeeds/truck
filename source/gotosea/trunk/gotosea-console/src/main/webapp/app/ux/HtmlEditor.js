Ext.define('Rich.ux.HtmlEditor',{
	requires:['Ext.form.field.HtmlEditor','Ext.form.Panel','Ext.form.field.File'],
	override:'Ext.form.field.HtmlEditor',
    initComponents: function(){
        var me = this;

        me.items = [me.createToolbar(),{

			xtype:'form',
			width:45,
			height:30,
			bodyStyle:{
				'background':'transparent'
			},
			//layout:'fit',
			items:[{
				xtype:'filefield',
				name: 'file',
				buttonOnly:true,
				style:{
					'background':'transparent'
				},
				//frame:true,
				fieldLabel:"",
				labelWidth:0,
				hideLabel:true,
				buttonText:"img",
				listeners:{
					change:function(){
						
						var hd = this.up("htmleditor");
						hd.insertAtCursor("<img src='www.baidu.com'/>");
						
						return;
						
						var form = this.up('form').getForm();
			            if(form.isValid()){
			                form.submit({
			                    url: Rich.Url.fileUploadPath,
			                    waitMsg: '上传中...',
			                    success: function(fm,act) {
			                    	var data = act.result.data;
			                    	if(Ext.isArray(data) && data.length > 0){
			                    		var po = data[0];
			                    		fm.owner.up('fileupload').setValue(po.url,po.fullUrl);
			                    		//var ct = fm.owner.getOwnerCt();
			                    		//ct.lookupI('cover').setValue(po.url);
			                    		//ct.lookupI('fullCover').applyValue(po.fullUrl);
			                    	}else{
			                    		Rich.Msg.alert('提示','返回结果有误.');
			                    	}
			                    },
			                    failure:function(fm,act){
			                    	Rich.Msg.alert('提示','上传失败.');
			                    }
			                });
			            }
					}
				}
			}]
    	
        },me.createInputCmp()];

        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };

        // No value set, we must report empty string
        if (me.value == null) {
            me.value = '';
        }

        //me.callParent(arguments);
        Ext.form.FieldContainer.prototype.initComponent.apply(me,arguments);
        me.initField();
    },
    
    getUrl:function(){
    	return this.url;
    },
    getToolbarCfg:function(){
    	var cfg = this.callParent(arguments);
    	cfg.listeners = null;
    	return cfg;
    },
    createToolbar: function(){
		var me = this;
		var cof = me.getToolbarCfg();
		me.toolbar = Ext.widget(cof);
		//me.callParent(arguments);
		me.toolbar.insert(0,{
			xtype:'form',
			dock:'left',
			width:47,
			height:32,
			bodyStyle:{
				'background':'transparent'
			},
			layout:'fit',
			items:[{
				xtype:'filefield',
				name: 'file',
				buttonOnly:true,
				style:{
					'background':'transparent'
				},
				//frame:true,
				fieldLabel:"",
				labelWidth:0,
				hideLabel:true,
				buttonText:"img",
				listeners:{
					change:function(){
						var form = this.up('form').getForm();
						var url = this.up('htmleditor').getUrl();
			            if(form.isValid()){
			                form.submit({
			                    url:url,
			                    waitMsg: '上传中...',
			                    success: function(fm,act) {
			                    	var data = act.result.data;
			                    	if(data && data.fullUrl){
			                    		var hd = fm.owner.up("htmleditor");
			    						hd.insertAtCursor("<img style='width:100%' src='"+po.fullUrl+"'/>");
			    						
			                    	}else{
			                    		Rich.Msg.alert('提示','上传失败.');
			                    	}
			                    },
			                    failure:function(fm,act){
			                    	var data = act.result.data;
			                    	if(data && data.fullUrl){
			                    		var hd = fm.owner.up("htmleditor");
			                    		hd.insertAtCursor("<img style='width:100%' src='"+data.fullUrl+"'/>");
			    						
			                    	}else{
			                    		Rich.Msg.alert('提示','上传失败.');
			                    	}
			                    }
			                });
			            }
					}
				}
			}]
    	});
		
		return me.toolbar;
    }
});