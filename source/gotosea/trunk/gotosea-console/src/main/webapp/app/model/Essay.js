Ext.define('Rich.model.Essay',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    	{name:'id',type:'int'},
    	
    	'businessUnitName',//业务类型
    	
    	{name:'readQuantity',type:'int'},//阅读量
    	
    	{name:'thumbQuantity',type:'int'},//点赞量
    	
    	{name:'status',type:'int'}, //状态0未发布1已发布
    	
    	'summary',//概要
    	
    	'thumbnail',//缩略图
    	
    	'releaseDate',//发布日期
   
    	'author',//作者
    	
    	'htmlFile' //正文
    ]
});