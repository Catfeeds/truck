Ext.define('Rich.model.FreshCatch',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    	'name',//名字
    	
    	'digest',//摘要
    
    	'content',//内容
    	
    	'fullPic',//图片绝对地址
    	
    	'pic',//图片地址
		{name:'type',type:'int'}//须知的类型
      
    ]
});