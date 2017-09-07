/**
 * demo
 */
Ext.define('Rich.store.TerminalTreeStore',{
	requires:['Rich.model.Terminal'],
    extend: 'Ext.data.TreeStore',
    alias:'store.terminaltreestore',
    model:'Rich.model.Terminal',
    //sorters:[{property:'status',direction:'DESC'}],
    proxy:{type: 'memory'},
    autoFreshBasic:false,
    autoFreshStatus:false,
    autoFreshHistory:false,
    //freshSwitch:true,//是否执行刷新界面的开关,默认是执行
    dataType:'normal',//数据类别   normal：正常的， search ：搜索的，history：历史记录
    isSelfGroup:false,// 是否是自定义分组（是采用groupId还是parentId来创建树形）。 true为groupId
    setSelfGroup:function(isSelf,doCookie){
    	var isS = !!isSelf;
    	if(isS !== this.isSelfGroup){
    		this.isSelfGroup = isS;
    		this.fireEvent('groupChange',this,isS);
    		if(doCookie){
    			Ext.util.Cookies.set('selfgroup',isS);
    		}
    	}
    },
    constructor: function(config){
    	var me = this;
    	me.lastApplyData = null;
    	me.addEvents('beforeapplystatus','afterapplystatus','beforeapplydata','afterapplydata','groupChange');
    	me.callParent(arguments);
    	var selfgroup = Ext.util.Cookies.get('selfgroup');
    	if(selfgroup == 'true' || selfgroup === true){
    		this.isSelfGroup = true;
    	}

    },
    /*测试方法*/
    setTerminalStatus:function(id,status){
    	var tmp = this.getById(id);
    	if(tmp){
    		tmp = tmp.set('status',status);
    		if(this.dataType != 'history'){
    			this.sort('status','DESC');
    		}
    		if(tmp && tmp.length>0){
    			tmp.status = status;
    		}
    	}
    },
    onTerminalHistoryChange:function(){
    	if(this.dataType == 'history'){
    		this.doHistory();
    	}
    },
    onManagerBasicDifferent:function(mgr){
    	if(this.dataType == 'normal'){
    		var data = null;
    		this.applyData(data);
    	}
    },
    onManagerStatusChange:function(mgr,ids){
    	if(this.fireEvent('beforeapplystatus',this,ids) !== false){
	    	Ext.suspendLayouts();
	    	var len = ids.length,id;
	    	for(var i=0;i<len;i++){
	    		id = ids[i];
	    		tmp = this.getById(id);
	    		if(tmp){
	    		}
	    	}
	    	if(this.dataType == 'history'){
	    		this.sorters.removeAll();
	    	}else{
	    		this.sort('status','DESC');
	    	}
	    	this.fireEvent('afterapplystatus',this,ids);
	    	Ext.resumeLayouts(false);
	    	
    	}
    },
    doFresh:function(){
    	if(this.dataType == 'normal'){//处在普通状态
    		//this.onManagerBasicDifferent();
    	}else if(this.dataType == 'search'){//处在搜索状态
    		this.doSearch(this.searchParam);
    	}else if(this.dataType == 'history'){
    		this.doHistory();
    	}
    },
    searchParam:null,
    /**
     * 执行搜索
     * @param v
     */
    doSearch:function(v){
    	this.dataType = 'search';
    	this.searchParam = v;
    },
    searchBack:function(data){
    	if(data)
    	this.applyData(data);
    },
    doHistory:function(){
    	this.dataType = 'history';
        this.applyData(data);
    },
    doNormal:function(){
    	this.dataType = 'normal';
    	this.onManagerBasicDifferent();
    },
    /**
     * 往store里面添加数据
     * @param data 数据数组
     * @param noStatus 没有操作状态 默认 false:有状态
     */
    applyData:function(data,noStatus){
    	var me = this;
    	if(me.fireEvent('beforeapplydata',me,data) !== false){
    		this.lastApplyData = data;
    		if(this.dataType == 'history'){
    			var oks = [];
				me.makeTree(oks,null,data,'historyId');
	    		var nodeData = {
						id:'history',
						name:'最近访问',
						children:oks,
						expanded:true,
						type:3
				};
	    		if(!noStatus){
	    			var dirtys = me.getOperatedNodes();
		    		me._decodeNodesData(nodeData,(dirtys.length==0?undefined:dirtys));
	    		}
		    	me.sorters.removeAll();
	    		me.setRootNode(nodeData);
    		}else if(this.isSelfGroup){//如果使用自定义分组，移除type为1,2的数据；补充type为0，groupId为空的项到未分组(需要增加一个未分组数据项)；
	    		var len = data.length;
	    		var items = [],itm;
	    		//var nullId = "null";
	    		for(var i=0;i<len;i++){
	    			itm = data[i];
	    			if(itm.type != 1 && itm.type != 2){
	    				//if(itm.type == 0 && (!itm.groupId || itm.groupId == '')){
	    				//	itm.groupId = nullId;
	    				//}
	    				items.push(itm);
	    			}
	    		}
	    		items.push({id:"",name:'<span style="color:#CDCDCD;">*未分组*</span>',type:3});
	    		var oks = [];
				me.makeTree(oks,null,items,'groupId');
	    		var nodeData = {
						id:'0',
						name:'自定义分组',
						children:oks,
						expanded:true,//根节点不显示,所以一定要展开
						type:3
				};
	    		if(!noStatus){
	    			var dirtys = me.getOperatedNodes();//获得节点状态
		    		me._decodeNodesData(nodeData,(dirtys.length==0?undefined:dirtys));
	    		}
		    	me.setRootNode(nodeData);
		    	me.sort('status','DESC');
	    	}else{//如果使用组织结构分组，移除type为3的数据；
	    		var len = data.length;
	    		var items = [],itm;
	    		for(var i=0;i<len;i++){
	    			itm = data[i];
	    			if(itm.type != 3){
	    				//if(itm.type == 0 && (!itm.groupId || itm.groupId =='')){
	    				//	itm.groupId = "null";
	    				//}
	    				items.push(itm);
	    			}
	    		}
	    		var oks = [];
				me.makeTree(oks,null,items,'parentId');
				var nodeData = {
						id:'O_0',
						name:'组织分组',
						children:oks,
						expanded:true,//根节点不显示,所以一定要展开
						type:1
				};
				/*if(els.length > 0 && console){
					console.error('存在没有组织的车辆数据.');
					console.error(els);
				}*/
				if(!noStatus){
					var dirtys = me.getOperatedNodes();//获得节点状态
		    		me._decodeNodesData(nodeData,(dirtys.length==0?undefined:dirtys));
				}
		    	me.setRootNode(nodeData);
		    	me.sort('status','DESC');
	    	}
	    	me.fireEvent('afterapplydata',me,data);
    	}
    },
    /**
     * 创建树形数据，返回到数组
     * @param oks 树形完成之后存放的位置
     * @param node 起点节点 默认为 null
     * @param items
     * @returns {Array} 返回孤立节点
     */
    makeTree:function(oks,node,items,key){
    	if(node){
    		if(node.type !== 0){
    			items = this.makeTreeNode(node,items,key);
    		}
    		var pid = node[key];
        	if(pid){
        		var pnod = null,i = 0,len=items.length,itm;
        		for(;i<len;i++)
            	{
            		itm = items[i];
            		if(itm.id == pid)
            		{
            			pnode = Ext.apply({},itm);
            			break;
            		}
            	}
        		if(pnod){
        			items = Ext.Array.erase(items,i,1);
        			items = arguments.callee.call(this,oks,pnod,items,key);
        			pnod.children.unshift(nod);
        			//pnod.children.push(nod);
        			oks.push(pnod);
        		}else{//如果找不到父节点，
        			oks.unshift(node);
        		}
        	}else{//没有父节点
        		oks.unshift(node);
        	}
    	}
    	if(items.length > 0){
    		node = Ext.apply({},items.pop());
    		items = arguments.callee.call(this,oks,node,items,key);
    	}
    },
    /**
     * 创建树形node数据,需要根数据
     * @param node
     * @param items
     * @param key 作为判断子父关系的属性
     * @returns {Array} 返回孤立节点
     */
    makeTreeNode:function(node,items,key){
    	if(node.type === 0){
    		return items;
    	}else if(!Ext.isArray(node.children)){
    		node.children = [];
    	}
    	var els = [],chids = node.children,itm,nod;
    	for(var i=0,len=items.length;i<len;i++)
    	{
    		itm = items[i];//items[i]=null;
    		if(itm[key] == node.id)
    		{
    			if(itm.type === 0){
    				nod = Ext.apply({},itm);
    				chids.push(nod);
    			}else if(itm[key] == ""){
    				els.push(itm);
    			}else{
    				nod = Ext.apply({},itm);
    				if(!Ext.isArray(nod.children)){
    					nod.children = [];//不是车辆就需要补children属性
    				}
    				chids.push(nod);
    			}
    		}else{
    			els.push(itm);
    		}
    	}
    	if(els.length > 0)
    	{
	    	for(i=0,len=chids.length;i<len;i++)
	    	{
	    		nod = chids[i];
	    		if(nod.type != 0){//不是，就继续往下找
	    			els = arguments.callee.call(this,nod,els,key);
	    			if(els.length < 1){
	    				return els;
	    			}
	    		}
	    	}
    	}
    	return els;
    },
    /**
     * @public  获得操作过的节点，展开以及选中 expanded,checked
     */
    getOperatedNodes:function(){
    	var root = this.getRootNode();
    	var res = [];
    	if(root){
    		this._getOperatedNodes(root, res);
    	}
    	return res;
    },
    _getOperatedNodes:function(node,pag) {
        var childNodes = node.childNodes,len = childNodes.length,i,cn;
        for (i = 0; i < len; i++){
        	cn = childNodes[i];
        	if (cn.get('leaf')){//如果是子节点，获得checked状态
        		if(cn.get('checked'))
        		{
        			pag.push(cn.get('id'));
        		}
        	}else{//如果是父节点，获得expanded状态
        		if(cn.get('expanded'))
        		{
        			pag.push(cn.get('id'));
        		}
        		arguments.callee.call(this,cn,pag);
        	}
        }
    },
    /**
     * @private
     * @param node
     * @param dirtys
     * @return Boolean 节点是否是checked的状态
     */
    _decodeNodesData:function(node,dirtys){
    	var isLeaf = node.children == undefined;//使用children属性的有无作为是否是子节点的标示
    	if(dirtys && dirtys.length > 0)//先设置状态
    	{
    		for(var j=0;j<dirtys.length;j++)
    		{
    			if(dirtys[j] == node.id)
    			{
    				if(isLeaf)
    		    	{
    		    		node.checked = true;//如果是子节点，添加checked属性
    		    	}else{
    		    		node.expanded = true;//如果是父节点，添加expanded属性
    		    	}
    				Ext.Array.remove(dirtys,dirtys[j]);break;
    			}
    		}
    	}
    	if(isLeaf)//如果是子节点，添加checked，leaf属性,否则处理checked,leaf属性
    	{
    		node.checked = (node.checked === true)?true:false;
    		node.leaf = true;
    		return node.checked;
    	}else{
    		if(node.leaf != undefined){node.leaf = false;}
    		//node.checked = (node.checked === true)?true:false;
    		//if(node.checked != undefined){delete node.checked;}//本来是父节点不出checkbox的。
    		
    		var chs = node.children,len = chs.length;
    		var checked = false;
            for (var i=0; i < len; i++){
            	checked = arguments.callee.call(this,chs[i],dirtys) && checked;
            }
            node.checked = checked;
            return checked;
    	}
    }
});