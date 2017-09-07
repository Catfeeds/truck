Ext.define('Rich.model.RouteDate',{
    extend: 'Rich.model.Route',
    idProperty: 'id',
    fields:[
    {name:'id',type:'int'},
    
    {name:'serviceId',type:'int'},//售价id
    
    {name:'marketPrice',type:'int'},//市场价
    
    {name:'preferPrice',type:'int'},//优惠价
    
    {name:'costPrice',type:'int'},//成本价
    
    {name:'numToSale',type:'int'},//可售数量
    
    {name:'numSold',type:'int'},//已售数量
    
    'offerDate',//日期
    
    {name:'resourcePriceTag',type:'int'},
    
    'name'
    
    ]
    
});