Ext.define("Rich.Application",{
    extend: 'Ext.app.Application',
    name: 'Rich',
    appFolder:'app',
    appProperty:'app',
    requires: [
        'Ext.util.Cookies',
        'Rich.util.Relax',
        'Rich.Url',
        'Rich.Value',
        'Rich.ux.Component',
        'Rich.ux.Container',
        'Rich.ux.Button',
        'Rich.ux.Tabbar',
        'Rich.ux.HtmlEditor',
        'Rich.RightManager',
        'Ext.window.MessageBox',
        'Rich.widget.Message',
        'Rich.widget.Window',
        'Rich.widget.SectionTabpanel',
        'Rich.widget.SectionPanel',
        'Rich.widget.SectionWindow'
    ],
    controllers : ['ViewManager'],
    //views:[],
    stores:[],
    autoCreateViewport: true,
    /**
     *  Ext Application.js 
     *  constructor 构造函数里：
     * 	me.doInit(me);   init方法在doInit里面执行，比其他初始化工作要早
     *  me.initNamespace();
     *  me.initControllers();
     *  me.onBeforeLaunch();
     */
    init: function(){
        //Ext.setGlyphFontFamily('Pictos');
        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    },
    /**
     * viewport创建完毕之后调用
     * @override
     */
    launch:function(){
    	var token=Ext.util.Cookies.get('HAILE_A_KEY');
    	if(token){
    		  var websocket = null; 
    	      if('WebSocket' in window){  
    	          //websocket = new WebSocket("ws://localhost:8080/fishsea/websocket?"+token);  
    	          websocket = new WebSocket("ws://"+Ext.ServerPath+"/admin/websocket?"+token);
    	          websocket.onmessage = function(event){
    		            var data = Ext.decode(event.data || "{}");
    		            var title = data.title;
    		            var alert = data.alert;
    		            Rich.Msg.alert(title,alert);
    		            var cp = Ext.getCmp('daibaishixiang');
    		            if(cp){
    		            	cp.getStore().reload();
    		            }
    		        };
    	      }  
    	      else{  
    	          Ext.Msg.alert('提示','该浏览器不支持websocket，将影响消息推送提示。');
    	      }
    	}
    }
},function(){
	/*
	var skinId = parseInt(Ext.util.Cookies.get('skin'));
	if(!Ext.isNumber(skinId)){
		skinId = 0;
	}
	var path = Rich.Url.getSkinPath(skinId,true);
	if(!path){
		path = Rich.Url.getSkinPath(0,true);
	}
	if(!Ext.isIE8m){
		Ext.util.CSS.swapStyleSheet('skinCss',path);
	}
	Rich.RightManager.onReady(function(mgr,success){
		if(window.isDevelop){//如果是开发环境，始终通过
			success = true;
		}
		Ext.removeNode(document.getElementById('loading'));
		if(success){
			Ext.app.Application.instance = new Rich.Application();
		}else{
			Ext.MessageBox.alert('初始化权限失败.');
			window.location = Rich.Url.loginPath;
		}
	});
	*/
});