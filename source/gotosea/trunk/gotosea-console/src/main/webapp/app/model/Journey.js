Ext.define('Rich.model.Journey',{
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields:['id',// 唯一的 不在界面显示
    
    'name',//名称

    'number',//行程编号

    'createTime',//创建时间
    
    'orginator', //发起人
    
    'deadlineTime',//报名截止时间
    
    'departureTime',//出发时间

    'endTime',//计划结束时间

    'endTimeReal',//实际结束时间
    
    'prePersonPay',//人 单价(原价)
    
    'personPay',//每人费用(实际)
    
    'personPay',//行程总费用

    'durationDesc',//计划时长的文字说明
    
    'durationDescReal',//实际的行程时长文字说明
    
    'costDescription',//线路说明
    
   {name:'state',type:'int',defaultValue:0},//行程本身的状态
   {name:'type',type:'int',defaultValue:1},//1 包船  2  拼船
   {name:'minPerson',type:'int',defaultValue:0},//最小启动人数
   {name:'maxPerson',type:'int',defaultValue:0},//最大启动人数
   {name:'duration',type:'int',defaultValue:0},//线路中计划的行程时长,单位为分
   {name:'isDelete',type:'int',defaultValue:0},//0 不删除， 1 删除
   {name:'userId',type:'int',defaultValue:0},//发起人
   {name:'shipId',type:'int',defaultValue:0},//船id
   {name:'wharfId',type:'int',defaultValue:0},//码头id
   {name:'travelRouteId',type:'int',defaultValue:0}//线路id
           
    ]
    
});