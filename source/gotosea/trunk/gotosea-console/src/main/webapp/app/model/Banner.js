Ext.define('Rich.model.Banner',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    'id',
	//{name:'',type:'int'},
    
    'imgUrl',//图片地址
    
    'imgLink',//图片链接
    
	'titleDesc',//标题描述
	
	'sortOrder',//排序
	
	'isHidden',//是否隐藏0不隐1瘾
	
	'isDelete',//是否删除
   
	'createTime',//创建时间
	
	'creator'//创建人
	]
});