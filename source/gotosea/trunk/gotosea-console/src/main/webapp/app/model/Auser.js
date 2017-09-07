Ext.define('Rich.model.Auser',{
    extend: 'Ext.data.Model',
    idProperty: 'userName',
    fields:['userName',
            'nickName',
            'email',
            'createTime',
            'orgId',
            'phone',
            'orgName',
            {name:'status',type:'int',defaultValue:0},
            'statusDesc'
    ]
});