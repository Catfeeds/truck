Ext.define('Rich.model.Serve',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    {name:'id',type:'int'},
    
    'name',//名称
    
    {name:'merchantResourceTypeId',type:'int'},//资源类型id
    
    {name:'locatorId',type:'int'},//定位点id
    
    'custId',//客户id
    
    'introduction',//商家资源简介
    
    'pictureArr',//图片集合
    
    'status',//资源状态
    
    'pictures',//商家资源照片地址
    
    'merchantResourceTypeName',//资源类型描述
    
    'locatorName',//地区名字
    
    'custName'//用户名称
    
    ]
    
});