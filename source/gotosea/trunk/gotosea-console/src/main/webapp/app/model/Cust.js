Ext.define('Rich.model.Cust',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:[
    
    'id',
    
    'account',//客户帐号
    
    'name',//客户名称
    
    'phone',//手机号码
    
    'email',//邮箱
    
    'wechat',//微信号
    
    'pwd',//密码
    
    {name:'sex',type:'int'},//性别 1男2女3未知
    
    'picture',//头像
    
    {name:'level',type:'int'},//客户级别
    
    'createTime',//注册时间
   
    {name:'status',type:'int'},//客户状态 0--失效，1--生效
    
    {name:'merchant',type:'int'},//商家标记 0--未申请商家身份，1--已申请商家身份
    
    {name:'merchantStatus',type:'int'},//商家认证状态 1--未认证，2--已申请，3--认证成功，4--认证失败
    
    {name:'credits',type:'int'},//玩家积分
    
    {name:'grades',type:'int'},//商家评分
   
    {name:'experenceValue',type:'int'},//经验值
   
    {name:'areaId',type:'int'}//地区
    

    
    ]
    
});