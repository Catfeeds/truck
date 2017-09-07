Ext.define('Rich.model.Dictionary',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    		'typeName',//类型名称
    		
            'typeDesc',//名称描述
            
            {name:'itemCode',type:'int'},//对应字段
            
            'itemDesc',//字段描述
            
            'parentCode',
            
            'isParent'//是否是父节点
           // {name:'parent_code',type:'int'},
            //{name:'is_parent',type:'int'}
            
    ]
});