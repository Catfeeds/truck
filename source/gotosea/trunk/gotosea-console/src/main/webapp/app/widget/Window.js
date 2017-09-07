/*
 * 窗体基类
 * */
Ext.define('Rich.widget.Window', {
    extend: 'Ext.window.Window',
    alternateClassName:['Rich.Window'],
    alias:'widget.richwindow',
    requires:['Rich.widget.WindowManager','Rich.util.Relax'],
    modal:true,
    shadow:'frame',
    /**
     * widthPercent,heightPercent 宽和高在没有设置的情况下，占页面可视区大小的比例
     */
    width:0.8,
    height:0.8,
    sizeTarget:'active',//'viewport','active'
    constrainHeader:true,
    /*constructor: function(config) {
        var me = this;
        me.callParent(arguments);
        Rich.WindowManager.register(me);
    },*/
    initConfig:function(conf){
    	var me = this;
    	var target = this.sizeTarget;
    	if(Ext.isString(target)){
    		if(target == 'active'){
    			target = Ext.WindowManager.getActive();
    			if(!target){
    				target = 'viewport';
    			}
    		}
    	}
    	var wh = conf.width;
    	if(!wh){
    		wh = me.width;
    	}
        if(wh && Ext.isNumber(wh) && wh > 0 && wh < 1)
        {
        	var w = 0;
        	if(target == 'viewport'){
        		w = Ext.Element.getViewportWidth();
        	}else{
        		w = target.getWidth();
        	}
        	conf.width = me.width = w*wh;
        }
        wh = conf.height;
        if(!wh){
    		wh = me.height;
    	}
        if(wh && Ext.isNumber(wh) && wh > 0 && wh < 1)
        {
        	var h = 0;
        	if(target == 'viewport'){
        		h = Ext.Element.getViewportHeight();
        	}else{
        		h = target.getHeight();
        	}
        	conf.height = me.height = h*wh;
        }
        
    	me.callParent(arguments);
    	Rich.WindowManager.register(me);
    },
    destroy:function(){
    	var me = this;
    	Rich.WindowManager.unregister(me);
    	me.callParent(arguments);
    },
    
    
    returnFn:null,
    returnScope:null,
    showFor:function(fn,scope){
    	this.returnFn = fn;
    	this.returnScope = scope;
    	this.show();
    },
    returnValue:function(){
    	if(this.returnFn){
    		var res = this.returnFn.apply(this.returnScope || window,arguments);
    		if(res !== false){
    			this.returnFn = null;
    			this.returnScope = null;
    		}
    	}
    },
    close:function(delay){
    	if(delay === true){
    		Rich.Relax.add(this,'close');
    		return;
    	}
    	this.callParent(arguments);
    }
});