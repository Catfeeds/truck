Ext.define('Rich.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
    	'Rich.util.Relax',
        'Ext.layout.container.Border',
        'Ext.tree.Panel',
        'Rich.RightManager',
        'Rich.JsonAjax',
        'Ext.ux.layout.Center',
        'Rich.view.ReceiveMessage',
        'Rich.view.homepage.Main',
        'Rich.view.Person',
        'Ext.form.Label',
        'Ext.PagingToolbar',
        'Ext.util.Cookies',
        'Rich.view.UserLabel'//,'Rich.view.homepage.Main'
    ],
    layout: 'border',
    createTabByRecord:function(record){
    	var dis = record.get('cls');
    	if(dis.indexOf('x-treecolumn-disabled') != -1){
    		return;
    	}
    	var id = record.get('id');
    	var tab = this.getComponent('tabpanel');
    	var comp = tab.getComponent(id);
    	if(comp){
    		tab.setActiveTab(comp);
    	}else{
    		
    		var ct = record.get('ctype');
    		var config = {
    			closable:true,
    			itemId:id,
    			//bodyCls:'admin-square',
    			ctype:ct,
    			title:record.get('text')
    		}
    		
    		Ext.require(ct,function(){
    			var cd = Ext.create(ct,config);
    			this.add(cd);
    			//this.setActiveTab(cd);
    		},tab);
    	}
    },
	initComponent:function(){
		
		
		var cd = [
	        {id:'user',rightId:Rich.V.client,text:"客户管理",leaf:false,children:[
	        	{id:'cust',rightId:Rich.V.cust,text:"客户管理",leaf:true,ctype:'Rich.view.cust.Main'},
	        	{id:'merchant',rightId:Rich.V.merchant,text:"商家管理",leaf:true,ctype:'Rich.view.merchant.Main'},
	        	{id:'check',rightId:Rich.V.check,text:"商家资格审核",leaf:true,ctype:'Rich.view.check.Main'}
	        ]},
	        {id:'serve',rightId:Rich.V.server,text:"服务管理",leaf:false,children:[
	        	{id:'route',rightId:Rich.V.route,text:"旅游线路管理",leaf:true,ctype:'Rich.view.route.Main'},
	        	{id:'ship',rightId:Rich.V.ship,text:"租船线路管理",leaf:true,ctype:'Rich.view.ship.Main'}
	        	//{id:'sample',rightId:Rich.V.merchant,text:"简单线路管理",leaf:true,ctype:'Rich.view.merchant.Main'}
	        ]},
	        {id:'resource',rightId:Rich.V.merchResource,text:"商家资源管理",leaf:true,ctype:'Rich.view.serve.Main'},
	        {id:'essay',rightId:Rich.V.essay,text:"文章管理",leaf:true,ctype:'Rich.view.essay.Main'},
	        {id:'activity',rightId:Rich.V.activity,text:"活动管理",leaf:true,ctype:'Rich.view.activity.Main'},
	        {id:'coupon',rightId:Rich.V.coupon,text:"优惠劵管理",leaf:true,ctype:'Rich.view.coupon.Main'},
	        {id:'dictionary',rightId:Rich.V.dictionary,text:"数据字典管理",leaf:true,ctype:'Rich.view.dictionary.DictionaryMgr'},
	        //{id:'label',rightId:Rich.V.admin_,text:"标签管理",leaf:true,ctype:'Rich.view.essay.Main'},
	        {id:'page',rightId:Rich.V.banner,text:"首页管理",leaf:false,children:[
	        	{id:'banner',rightId:Rich.V.banner,text:"广告管理",leaf:true,ctype:'Rich.view.banner.Main'}
	        ]},
	        {id:'order',rightId:Rich.V.order,text:"订单管理",leaf:false,children:[
	        	{id:'seadate',rightId:Rich.V.terrace,text:"平台订单",leaf:true,ctype:'Rich.view.order.SeaMain'},
	        	{id:'merchantdate',rightId:Rich.V.player,text:"商家订单",leaf:true,ctype:'Rich.view.order.Main'}
	        ]},
			{id:'finance',rightId:Rich.V.drowback,text:"财务管理",leaf:false,children:[
	        	{id:'withdrow',rightId:Rich.V.drowback,text:"提现管理",leaf:true,ctype:'Rich.view.finance.DepositMain'}
	        	//{id:'withdrow',rightId:Rich.V.merchant,text:"退款管理",leaf:true,ctype:'Rich.view.order.Main'}
	        ]},
	        {id:'tag',rightId:Rich.V.dictionary,text:"标签管理",leaf:true,ctype:'Rich.view.dictionary.DictionaryMgr'},
	        {id:'rights',text:"系统管理",rightId:Rich.V.admin_,leaf:false, children:[
	          	{id:'users',rightId:Rich.V.admin_user,text:"用户管理",leaf:true,ctype:'Rich.view.admin.Users'},
	        	{id:'userrole',rightId:Rich.V.admin_userrole,text:"用户角色管理",leaf:true,ctype:'Rich.view.admin.UserRole'},
	        	{id:'org',rightId:Rich.V.admin_org,text:"组织管理",leaf:true,ctype:'Rich.view.admin.Organization'},
	        	{id:'orgrole',rightId:Rich.V.admin_orgrole,text:"组织角色管理",leaf:true,ctype:'Rich.view.admin.OrgRole'},
	        	{id:'roleresource',rightId:Rich.V.admin_role_resource,text:"角色权限管理",leaf:true,ctype:'Rich.view.admin.RoleResource'}
	        ]}
        ];
		
		
		var store = Ext.create('Ext.data.TreeStore',{
			storeId:'navigation',
			fields:[
				{name:'id',type:'string'},
				{name:'ctype',type:'string'},
				{name: 'text', type: 'string'},
				{name: 'rightId', type: 'auto'}
			],
		    root: {
		        expanded: true,
		        children: cd
		    }
		});
		var me = this;
    	Ext.apply(me,{
    		cls:'admin-viewport',
		    items: [{
		    	xtype:'container',
		        region: 'north',
		        height:50,
		        layout: {
			        type: 'hbox',
			        align: 'middle'
			    },
		        items:[{
		        	xtype:'label',
		        	text:'后台管理系统',
		        	cls:'admin-logo'
		        },{xtype:'box',flex:1},{
	            	xtype:'userlabel',
	            	logout2Reload:true
	            },{
	    	    	text:'消息',
	    	    	tooltip:'历史消息',
	    	    	hidden:true,
	    	    	style:'<span  color:#FFFFFF;text-decoration:underline;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	    	    	handler:function(btn){
	    	    		btn.up('container').lookDetail();
	    	    	}
	          	}],
	          	lookDetail:function(record){
					Ext.create('Rich.view.ReceiveMessage',{
						}).show();	
	          	},
	          	lookUserDetail:function(record){
					Ext.create('Rich.view.Person').showById();	
	          	}
		        //style:'background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));background-image: -webkit-linear-gradient(top,#8fc33a,#739b2e);background-image: -moz-linear-gradient(top,#8fc33a,#739b2e);background-image: -o-linear-gradient(top,#8fc33a,#739b2e);background-image: linear-gradient(top,#8fc33a,#739b2e);',
		        //html:'<div style="color:white;font-size:18px;margin-top:15px;margin-left:20px;">车辆管理监控系统后台</div>',
		        
		    },{
		        region: 'west',
		        xtype: 'treepanel',
		        itemId:'treepanel',
        		rootVisible: false,
        		split:true,
        		store:store,
        		//frame:true,
        		header:{
					title:'',
					titlePosition:0,
					//style:'padding: 7px 10px 8px 10px',
					//height:33,
					items: [{
				    	xtype: 'button',
				    	enableToggle:true,
				    	cls:'x-tool r-btn-transparent r-btn-small-thin',
				    	height:(Ext.isIE8m?24:18),
				    	style:'padding:0',
				    	altText:'联动',
				    	hidden:true,
					    tooltip: '联动',
				    	//pressedCls:'',
				    	//overCls:'tool-over',
				    	iconCls:'x-tool-img x-tool-collapse',
				    	showFn:function(){
				    		var lt = Ext.util.Cookies.get('linkTab');
				    		lt = (lt === true || lt == 'true');
				    		this._setState(lt);
				    		this.toggle(lt);
				    	},
				    	_setState:function(state){
				    		this.setTooltip(state?'点击开启联动':'点击取消联动');
					    	Rich.view.Viewport.linkTab = state;
				    	},
					    toggleHandler:function(btn,state){
					    	this._setState(state);
					    	Ext.util.Cookies.set('linkTab',(state?'true':'false'));
					    }
					}]
				},
		        //tabPosition: 'bottom',
		        width: 250,
		        minWidth: 200,
		        //collapseMode:"mini",
		        //collapseDirection:'top',
		        resizable:{
		        	handles:'e'
		        },
		        collapsible: true
		    }, {
		        region: 'center',
		        xtype: 'tabpanel',
		        frame:true,
		        hasSection:true,
		        itemId:'tabpanel',
		        showFn:function(){},
		        items:[/*{
		        	closable:false,
		        	bodyCls:'admin-square',
		        	itemId:'home',
		        	xtype:'homepage',
		        	title:'首  页'
		        }*/]
		    },{
		    	xtype:'toolbar',
		    	cls:'r-transparent',
		        region: 'south',
		        height:25,
		        items:['->',{
		        	xtype:'label',
		        	//width: 400,
		        	style:'font-size:12px;color:#157FCC;',
		        	height:20,
		        	text:Ext.COPYRIGHT//'©2016HUAYUN TECHNOLOGY CO.,LTD all rights reserved'
		        },'->']
		        //style:'background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));background-image: -webkit-linear-gradient(top,#8fc33a,#739b2e);background-image: -moz-linear-gradient(top,#8fc33a,#739b2e);background-image: -o-linear-gradient(top,#8fc33a,#739b2e);background-image: linear-gradient(top,#8fc33a,#739b2e);',
		        //html:'<div style="color:white;font-size:18px;margin-top:15px;margin-left:20px;">车辆管理监控系统后台</div>',
		        
		    }]
    	});
    	me.callParent(arguments);
	}
});