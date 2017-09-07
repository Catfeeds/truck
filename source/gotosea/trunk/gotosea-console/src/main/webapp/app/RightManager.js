Ext.define('Rich.RightManager',{
	singleton: true,
	extend:'Ext.util.Observable',
	//mixins: {observable: 'Ext.util.Observable'},
    requires:['Rich.JsonAjax','Rich.Url','Rich.Value','Rich.widget.Message'],
    //users:['Rich.Right'],
    rights:[],
    UserName:'',//用户名
    constructor: function(config) {
    	var me = this;
        Ext.apply(this, config || {});
        //this.all = new Ext.util.HashMap();
        this.rights = this.rights || [];
        //me.addEvents('complete');
        me.callParent();
        //me.mixins.observable.constructor.call(me, config);
        Ext.onReady(me.init,me);
        //return me;
    },
    isReady:false,
    init: function(){
    	Ext.tip.QuickTipManager.init();
    	var me = this;
    	//document.getElementById("loading-msg").innerHTML = "初始化权限..";
    	//me.fireEvent('complete',me,true);
    	//return;
        Rich.JsonAjax.request({
        	url:Rich.Url.rightPath,
        	//params:{}
        	callback:me.callback,
        	scope:me
        });
    },
    
    
    doFreshUser:function(){
		Rich.JsonAjax.request({
			url:Rich.Url.userInfoPath,
			callback:this.freshUserBack_,
			scope:this
		});
	},
	freshUserBack_:function(o,f,r){
		if(f){
			var info = r.responseJson.data;
			this.setUserInfo(info);
		}
	},
    setUserInfo:function(info){
    	var oinfo = this.userInfo;
    	this.userInfo = info;
    	var dif = false;
		if(info != oinfo){
			dif = true;
			//if(info && oinfo && info.userName == oinfo.userName){
			//	dif = false;
			//}
		}
		if(dif){
			this.fireEvent('userchange',this);
		}
    },
    
    
    
    /**
     * 初始化回调函数
     * @private
     */
    callback:function(o,f,res){
    	var me = this;
    	if(f){
    		var code = res.responseJson.code;
    		if(code == 200 || code == 'success'){
            	me.rights = res.responseJson.data.rights;
            	me.userInfo = res.responseJson.data.userInfo;
            	me.UserName = me.userInfo.nickName;
            	me.isReady = true;
            	Rich.JsonAjax.autoRefresh = true;
            	var i=0,len = me.rights.length;
            	var rightIds = [];
            	for(;i<len;i++){
            		rightIds.push(me.rights[i].resId);
            	}
            	me.rightIds = rightIds;
            	me.rightIdstring = rightIds.join(',') + ',';
            	
            	window.setInterval(function(){Rich.RightManager.doFreshUser();},1*60*1000);//3分钟检查一次
    		}else{
    			f = false;
    		}
    	}
    	me.fireEvent('complete',me,f);
    },
    /**
     * 注册ready事件,此事件触发肯定是在Ext.onReady之后
     * @public
     */
    onReady:function(fn,scope,option){
    	var me = this;
    	me.addListener('complete',fn,scope,option);
    },
    getChildRightsById:function(id){
    	var rts = this.rights,tns = [];
    	var o;
    	for(o in rts)
		{
    		if(rts[o].parentid == id)
    		{
    			tns.push(Ext.apply({},rts[o]));
    		}
		}
    	return tns;
    },
    hasChildRights:function(){
    	
    },
    /**
     * 通过id获得一个right
     *
     * @public
     */
    getRightById:function(id){
    	var rts = this.rights;
    	var i;
    	for(i in rts)
		{
    		if(rts[i].resId == id)
    		{
    			return rts[i];
    		}
		}
    	return null;
    },
    hasRight:function(rightId){
    	//return true;
    	if(Ext.isArray(rightId)){
    		for(var o in rightId){
    			if(Rich.RightManager.hasRight(rightId[o])){
    				return true;
    			}
    		}
    		return false;
    	}
    	return this.rightIdstring.indexOf(rightId +',') != -1;
    }
},function(){
});
/*
Ext.define('Rich.Component', {
	override:'Ext.Component',
	constructor : function(config) {
		var me = this;
		if(config && config.rightId){
			var hasR = Rich.RightManager.hasRight(config.rightId);
			if(!hasR){
				if(config.rightHidden){
					config.hidden = true;
				}else{
					config.disabled = true;
				}
				config.noRight = true;
			}
		}
    	me.callParent(arguments);
	},
	afterRender:function(){
		var me = this;
    	me.callParent(arguments);
    	if(me.initialConfig.noRight && !me.initialConfig.rightHidden){
    		try{
    			this.getEl().dom.title="没有权限";
    		}catch(e){
    			console.error(e);
    		}
    	}
	}
});
Ext.define('Rich.tree.Column', {
	override:'Ext.tree.Column',
	treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
        var me = this,
            cls = record.get('cls'),
            renderer = me.origRenderer,
            data = record.data,
            parent = record.parentNode,
            rootVisible = view.rootVisible,
            lines = [],
            parentData;
        var rid = record.get('rightId');
        if(rid){
        	if(!Rich.RightManager.hasRight(rid)){
        		if(cls){
        			cls = cls + " r-hidden";
        		}else{
        			cls = "r-hidden";
        		}
        	}
        }
        if (cls) {
            metaData.tdCls += ' ' + cls;
        }

        while (parent && (rootVisible || parent.data.depth > 0)) {
            parentData = parent.data;
            lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                    parentData.isLast ? 0 : 1;
            parent = parent.parentNode;
        }

        return me.getTpl('cellTpl').apply({
            record: record,
            baseIconCls: me.iconCls,
            iconCls: data.iconCls,
            icon: data.icon,
            checkboxCls: me.checkboxCls,
            checked: data.checked,
            elbowCls: me.elbowCls,
            expanderCls: me.expanderCls,
            textCls: me.textCls,
            leaf: data.leaf,
            expandable: record.isExpandable(),
            isLast: data.isLast,
            blankUrl: Ext.BLANK_IMAGE_URL,
            href: data.href,
            hrefTarget: data.hrefTarget,
            lines: lines,
            metaData: metaData,
            // subclasses or overrides can implement a getChildCls() method, which can
            // return an extra class to add to all of the cell's child elements (icon,
            // expander, elbow, checkbox).  This is used by the rtl override to add the
            // "x-rtl" class to these elements.
            childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
            value: renderer ? renderer.apply(me.origScope, arguments) : value
        });
    }
});
*/