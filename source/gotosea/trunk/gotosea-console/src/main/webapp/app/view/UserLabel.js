Ext.define('Rich.view.UserLabel', {
	requires:['Rich.JsonAjax','Rich.Url','Rich.RightManager'],
    uses:['Rich.view.LoginWindow'],
    extend: 'Ext.container.Container',
    alias:'widget.userlabel',
    cls:'userlabel',
    logout2Reload:false,
	initComponent:function(){
		var me = this;
		var fontColor = this.fontColor;
		Ext.apply(me,{
			layout: {
		        type: 'hbox',
		        align: 'middle'
		    },
			items:[{
	        		xtype:'label',
	        		text:'您好,',
	        		//style:'color:'+fontColor+';',
	        		margin:'0 5 0 0'
	        	},{
	        		xtype:'button',
	            	text:"游客",
	            	itemId:'name',
	            	style:'margin-right:5px;font-weight:bold;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	            	handler:function(){
	            		Ext.create('Rich.view.Person').show();
	            	}
	            },{
	                text: '登录',
	                itemId:'loginBtn',
	                style:'text-decoration:underline;margin-right:5px;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	                //href:Rich.Url.newLogoutPath+'?redirect=admin',
	                //href:'console/user/logout',
					handler:function(){
						Ext.create('Rich.view.LoginWindow',{cls:'r-window-white'}).showFor(this.loginBack,this);
	                },
	                loginBack:function(){
	                	
	                },
	                hrefTarget:'_self'
	          	},{
	                text: '退出',
	                itemId:'logoutBtn',
	                style:'text-decoration:underline;margin-right:5px;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	                //href:Rich.Url.newLogoutPath+'?redirect=admin',
	                //href:'console/user/logout',
					handler:function(){
						Rich.JsonAjax.request({
							url:Rich.Url.logoutPath,
							scope:this,
							callback:function(o,f,r){
								if(f){
									var ul = this.up('userlabel');
									if(ul.logout2Reload){
									 	window.location.reload(true);
									}else{
										Rich.RightManager.doFreshUser();
									}
								}
							}
						});
	                },
	                hrefTarget:'_self'
	          	}]
		});
		me.callParent(arguments);
		//me.doFresh();
		//window.setInterval(function(){me.doFresh();},3*60*1000);//3分钟检查一次
		me.setInfoByUser(null);
		Rich.RightManager.on('userchange',function(){
			this.setInfoByUser(Rich.RightManager.userInfo);
		},this);
		Rich.RightManager.doFreshUser();
	},
	setInfoByUser:function(user){
		if(user){
			this.getItem('name').setText(user.nickName);
			this.getItem('loginBtn').hide();
			this.getItem('logoutBtn').show();
		}else{
			this.getItem('name').setText('游客');
			this.getItem('loginBtn').show();
			this.getItem('logoutBtn').hide();
		}
	}
});
