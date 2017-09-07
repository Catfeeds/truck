/*
 * 登陆人自我管理界面
 * */
Ext.define('Rich.view.Person',{
	requires:['Ext.form.Panel'
	,'Ext.form.FieldSet'
	,'Ext.form.field.ComboBox'
	],
    extend: 'Rich.widget.Window',
    alias:'widget.person',
   
    width:500,
    height:500,
    autoScroll:true,
    title:'我的信息',
    showFn:function(){
    	this.lookupI('form').getForm().setValues(Rich.RightManager.userInfo);
    },
    initComponent:function(){
    	var me = this;
		Ext.apply(me,{
    		layout:'fit',
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
	       layout: 'fit',
	       items: [{
           defaults:{anchor: '100%',margin:'10 20 10 20'},
           items: [{
                xtype:'textfield',
                fieldLabel: '用户名',
                readOnly:true,
                disabled:true,
                itemId:'userName',
                name: 'userName'
	       	},{
	            xtype:'textfield',
	            fieldLabel: '昵称',
	            itemId:'nickName',
	            disabled:true,
	            name: 'nickName'
			},{
            	xtype:'numberfield',
                fieldLabel: '手机号',
                minLength:11,
	            maxLength:11,
                itemId:'phone',
                disabled:true,
                name: 'phone'
            },{
                xtype:'textfield',
                fieldLabel: '电子邮件',
                itemId:'email',
                disabled:true,
	            name: 'email'
            },{
			    	xtype:'fieldset',
			    	itemId:'pwdFieldset',
			        title: '修改密码',
			        checkboxName:'isUpdatePwd',
			        disabled:true,
			        checkboxToggle:true,
			        collapsible: true,
			        collapsed:true,
			        defaultType: 'textfield',
			        defaults: {anchor:'100%',inputType:'password'},
			        layout: 'anchor',
			        items :[{
			            fieldLabel: '密码',
			            name: 'password'
			        }, {
			            fieldLabel: '重复密码',
			            name: 'password2'
			        		}]
            }]
		        }],
    		buttons:['->',{
		    	    	text:'编辑',
			    	    	itemId:'btnEdit',
			    	    	handler:function(btn){
			    	    		var fm = btn.up('person');
			    	    		fm.lookupI('nickName').setDisabled(false);
			    	    		fm.lookupI('phone').setDisabled(false);
			    	    		fm.lookupI('email').setDisabled(false);
			    	    		fm.lookupI('pwdFieldset').setDisabled(false);
			    	    		btn.ownerCt.getItem('cancelEdit').setVisible(true);
			    	    		btn.ownerCt.getItem('btnSave').setVisible(true);
			    	    		btn.setVisible(false);
			    	    	}
		    	    },{
		    	    	text:'取消编辑',
			    	    	hidden:true,
			    	    	itemId:'cancelEdit',
			    	    	handler:function(btn){
			    	    		var fm = btn.up('person');
			    	    		fm.lookupI('nickName').setDisabled(true);
			    	    		fm.lookupI('phone').setDisabled(true);
			    	    		fm.lookupI('email').setDisabled(true);
			    	    		fm.lookupI('pwdFieldset').setDisabled(true);
			    	    		btn.ownerCt.getItem('btnEdit').setVisible(true);
			    	    		btn.ownerCt.getItem('cancelEdit').setVisible(false);
			    	    		btn.ownerCt.getItem('btnSave').setVisible(false);
			    	    		btn.setVisible(false);
			    	    	}
		    	    },{
		    	    	text:'保存',
			    	    	hidden:true,
			    	    	itemId:'btnSave',
			    	    	handler:function(btn){
			    	    		btn.up('form').submit();
			    	    	}
		    	    }],
		    	submit:function(){
		    	    	var fm = this.getForm();
						if(!fm.isValid())
						{
							Rich.Msg.error('错误','有不合法的输入.');
							return;
						}
						var vas = fm.getValues();
		    	    	if(vas.isUpdatePwd == 'on'){
		    	    		if(vas.password && vas.password2 && vas.password == vas.password2){
		    	    		}else{
		    	    			Rich.Msg.error('错误','两次密码不一致！')
		    	    			return;
		    	    		}
		    	    	}else{
		    	    		delete vas.password;
		    	    		delete vas.password2;
		    	    	}
    	        		Rich.JsonAjax.request({
    	        			method:'post',
	    	        		url:Rich.Url.updateMyInfoPath,
	    	        		params:vas,
	    	        		callback:this.submitBack,
	    	        		scope:this
    	        		});
		    	   },
		    	   submitBack:function(o,f,r){
    	         	if(f){
    	         		Rich.RightManager.doFreshUser();
    	         		var fm = this;
    	         		fm.lookupI('nickName').setDisabled(true);
	    	    		fm.lookupI('phone').setDisabled(true);
	    	    		fm.lookupI('email').setDisabled(true);
	    	    		fm.lookupI('pwdFieldset').setDisabled(true);
	    	    		this.lookupI('btnEdit',true).setVisible(true);
	    	    		this.lookupI('btnSave',true).setVisible(false);
	    	    		this.lookupI('cancelEdit',true).setVisible(false);
	    	        }
    	         }
    	         
    		}]
	    	
    	});
    	me.callParent(arguments);
    }
   
});