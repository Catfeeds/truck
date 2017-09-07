Ext.define('Rich.view.admin.CRUDForms', {
	requires:['Ext.form.Panel','Ext.layout.container.Card','Rich.JsonAjax'],
    extend: 'Ext.panel.Panel',
    alias:'widget.crudforms',
    uses:[],
    layout:'card',
    initComponent:function(){
    	var me = this;
    	me.callParent(arguments);
        //me.addEvents('beforenetwork','afternetwork','btnclick');
        /*
        setTimeout(function(){
        	me.registerBtnclick();
        },10);
        */
    },
    /*
    registerBtnclick:function(){
    	var buttons = this.query('button');
    	for(var o in buttons){
    		buttons[o].on('click',this.btnClick,this);
    	}
    },
    btnClick:function(btn,e){
    	this.fireEvent('btnclick',this,btn,e);
    },*/
    getFormByStatus:function(status){
    	var fm = this.getComponent(status);
    	if(!fm){
    		if(status=='create'){
    			status = 0;
    		}else if(status=='read'){
    			status = 1;
    		}else if(status=='update'){
    			status = 2;
    		}else if(status=='delete'){
    			status = 3;
    		}
    		fm = this.getComponent(status);
    	}
    	return fm;
    },
    setItemsVisible:function(comp,pa){
    	for(var o in pa){
    		comp.getComponent(o).setVisible(pa[o]);
    	}
    },
    //create read update delete
    setStatus:function(status,value){
    	var fm = this.getFormByStatus(status);
    	if(fm){
    		this.getLayout().setActiveItem(fm);
    		if(value){
    			fm.getForm().setValues(value);
    		}
    	}
    	var tbar = this.getDockedComponent('toolbar');
    	if(status == 'read'){
    		this.setItemsVisible(tbar,{'back':false,'modify':true,'remove':true,'save':false,'reset':false});
    	}else if(status == 'create'){
    		this.setItemsVisible(tbar,{'back':false,'modify':false,'remove':false,'save':true,'reset':false});
    	}else if(status == 'update'){
    		this.setItemsVisible(tbar,{'back':true,'modify':false,'remove':false,'save':true,'reset':true});
    	}else if(status == 'delete'){
    		this.setItemsVisible(tbar,{'back':false,'modify':false,'remove':false,'save':false,'reset':false});
    	}
    },
    setActiveByValue:function(itemId,va,va2){
    	var f = this.getComponent(itemId);
    	if(f.setValue){
    		f.setValue(va,va2);
    	}
    	this.getLayout().setActiveItem(f);
    },
	doRequest:function(target,params){
		var tar = target;
		if(typeof tar == 'string'){
			tar = this.getComponent(tar);
		}
		if(typeof tar.doRequest == 'function'){
			if(tar.doRequest(params)===false){
				return;
			}
		}
		this.setLoading('');
		Rich.JsonAjax.request({
			url:tar.url,
			params:params,
			argument:target,
			callback:this.requestBack_,
			scope:this
		});
	},
	requestBack_:function(o,f,r){
		this.setLoading(false);
		var tar = o.argument;
		var cel = false;
		if(typeof this.requestBack == 'function'){
			cel = this.requestBack(tar,o,f,r) === false;
		}
		if(!cel){
			if(typeof tar == 'string'){
				tar = this.getComponent(tar);
			}
			if(typeof tar.requestBack == 'function'){
			 	tar.requestBack.call(tar,o,f,r);
			}
		}
	}
});