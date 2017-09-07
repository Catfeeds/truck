Ext.define('Rich.view.Login', {
    extend: 'Ext.container.Viewport',
    requires:['Rich.Url','Rich.JsonAjax','Ext.form.Panel'
    ,'Ext.form.FieldContainer','Ext.form.field.Checkbox','Ext.util.Cookies'],
    //layout: 'border',
	cls:'login-viewport',
	initComponent:function(){
    	var me = this;
    	window.changeVerifycode = function(){
    		var imgNode = document.getElementById("checkCodeImage");   
        	//imgNode.src = "../checkCodeImglet?t=" + (new Date()).valueOf();
    	};
    	var ahtml = '<a href="'+(window.location.pathname.indexOf("/admin")==-1?'admin':'main')+'" style="display:block;width:60px;height:50px;"></a>';
    	Ext.apply(me,{
    		layout: {
			    type: 'vbox',
			    align: 'stretch'
			},
    		items:[{
    			/*showFn:function(c){
    	    		Rich.JsonAjax.request({
	        			url:Rich.Url.verifyCode,
	        			method:'get',
	        			callback:function(o,f,r){
	        				this.getForm().setValues(r.responseJson.data);
	        			},
	        			scope:this
	        		});
    	    	},*/
		    	xtype:'container',
		        region: 'north',
		        //height:90,
		        cls:'login-north',
		        minHeight:50,
		        flex:3,
		        layout: {
			        type: 'hbox',
			        align: 'bottom'
			    },
		        items:[{
		        	xtype:'box',
		        	html:ahtml,
		        	cls:'login-logo'
		        },{
		        	xtype:'box',
		        	flex:1
		        }]
		    },{
		        region: 'center',
		        xtype: 'panel',
		        height:520,
		        cls:'login-center',
		        bodyCls:'login-center-body',
		        layout:{
		        	type:'hbox',
		        	align: 'middle'
		        },
		        items:[{
		        	xtype:'box',
		        	flex:3
		        },{
		        	xtype:'form',
		        	frame:true,
		        	width:300,
		        	//bodyStyle:'padding-top:10px',
					//padding:'30 30 30 30',
		        	cls:'login-form',
		        	layout: 'anchor',
				    defaults: {
				        anchor:'100%',
				        labelWidth:60,
				        labelAlign:'right',
				        margin:'10 0 0 0'
				    },
				    defaultType: 'textfield',
			    	doSubmit:function(){
			    		if(!this.isValid())
						{
							//Rich.Msg.error('错误','有不合法的输入.');
							return;
						}
						var vs = this.getValues();
						if(vs.remember == 'on'){
							Ext.util.Cookies.set('remenberusername','on');
							Ext.util.Cookies.set('username',vs.userName);
						}else{
							Ext.util.Cookies.clear('username');
							Ext.util.Cookies.set('remenberusername','off');
						}
						this.setLoading('登录中...');
						Rich.JsonAjax.request({
							url:Rich.Url.loginPath,
							params:vs,
							callback:this.requestBack_,
							scope:this
						});
					},
					requestBack_:function(o,f,r){
						if(f){
							var res = r.responseJson;
							window.location.reload();
						}else{
							this.setLoading(false);
							window.changeVerifycode();
						}
					},
				    items: [{
				        fieldLabel: '用户名',
				        itemId:'usersname',
				        allowBlank:false,
				        value:Ext.util.Cookies.get('username') || '',
				        name: 'userName'
				    },{
				        fieldLabel: '密码',
				        itemId:'password',
				        allowBlank:false,
				        name: 'password',
				        type:'password',
				        inputType:'password',
            			tooltip: '密码'
				    },{
	    	            xtype      : 'fieldcontainer',
	    	            fieldLabel : '验证码',
	    	            defaults: {
	    	                hideLabel: true
	    	            },
	    	            layout: 'hbox',
	    	            items: [{
	    	            	xtype:'textfield',
					        flex:0.45,
					        minLength:4,
					        maxLength:4,
					        itemId:'verifyCode',
					        name: 'verifyCode',
					        enableKeyEvents:true,
					        listeners:{
					        	'keypress':function(me0,e,eOpts){
					        		if(e.keyCode == 13){
					        			me0.up('form').doSubmit();
					        		}
					        	}
					        }
						},{
				    		xtype:'box',
				    		height:22,
				    		flex:0.3,
				    		style:{float:"right",margin:"0px 0  0px 5px"},
				    		html:'<img id="checkCodeImage" name="checkCodeImage" ' +
				    				'src="../console/verify/code?111111111" style="cursor:pointer" ' +
				    				'onclick="changeVerifycode()" title="&nbsp;看不清，点击换一张" alt="验证码"/>'}]
    	        	},{
				    	xtype:'button',
				    	height:35,
				    	text:'登&nbsp;&nbsp;录',
				    	handler:function(btn){
				    		btn.up('form').doSubmit();
				    	}
				    },{
				    	xtype:'container',
				    	layout:{
				    		type:'hbox',
				    		align: 'center'
				    	},
				    	items:[{
				    		xtype:'checkboxfield',
				    		boxLabel:'记住用户名',
				    		style:'margin-left:50px',
				    		flex:1,
				    		checked:(Ext.util.Cookies.get('remenberusername') == 'on'),
                    		name:'remember'
				    		//fieldLabel:'记住用户名'
				    	},{
				    		xtype:'button',
				    		cls:'r-btn-transparent r-btn-highlight',
				    		text:'忘记密码',
				    		width:65,
				    		//flex:1,
				    		handler:function(){
				    			Ext.Msg.alert('提示',"请与客服联系.电话：0769-22220156");
				    		}
				    	}]
				    }]
		        	
		        },{
		        	xtype:'box',
		        	flex:1
		        }]
		    },{
		        region: 'south',
		        xtype:'toolbar',
		        minHeight:30,
		        cls:'login-south',
		        flex:7,
		        layout: {
			        type: 'hbox',
			        align: 'top'
			    },
		        items:['->',{
		        	xtype:'label',
		        	style:'font-size:12px;color:#000;',
		        	height:20,
		        	text:Ext.COPYRIGHT
		        },'->']
		    }]
    	});
    	me.callParent(arguments);
	}
});
window.addEventListener("click",function( e ){
	var target = e.target || e.srcElement;
	if( target.id == "checkCodeImage" ){
		var match =/^(\S+)\?(\d+)/.exec(target.src)
		target.src = match[1] + "?" + (new Date()).getTime();
	}
},false)
