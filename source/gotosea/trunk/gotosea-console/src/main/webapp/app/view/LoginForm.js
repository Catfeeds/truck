Ext.define('Rich.view.LoginForm', {
	requires:['Ext.util.Cookies','Rich.Url'],
    uses:[],
    extend: 'Ext.form.Panel',
    alias:'widget.loginform',
    cls:'login-form',
	initComponent:function(){
		var me = this;
		window.changeVerifycode = function(){
    		var imgNode = document.getElementById("checkCodeImage");   
        	imgNode.src = Rich.Url.checkCodeImgletPath+"?t=" + (new Date()).valueOf();
    	};
		Ext.apply(me,{
			width:300,
        	layout: 'anchor',
		    defaults: {
		        anchor:'100%',
		        labelWidth:60,
		        labelAlign:'right',
		        margin:'10 0 0 0'
		    },
		    defaultType: 'textfield',
		    items: [/*{
		        fieldLabel: '企业代码',
		        itemId:'ecode',
		        readOnly:true,
		        value:'hy',
		        name: 'ecode'
		    },*/{
		        fieldLabel: '用户名',
		        itemId:'usersname',
		        allowBlank:false,
		        value:Ext.util.Cookies.get('username') || '',
		        value:'admin',
		        name: 'userName'
		    },{
		        fieldLabel: '密码',
		        itemId:'password',
		        allowBlank:false,
		        name: 'password',
		        type:'password',
		        inputType:'password',
		        value:'123123',
    			tooltip: '密码'
		    },{
		    	xtype:'fieldcontainer',
		    	fieldLabel: '验证码',
		    	layout:{
		    		type:'hbox',
		    		align:'right'
		    	},
		    	items:[{
		    		hideLabel:true,
			        xtype:'textfield',
			        minLength:4,
			        maxLength:4,
			        labelWidth:45,
			        style:'margin-left:2px',
		        	labelAlign:'right',
			        itemId:'verifycode',
			        allowBlank:false,
			        width:90,
			        name: 'verifycode',
			        padding:'0 2 0 0',
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
		    		width:80,
		    		height:31,
		    		html:'<img id="checkCodeImage" name="checkCodeImage" src="'+Rich.Url.checkCodeImgletPath+'" style="cursor:pointer" onclick="changeVerifycode()" title="&nbsp;看不清，点击换一张" alt="验证码"/>'
		    	}]
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
		    		width:75,
		    		//flex:1,
		    		handler:function(){
		    			Ext.Msg.alert('提示',"请与客服联系.电话：020-82517347");
		    		}
		    	}]
		    }]
		});
		me.callParent(arguments);
	},
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
		this.setLoading(false);
		if(f){
			var res = r.responseJson;
			if(this.onReady){
				this.onReady();
			}
		}else{
			window.changeVerifycode();
		}
	}
});
