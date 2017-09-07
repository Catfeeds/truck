Ext.define('Rich.view.admin.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
    	'Rich.widget.SectionTabpanel',
        'Ext.layout.container.Border',
        'Ext.tree.Panel',
        'Rich.RightManager',
        'Ext.ux.layout.Center',
        'Ext.form.Label'
    ],
    layout: 'border',
    createTabByRecord:function(record){
    	var dis = record.get('cls');
    	if(dis.indexOf('x-treecolumn-disabled') != -1){
    		return;
    	}
    	var id = record.get('mid');
    	var tab = this.getComponent('tabpanel');
    	var comp = tab.getComponent(id);
    	if(comp){
    		tab.setActiveTab(comp);
    	}else{
    		tab.addSection({
    			closable:true,
    			itemId:id,
    			bodyCls:'admin-square',
    			ctype:record.get('ctype'),
    			title:record.get('text')
    		});
    	}
    },
	initComponent:function(){
		var store = Ext.create('Ext.data.TreeStore',{
			fields:[
				{name:'mid',type:'string'},
				{name:'ctype',type:'string'},
				{name: 'text', type: 'string'}
			],
		    root: {
		        expanded: true,
		        children: [
		        	{mid:'users',cls:(Rich.RightManager.hasRight('admin-user')?'':'x-treecolumn-disabled'),text:"用户管理",leaf:true,ctype:'Rich.view.admin.Users'},
		            {mid:'org',cls:(Rich.RightManager.hasRight('admin-org')?'':'x-treecolumn-disabled'),text:"组织管理",leaf:true,ctype:'Rich.view.admin.Organization'},
		            {mid:'terminal',cls:(Rich.RightManager.hasRight(['admin-orgtmnl','admin-usertmnl'])?'':'x-treecolumn-disabled'),text:"车辆管理",leaf:false,expanded:true,children:[
		            	{mid:'orgterminal',cls:(Rich.RightManager.hasRight('admin-orgtmnl')?'':'x-treecolumn-disabled'),text:"组织车辆管理",leaf:true,ctype:'Rich.view.admin.OrgTerminal'},
		            	{mid:'userterminal',cls:(Rich.RightManager.hasRight('admin-usertmnl')?'':'x-treecolumn-disabled'),text:"用户车辆管理",leaf:true,ctype:'Rich.view.admin.UserTerminal'}
		            ]}
		            ,{mid:'rights',cls:(Rich.RightManager.hasRight(['admin-roleres','admin-orgrole','admin-userrole'])?'':'x-treecolumn-disabled'),text:"权限管理",leaf:false,expanded:true,children:[
		            	{mid:'roleresource',cls:(Rich.RightManager.hasRight('admin-roleres')?'':'x-treecolumn-disabled'),text:"角色资源管理",leaf:true,ctype:'Rich.view.admin.RoleResource'},
		            	{mid:'orgrole',cls:(Rich.RightManager.hasRight('admin-orgrole')?'':'x-treecolumn-disabled'),text:"组织角色管理",leaf:true,ctype:'Rich.view.admin.OrgRole'},
		            	{mid:'userrole',cls:(Rich.RightManager.hasRight('admin-userrole')?'':'x-treecolumn-disabled'),text:"用户角色管理",leaf:true,ctype:'Rich.view.admin.UserRole'}
		            ]}
		        ]
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
		        	xtype:'box',
		        	cls:'admin-logo'
		        	//width: 400,
		        	//style:'font-size:18px;color:#DEDEDE;text-shadow: 0 -1px 0 #4C4C4C;',
		        	//height:50,
		        	//text:'车辆管理监控系统后台'
		        }/*,{
	        		xtype:'label',
	            	text:'车辆管理监控系统后台',
	            	style:'text-shadow: 0 1px 0 #A2CCD8;font-size:18px;color:#157FCC;font-weight:bold;'
	            }*/,{xtype:'box',flex:1},{
	        		xtype:'label',
	        		text:'您好,',
	        		style:'color:#FFFFFF;',
	        		margin:'0 5 0 0'
	        	},{
	        		xtype:'label',
	            	text:Rich.RightManager.UserName,
	            	style:'color:#FFFFFF;font-weight:bold;',
	            	margin:'0 5 0 0'
	            },{
	                text: '退出',
	                style:'color:#FFFFFF;text-decoration:underline;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	                href:Rich.Url.newLogoutPath+'?redirect=admin',
	                /*handler:function(){
	                	window.location = Rich.Url.logoutPath;
	                },*/
	                hrefTarget:'_self'
	          	},{
	                text: '前台监控',
	                rightId:'monitor-login',
	                rightHidden:true,
	                style:'color:#FFFFFF;text-decoration:underline;',
	                xtype:'button',
	                cls:'r-btn-transparent-linefocus',
	                href:'main',
	                /*handler:function(){
	                	window.location = Rich.Url.logoutPath;
	                },*/
	                hrefTarget:'_self'
	          	}]
		        //style:'background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));background-image: -webkit-linear-gradient(top,#8fc33a,#739b2e);background-image: -moz-linear-gradient(top,#8fc33a,#739b2e);background-image: -o-linear-gradient(top,#8fc33a,#739b2e);background-image: linear-gradient(top,#8fc33a,#739b2e);',
		        //html:'<div style="color:white;font-size:18px;margin-top:15px;margin-left:20px;">车辆管理监控系统后台</div>',
		        
		    },{
		        region: 'west',
		        xtype: 'treepanel',
        		rootVisible: false,
        		split:true,
        		store:store,
        		frame:true,
        		title:' ',
		        //tabPosition: 'bottom',
		        width: 250,
		        minWidth: 200,
		        //collapseMode:"mini",
		        //collapseDirection:'top',
		        resizable:{
		        	handles:'e'
		        },
		        collapsible: true,
		        //header:false,
		        listeners:{
		        	'itemdblclick':function(me,record,item,index,e,eOpts){
	            		if(record.get('leaf')){
	            			this.up('viewport').createTabByRecord(record);
	            		}
	            	}
		        }
		    }, {
		        region: 'center',
		        xtype: 'sectiontabpanel',
		        frame:true,
		        hasSection:true,
		        itemId:'tabpanel',
		        items:[{
		        	closable:false,
		        	bodyCls:'admin-square',
		        	title:'首页'
		        }],
		        listeners:{
		        	'boxready':function(){
		        		
		        	}
		        }
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