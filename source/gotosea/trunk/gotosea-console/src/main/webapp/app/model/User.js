Ext.define('Rich.model.User',{
    extend: 'Ext.data.Model',
    idProperty: 'userName',
    fields:['userName',
            'nickName',
            'phone',
            'email',
            'creater',
            'createTime',
            'orgId',
            'orgName',
            {name:'status',type:'int',defaultValue:0}
    ],
    proxy: {
    	type: 'memory'
    }
});