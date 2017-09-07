Ext.define('Rich.ux.Component', {
    //extend: 'Ext.Component',
	override:'Ext.Component',//override是一种分文件的设计。Rich.ux.Component在这里是没有意义的。
    requires:[],
    /**
     * 根据id或者itemId查找父级owner
     * @param id  id or itemId
     * @returns component
     */
	getOwnerCt:function(id){
		var own = this.getRefOwner();
		if(!id){
			return own;
		}
		if(own && (id == own.id || id == own.itemId))
		{
			return own;
		}else if(own){
			return own.getOwnerCt(id);
		}
		return null;
	},
	findOwnerCt:function(key,value){
		var own = this.getRefOwner();
		if(own)
		{
			if(own[key] == value)
			{
				return own;
			}else{
				return own.findOwnerCt(key,value);
			}
		}
		return null;
	},
	showCount:0,
	showFn:null,
	onBoxReady:function(){
		var me = this;
        me.callParent(arguments);
        if(me.showFn && me.showCount>=0 && (typeof me.showFn == 'function')){
        	me.showCount++;
        	if(me.showFn(me.showCount) === false){
        		me.showCount = -1;
        	}
        }
	}
	/*,
	action:function(fn,args,scope){
		if(this.onAction)
		{
			if(this.onAction(fn,args,scope)===false)
			return this;
		}
		if(typeof fn =='function')
		{
			return fn.call(scope||this,args)
		}else if(typeof fn =='string'){
			if(typeof this[fn] =='function')
			{
				return this[fn].call(scope||this,args)
			}else if(typeof this[fn] != 'undefined'){
				this[fn]=args;
				return true;
			}else{return undefined;}
		}else{
			return undefined;
		}
	},
	active:function(){
		if(this.ownerCt)
		{
			var ly = this.ownerCt.getLayout();
			if(typeof ly.setActiveItem == 'function')
			{
				ly.setActiveItem(this);
				return this;
			}
		}
		this.show();
	}*/
});
/*
Ext.define("Rich.ux.LoadMask", {
	override : "Ext.LoadMask",
	sizeMask : function() {
		var a = this, b;
		if (a.rendered && a.isVisible()) {
			a.center();
			b = a.getMaskTarget();
			a.getMaskEl().show().setSize(b.getSize()).alignTo(b,"tl-tl");
		} else {
			if (a.rendered) {
				var c = a.getMaskEl();
				if (c && c.isVisible()) {
					b = a.getMaskTarget();
					if (b) {
						c.setSize(b.getSize()).alignTo(b, "tl-tl");
					}
				}
			}
		}
	}
});
*/